// Serveur principal - gere les salons proteges par mot de passe,
// le chat texte en temps reel, et le relais de signalisation WebRTC pour le vocal.

const express = require("express");
const cors = require("cors");
const http = require("http");
const bcrypt = require("bcryptjs");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // en prod tu peux restreindre a l'origine de ton app desktop
});

// --- Stockage en memoire (simple pour commencer, migrable vers une DB plus tard) ---
// rooms = { [roomId]: { name, passwordHash, messages: [], members: { [socketId]: {username, inVoice} } } }
const rooms = {};

const MAX_MESSAGES_PER_ROOM = 200;

function roomPublicInfo(roomId) {
  const room = rooms[roomId];
  if (!room) return null;
  return {
    roomId,
    name: room.name,
    memberCount: Object.keys(room.members).length,
    voiceCount: Object.values(room.members).filter((m) => m.inVoice).length,
  };
}

// Petite route de sante, utile pour verifier le deploiement Railway
app.get("/", (req, res) => {
  res.json({ status: "ok", rooms: Object.keys(rooms).length });
});

app.get("/rooms", (req, res) => {
  // Liste publique des salons (sans mot de passe, juste nom + compteurs)
  res.json(Object.keys(rooms).map(roomPublicInfo));
});

io.on("connection", (socket) => {
  let currentRoomId = null;
  let currentUsername = null;

  // Creer un salon protege par mot de passe
  socket.on("create-room", async ({ roomId, roomName, password, username }, cb) => {
    try {
      if (!roomId || !password || !username) {
        return cb({ ok: false, error: "roomId, mot de passe et pseudo requis." });
      }
      if (rooms[roomId]) {
        return cb({ ok: false, error: "Ce salon existe deja." });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      rooms[roomId] = {
        name: roomName || roomId,
        passwordHash,
        messages: [],
        members: {},
      };
      cb({ ok: true });
    } catch (err) {
      cb({ ok: false, error: "Erreur serveur lors de la creation." });
    }
  });

  // Rejoindre un salon existant avec mot de passe
  socket.on("join-room", async ({ roomId, password, username }, cb) => {
    try {
      const room = rooms[roomId];
      if (!room) {
        return cb({ ok: false, error: "Salon introuvable." });
      }
      const valid = await bcrypt.compare(password || "", room.passwordHash);
      if (!valid) {
        return cb({ ok: false, error: "Mot de passe incorrect." });
      }

      // Quitte l'ancien salon si besoin
      if (currentRoomId && rooms[currentRoomId]) {
        leaveRoom(socket, currentRoomId);
      }

      currentRoomId = roomId;
      currentUsername = username || "Anonyme";
      socket.join(roomId);
      room.members[socket.id] = { username: currentUsername, inVoice: false };

      socket.to(roomId).emit("system-message", `${currentUsername} a rejoint le salon.`);
      io.to(roomId).emit("member-list", room.members);

      cb({
        ok: true,
        roomName: room.name,
        messages: room.messages,
        members: room.members,
      });
    } catch (err) {
      cb({ ok: false, error: "Erreur serveur lors de la connexion." });
    }
  });

  // Message texte
  socket.on("send-message", ({ text }) => {
    if (!currentRoomId || !rooms[currentRoomId] || !text || !text.trim()) return;
    const room = rooms[currentRoomId];
    const message = {
      username: currentUsername,
      text: text.trim().slice(0, 2000),
      timestamp: Date.now(),
    };
    room.messages.push(message);
    if (room.messages.length > MAX_MESSAGES_PER_ROOM) room.messages.shift();
    io.to(currentRoomId).emit("new-message", message);
  });

  // --- Vocal : rejoindre / quitter le canal vocal du salon ---
  socket.on("join-voice", () => {
    if (!currentRoomId || !rooms[currentRoomId]) return;
    const room = rooms[currentRoomId];
    room.members[socket.id].inVoice = true;

    // Envoie a ce socket la liste des pairs deja en vocal, pour initier les connexions WebRTC
    const existingVoicePeers = Object.entries(room.members)
      .filter(([id, m]) => id !== socket.id && m.inVoice)
      .map(([id, m]) => ({ id, username: m.username }));

    socket.emit("voice-peers", existingVoicePeers);
    socket.to(currentRoomId).emit("voice-peer-joined", { id: socket.id, username: currentUsername });
    io.to(currentRoomId).emit("member-list", room.members);
  });

  socket.on("leave-voice", () => {
    if (!currentRoomId || !rooms[currentRoomId]) return;
    const room = rooms[currentRoomId];
    if (room.members[socket.id]) room.members[socket.id].inVoice = false;
    socket.to(currentRoomId).emit("voice-peer-left", { id: socket.id });
    io.to(currentRoomId).emit("member-list", room.members);
  });

  // Relais des signaux WebRTC (offer/answer/ice) entre pairs, format simple-peer
  socket.on("voice-signal", ({ to, signal }) => {
    io.to(to).emit("voice-signal", { from: socket.id, signal });
  });

  socket.on("disconnect", () => {
    if (currentRoomId) leaveRoom(socket, currentRoomId);
  });

  function leaveRoom(socket, roomId) {
    const room = rooms[roomId];
    if (!room) return;
    delete room.members[socket.id];
    socket.leave(roomId);
    socket.to(roomId).emit("voice-peer-left", { id: socket.id });
    socket.to(roomId).emit("system-message", `${currentUsername} a quitte le salon.`);
    io.to(roomId).emit("member-list", room.members);

    // Nettoie le salon s'il est vide (garde le mot de passe/messages en memoire quand meme,
    // simple ici : on supprime seulement si tu veux liberer la memoire, sinon on garde)
    if (Object.keys(room.members).length === 0) {
      // On garde le salon pour permettre de revenir plus tard.
      // Decommente la ligne suivante si tu preferes supprimer les salons vides :
      // delete rooms[roomId];
    }
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur Messenger demarre sur le port ${PORT}`);
});
