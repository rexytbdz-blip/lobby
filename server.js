// Serveur principal - gere les salons proteges par mot de passe,
// le chat texte en temps reel, et le relais de signalisation WebRTC pour le vocal.
// Les messages systeme et erreurs sont renvoyes sous forme de CODES,
// pour que le client puisse les traduire dans la langue de l'utilisateur.

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
  cors: { origin: "*" },
});

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

app.get("/", (req, res) => {
  res.json({ status: "ok", rooms: Object.keys(rooms).length });
});

app.get("/rooms", (req, res) => {
  res.json(Object.keys(rooms).map(roomPublicInfo));
});

io.on("connection", (socket) => {
  let currentRoomId = null;
  let currentUsername = null;

  socket.on("create-room", async ({ roomId, roomName, password, username }, cb) => {
    try {
      if (!roomId || !password || !username) {
        return cb({ ok: false, errorCode: "MISSING_FIELDS" });
      }
      if (rooms[roomId]) {
        return cb({ ok: false, errorCode: "ROOM_EXISTS" });
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
      cb({ ok: false, errorCode: "SERVER_ERROR_CREATE" });
    }
  });

  socket.on("join-room", async ({ roomId, password, username }, cb) => {
    try {
      const room = rooms[roomId];
      if (!room) {
        return cb({ ok: false, errorCode: "ROOM_NOT_FOUND" });
      }
      const valid = await bcrypt.compare(password || "", room.passwordHash);
      if (!valid) {
        return cb({ ok: false, errorCode: "WRONG_PASSWORD" });
      }

      if (currentRoomId && rooms[currentRoomId]) {
        leaveRoom(socket, currentRoomId);
      }

      currentRoomId = roomId;
      currentUsername = username || "Anonyme";
      socket.join(roomId);
      room.members[socket.id] = { username: currentUsername, inVoice: false };

      socket.to(roomId).emit("user-joined", { username: currentUsername });
      io.to(roomId).emit("member-list", room.members);

      cb({
        ok: true,
        roomName: room.name,
        messages: room.messages,
        members: room.members,
      });
    } catch (err) {
      cb({ ok: false, errorCode: "SERVER_ERROR_JOIN" });
    }
  });

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

  socket.on("join-voice", () => {
    if (!currentRoomId || !rooms[currentRoomId]) return;
    const room = rooms[currentRoomId];
    room.members[socket.id].inVoice = true;

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
    socket.to(roomId).emit("user-left", { username: currentUsername });
    io.to(roomId).emit("member-list", room.members);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur Messenger demarre sur le port ${PORT}`);
});
