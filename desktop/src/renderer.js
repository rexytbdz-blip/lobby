const io = require("socket.io-client");
const SimplePeer = require("simple-peer");

// ---------- Etat global ----------
let socket = null;
let username = "";
let roomId = "";
let localStream = null;
let inVoice = false;
let muted = false;
const peers = {};
const audioEls = {};

// ---------- Elements ----------
const homeScreen = document.getElementById("home-screen");
const roomScreen = document.getElementById("room-screen");
const homeError = document.getElementById("home-error");

// ---------- Onglets rejoindre / creer ----------
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    homeError.textContent = "";
  });
});

function connectSocket() {
  const url = document.getElementById("server-url").value.trim();
  if (!url) {
    homeError.textContent = window.i18n.t("err_server_url");
    return null;
  }
  if (socket) socket.disconnect();
  socket = io(url, { transports: ["websocket", "polling"] });
  attachSocketListeners();
  return socket;
}

// Traduit un code d'erreur renvoye par le serveur, avec repli sur le code brut
function translateError(errorCode) {
  const key = "err_" + errorCode.toLowerCase();
  const translated = window.i18n.t(key);
  return translated === key ? errorCode : translated;
}

document.getElementById("create-btn").addEventListener("click", () => {
  const s = connectSocket();
  if (!s) return;
  username = document.getElementById("username").value.trim() || "Anonyme";
  const rid = document.getElementById("create-room-id").value.trim();
  const rname = document.getElementById("create-room-name").value.trim();
  const password = document.getElementById("create-password").value;

  if (!rid || !password) {
    homeError.textContent = window.i18n.t("err_join_fields");
    return;
  }

  s.emit("create-room", { roomId: rid, roomName: rname, password, username }, (res) => {
    if (!res.ok) {
      homeError.textContent = translateError(res.errorCode);
      return;
    }
    joinRoom(rid, password);
  });
});

document.getElementById("join-btn").addEventListener("click", () => {
  const s = connectSocket();
  if (!s) return;
  username = document.getElementById("username").value.trim() || "Anonyme";
  const rid = document.getElementById("join-room-id").value.trim();
  const password = document.getElementById("join-password").value;
  if (!rid || !password) {
    homeError.textContent = window.i18n.t("err_join_fields");
    return;
  }
  joinRoom(rid, password);
});

function joinRoom(rid, password) {
  socket.emit("join-room", { roomId: rid, password, username }, (res) => {
    if (!res.ok) {
      homeError.textContent = translateError(res.errorCode);
      return;
    }
    roomId = rid;
    enterRoomScreen(res.roomName, res.messages, res.members);
  });
}

function enterRoomScreen(roomName, messages, members) {
  homeScreen.classList.add("hidden");
  roomScreen.classList.remove("hidden");
  document.getElementById("room-name-label").textContent = roomName;
  document.getElementById("room-id-label").textContent = "#" + roomId;

  document.getElementById("messages").innerHTML = "";
  messages.forEach((m) => addMessage(m.username, m.text));
  renderMemberList(members);
}

// ---------- Chat texte ----------
document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (!text) return;
  socket.emit("send-message", { text });
  input.value = "";
});

function addMessage(author, text, isSystem = false) {
  const wrap = document.createElement("div");
  wrap.className = "msg" + (isSystem ? " system" : "");
  if (isSystem) {
    wrap.textContent = text;
  } else {
    wrap.innerHTML = `<div class="author">${escapeHtml(author)}</div><div class="bubble">${escapeHtml(text)}</div>`;
  }
  const container = document.getElementById("messages");
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderMemberList(members) {
  const list = document.getElementById("member-list");
  list.innerHTML = "";
  Object.values(members).forEach((m) => {
    const li = document.createElement("li");
    li.textContent = m.username + (m.inVoice ? window.i18n.t("voice_suffix") : "");
    list.appendChild(li);
  });
}

// ---------- Quitter le salon ----------
document.getElementById("leave-btn").addEventListener("click", () => {
  leaveVoice();
  if (socket) socket.disconnect();
  roomScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
  homeError.textContent = "";
});

// ---------- Vocal (WebRTC mesh via simple-peer) ----------
const voiceToggleBtn = document.getElementById("voice-toggle-btn");
const muteBtn = document.getElementById("mute-btn");

voiceToggleBtn.addEventListener("click", async () => {
  if (!inVoice) {
    await joinVoice();
  } else {
    leaveVoice();
  }
});

muteBtn.addEventListener("click", () => {
  if (!localStream) return;
  muted = !muted;
  localStream.getAudioTracks().forEach((t) => (t.enabled = !muted));
  muteBtn.textContent = muted ? window.i18n.t("unmute_btn") : window.i18n.t("mute_btn");
  muteBtn.classList.toggle("muted", muted);
});

async function joinVoice() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    alert(window.i18n.t("err_mic") + err.message);
    return;
  }
  inVoice = true;
  muted = false;
  voiceToggleBtn.textContent = window.i18n.t("voice_leave_btn");
  voiceToggleBtn.classList.add("active");
  muteBtn.classList.remove("hidden");
  muteBtn.textContent = window.i18n.t("mute_btn");
  setupSpeakingDetector(socket.id || "local", localStream, true);

  socket.emit("join-voice");
}

function leaveVoice() {
  if (!inVoice) return;
  inVoice = false;
  voiceToggleBtn.textContent = window.i18n.t("voice_join_btn");
  voiceToggleBtn.classList.remove("active");
  muteBtn.classList.add("hidden");

  Object.keys(peers).forEach(destroyPeer);
  if (localStream) {
    localStream.getTracks().forEach((t) => t.stop());
    localStream = null;
  }
  document.getElementById("voice-members").innerHTML = "";
  if (socket) socket.emit("leave-voice");
}

function destroyPeer(id) {
  if (peers[id]) {
    peers[id].destroy();
    delete peers[id];
  }
  if (audioEls[id]) {
    audioEls[id].remove();
    delete audioEls[id];
  }
  const el = document.getElementById("voice-member-" + id);
  if (el) el.remove();
}

function createPeer(id, initiator, username) {
  const peer = new SimplePeer({ initiator, trickle: true, stream: localStream });
  peers[id] = peer;

  peer.on("signal", (signal) => {
    socket.emit("voice-signal", { to: id, signal });
  });

  peer.on("stream", (remoteStream) => {
    const audio = document.createElement("audio");
    audio.autoplay = true;
    audio.srcObject = remoteStream;
    document.body.appendChild(audio);
    audioEls[id] = audio;
    setupSpeakingDetector(id, remoteStream, false);
  });

  peer.on("error", () => destroyPeer(id));
  peer.on("close", () => destroyPeer(id));

  addVoiceMemberUI(id, username);
  return peer;
}

function addVoiceMemberUI(id, name) {
  if (document.getElementById("voice-member-" + id)) return;
  const wrap = document.createElement("div");
  wrap.className = "voice-member";
  wrap.id = "voice-member-" + id;
  wrap.innerHTML = `<span class="voice-orb" id="orb-${id}"></span><span>${escapeHtml(name)}</span>`;
  document.getElementById("voice-members").appendChild(wrap);
}

function setupSpeakingDetector(id, stream, isLocal) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    if (isLocal) addVoiceMemberUI(id, username + window.i18n.t("you_suffix"));

    function tick() {
      if (!inVoice) {
        ctx.close();
        return;
      }
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      const orb = document.getElementById("orb-" + id);
      if (orb) orb.classList.toggle("speaking", avg > 12);
      requestAnimationFrame(tick);
    }
    tick();
  } catch (err) {
    // Detection du niveau sonore optionnelle, on ignore si non supporte
  }
}

// ---------- Ecouteurs socket ----------
function attachSocketListeners() {
  socket.on("new-message", (m) => addMessage(m.username, m.text));
  socket.on("user-joined", ({ username: u }) => addMessage(null, window.i18n.t("sys_joined", { user: u }), true));
  socket.on("user-left", ({ username: u }) => addMessage(null, window.i18n.t("sys_left", { user: u }), true));
  socket.on("member-list", (members) => renderMemberList(members));

  socket.on("voice-peers", (peerList) => {
    peerList.forEach(({ id, username: uname }) => {
      createPeer(id, true, uname);
    });
  });

  socket.on("voice-peer-joined", ({ id, username: uname }) => {
    if (inVoice) addVoiceMemberUI(id, uname);
  });

  socket.on("voice-peer-left", ({ id }) => {
    destroyPeer(id);
  });

  socket.on("voice-signal", ({ from, signal }) => {
    if (!peers[from]) {
      createPeer(from, false, "...");
    }
    peers[from].signal(signal);
  });

  socket.on("connect_error", () => {
    homeError.textContent = window.i18n.t("err_connect_fail");
  });
}
