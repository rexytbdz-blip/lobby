// Module de traduction pour l'app desktop. Charge avant renderer.js.
// Expose window.i18n = { t(key, params), applyStaticTranslations(), currentLang, setLang(code), rtl }

const translations = {
  fr: {
    name: "Francais",
    tagline: "Salons texte &amp; vocal proteges par mot de passe.",
    server_label: "Adresse du serveur",
    username_label: "Pseudo", username_placeholder: "Ton pseudo",
    tab_join: "Rejoindre", tab_create: "Creer",
    join_room_label: "Code du salon", join_room_placeholder: "ex: team-rex",
    password_label: "Mot de passe",
    join_btn: "Entrer dans le salon",
    create_room_label: "Code du salon (identifiant unique)",
    create_name_label: "Nom affiche", create_name_placeholder: "ex: Equipe Rex",
    create_btn: "Creer le salon",
    leave_btn: "Quitter",
    voice_title: "Vocal", voice_join_btn: "Rejoindre le vocal", voice_leave_btn: "Quitter le vocal",
    mute_btn: "Couper le micro", unmute_btn: "Reactiver le micro",
    members_title: "Membres",
    message_placeholder: "Ecris un message...", send_btn: "Envoyer",
    err_missing_fields: "Code du salon, mot de passe et pseudo requis.",
    err_room_exists: "Ce salon existe deja.",
    err_server_create: "Erreur serveur lors de la creation.",
    err_room_not_found: "Salon introuvable.",
    err_wrong_password: "Mot de passe incorrect.",
    err_server_join: "Erreur serveur lors de la connexion.",
    err_connect_fail: "Connexion au serveur impossible. Verifie l'adresse.",
    err_server_url: "Renseigne l'adresse du serveur.",
    err_join_fields: "Code du salon et mot de passe requis.",
    err_mic: "Impossible d'acceder au micro : ",
    sys_joined: "{user} a rejoint le salon.", sys_left: "{user} a quitte le salon.",
    voice_suffix: " (vocal)", you_suffix: " (toi)"
  },
  en: {
    name: "English",
    tagline: "Password-protected text &amp; voice rooms.",
    server_label: "Server address",
    username_label: "Username", username_placeholder: "Your username",
    tab_join: "Join", tab_create: "Create",
    join_room_label: "Room code", join_room_placeholder: "e.g. team-rex",
    password_label: "Password",
    join_btn: "Enter room",
    create_room_label: "Room code (unique identifier)",
    create_name_label: "Display name", create_name_placeholder: "e.g. Team Rex",
    create_btn: "Create room",
    leave_btn: "Leave",
    voice_title: "Voice", voice_join_btn: "Join voice", voice_leave_btn: "Leave voice",
    mute_btn: "Mute mic", unmute_btn: "Unmute mic",
    members_title: "Members",
    message_placeholder: "Type a message...", send_btn: "Send",
    err_missing_fields: "Room code, password and username are required.",
    err_room_exists: "This room already exists.",
    err_server_create: "Server error while creating the room.",
    err_room_not_found: "Room not found.",
    err_wrong_password: "Incorrect password.",
    err_server_join: "Server error while joining the room.",
    err_connect_fail: "Could not connect to the server. Check the address.",
    err_server_url: "Enter the server address.",
    err_join_fields: "Room code and password are required.",
    err_mic: "Could not access the microphone: ",
    sys_joined: "{user} joined the room.", sys_left: "{user} left the room.",
    voice_suffix: " (voice)", you_suffix: " (you)"
  },
  ar: {
    name: "العربية", rtl: true,
    tagline: "غرف نصية وصوتية محمية بكلمة مرور.",
    server_label: "عنوان الخادم",
    username_label: "الاسم المستعار", username_placeholder: "اسمك المستعار",
    tab_join: "انضمام", tab_create: "إنشاء",
    join_room_label: "رمز الغرفة", join_room_placeholder: "مثال: team-rex",
    password_label: "كلمة المرور",
    join_btn: "ادخل الغرفة",
    create_room_label: "رمز الغرفة (معرف فريد)",
    create_name_label: "الاسم المعروض", create_name_placeholder: "مثال: فريق ريكس",
    create_btn: "إنشاء الغرفة",
    leave_btn: "مغادرة",
    voice_title: "صوت", voice_join_btn: "الانضمام للصوت", voice_leave_btn: "مغادرة الصوت",
    mute_btn: "كتم الميكروفون", unmute_btn: "تفعيل الميكروفون",
    members_title: "الأعضاء",
    message_placeholder: "اكتب رسالة...", send_btn: "إرسال",
    err_missing_fields: "رمز الغرفة وكلمة المرور والاسم المستعار مطلوبة.",
    err_room_exists: "هذه الغرفة موجودة بالفعل.",
    err_server_create: "خطأ في الخادم أثناء الإنشاء.",
    err_room_not_found: "الغرفة غير موجودة.",
    err_wrong_password: "كلمة المرور غير صحيحة.",
    err_server_join: "خطأ في الخادم أثناء الانضمام.",
    err_connect_fail: "تعذر الاتصال بالخادم. تحقق من العنوان.",
    err_server_url: "أدخل عنوان الخادم.",
    err_join_fields: "رمز الغرفة وكلمة المرور مطلوبان.",
    err_mic: "تعذر الوصول إلى الميكروفون: ",
    sys_joined: "{user} انضم إلى الغرفة.", sys_left: "{user} غادر الغرفة.",
    voice_suffix: " (صوت)", you_suffix: " (أنت)"
  },
  es: {
    name: "Espanol",
    tagline: "Salas de texto y voz protegidas por contrasena.",
    server_label: "Direccion del servidor",
    username_label: "Apodo", username_placeholder: "Tu apodo",
    tab_join: "Unirse", tab_create: "Crear",
    join_room_label: "Codigo de la sala", join_room_placeholder: "ej: team-rex",
    password_label: "Contrasena",
    join_btn: "Entrar a la sala",
    create_room_label: "Codigo de la sala (identificador unico)",
    create_name_label: "Nombre mostrado", create_name_placeholder: "ej: Equipo Rex",
    create_btn: "Crear sala",
    leave_btn: "Salir",
    voice_title: "Voz", voice_join_btn: "Unirse a voz", voice_leave_btn: "Salir de voz",
    mute_btn: "Silenciar microfono", unmute_btn: "Activar microfono",
    members_title: "Miembros",
    message_placeholder: "Escribe un mensaje...", send_btn: "Enviar",
    err_missing_fields: "Se requieren codigo de sala, contrasena y apodo.",
    err_room_exists: "Esta sala ya existe.",
    err_server_create: "Error del servidor al crear la sala.",
    err_room_not_found: "Sala no encontrada.",
    err_wrong_password: "Contrasena incorrecta.",
    err_server_join: "Error del servidor al unirse.",
    err_connect_fail: "No se pudo conectar al servidor. Verifica la direccion.",
    err_server_url: "Introduce la direccion del servidor.",
    err_join_fields: "Se requieren codigo de sala y contrasena.",
    err_mic: "No se pudo acceder al microfono: ",
    sys_joined: "{user} se unio a la sala.", sys_left: "{user} salio de la sala.",
    voice_suffix: " (voz)", you_suffix: " (tu)"
  },
  zh: {
    name: "中文",
    tagline: "受密码保护的文字与语音房间。",
    server_label: "服务器地址",
    username_label: "昵称", username_placeholder: "你的昵称",
    tab_join: "加入", tab_create: "创建",
    join_room_label: "房间代码", join_room_placeholder: "例如：team-rex",
    password_label: "密码",
    join_btn: "进入房间",
    create_room_label: "房间代码（唯一标识）",
    create_name_label: "显示名称", create_name_placeholder: "例如：Rex 小队",
    create_btn: "创建房间",
    leave_btn: "离开",
    voice_title: "语音", voice_join_btn: "加入语音", voice_leave_btn: "离开语音",
    mute_btn: "静音麦克风", unmute_btn: "取消静音",
    members_title: "成员",
    message_placeholder: "输入消息...", send_btn: "发送",
    err_missing_fields: "需要房间代码、密码和昵称。",
    err_room_exists: "该房间已存在。",
    err_server_create: "创建房间时服务器出错。",
    err_room_not_found: "找不到房间。",
    err_wrong_password: "密码错误。",
    err_server_join: "加入房间时服务器出错。",
    err_connect_fail: "无法连接到服务器，请检查地址。",
    err_server_url: "请输入服务器地址。",
    err_join_fields: "需要房间代码和密码。",
    err_mic: "无法访问麦克风：",
    sys_joined: "{user} 加入了房间。", sys_left: "{user} 离开了房间。",
    voice_suffix: "（语音中）", you_suffix: "（你）"
  },
  ja: {
    name: "日本語",
    tagline: "パスワードで保護されたテキスト・音声ルーム。",
    server_label: "サーバーアドレス",
    username_label: "ニックネーム", username_placeholder: "あなたのニックネーム",
    tab_join: "参加", tab_create: "作成",
    join_room_label: "ルームコード", join_room_placeholder: "例: team-rex",
    password_label: "パスワード",
    join_btn: "ルームに入る",
    create_room_label: "ルームコード（一意の識別子）",
    create_name_label: "表示名", create_name_placeholder: "例: チームRex",
    create_btn: "ルームを作成",
    leave_btn: "退出",
    voice_title: "音声", voice_join_btn: "音声に参加", voice_leave_btn: "音声から退出",
    mute_btn: "マイクをミュート", unmute_btn: "ミュート解除",
    members_title: "メンバー",
    message_placeholder: "メッセージを入力...", send_btn: "送信",
    err_missing_fields: "ルームコード、パスワード、ニックネームが必要です。",
    err_room_exists: "このルームは既に存在します。",
    err_server_create: "作成中にサーバーエラーが発生しました。",
    err_room_not_found: "ルームが見つかりません。",
    err_wrong_password: "パスワードが間違っています。",
    err_server_join: "参加中にサーバーエラーが発生しました。",
    err_connect_fail: "サーバーに接続できません。アドレスを確認してください。",
    err_server_url: "サーバーアドレスを入力してください。",
    err_join_fields: "ルームコードとパスワードが必要です。",
    err_mic: "マイクにアクセスできません: ",
    sys_joined: "{user}さんがルームに参加しました。", sys_left: "{user}さんがルームを退出しました。",
    voice_suffix: "（通話中）", you_suffix: "（あなた）"
  },
  da: {
    name: "Dansk",
    tagline: "Adgangskodebeskyttede tekst- og talerum.",
    server_label: "Serveradresse",
    username_label: "Kaldenavn", username_placeholder: "Dit kaldenavn",
    tab_join: "Deltag", tab_create: "Opret",
    join_room_label: "Rumkode", join_room_placeholder: "f.eks. team-rex",
    password_label: "Adgangskode",
    join_btn: "Ga ind i rummet",
    create_room_label: "Rumkode (unikt id)",
    create_name_label: "Visningsnavn", create_name_placeholder: "f.eks. Team Rex",
    create_btn: "Opret rum",
    leave_btn: "Forlad",
    voice_title: "Tale", voice_join_btn: "Deltag i tale", voice_leave_btn: "Forlad tale",
    mute_btn: "Sluk mikrofon", unmute_btn: "Tænd mikrofon",
    members_title: "Medlemmer",
    message_placeholder: "Skriv en besked...", send_btn: "Send",
    err_missing_fields: "Rumkode, adgangskode og kaldenavn er pakraevet.",
    err_room_exists: "Dette rum findes allerede.",
    err_server_create: "Serverfejl under oprettelse.",
    err_room_not_found: "Rum ikke fundet.",
    err_wrong_password: "Forkert adgangskode.",
    err_server_join: "Serverfejl under tilslutning.",
    err_connect_fail: "Kunne ikke oprette forbindelse til serveren. Tjek adressen.",
    err_server_url: "Angiv serveradressen.",
    err_join_fields: "Rumkode og adgangskode er pakraevet.",
    err_mic: "Kunne ikke tilgå mikrofonen: ",
    sys_joined: "{user} deltog i rummet.", sys_left: "{user} forlod rummet.",
    voice_suffix: " (tale)", you_suffix: " (dig)"
  },
  de: {
    name: "Deutsch",
    tagline: "Passwortgeschutzte Text- und Sprachraume.",
    server_label: "Serveradresse",
    username_label: "Benutzername", username_placeholder: "Dein Benutzername",
    tab_join: "Beitreten", tab_create: "Erstellen",
    join_room_label: "Raumcode", join_room_placeholder: "z.B. team-rex",
    password_label: "Passwort",
    join_btn: "Raum betreten",
    create_room_label: "Raumcode (eindeutige Kennung)",
    create_name_label: "Anzeigename", create_name_placeholder: "z.B. Team Rex",
    create_btn: "Raum erstellen",
    leave_btn: "Verlassen",
    voice_title: "Sprache", voice_join_btn: "Sprachchat beitreten", voice_leave_btn: "Sprachchat verlassen",
    mute_btn: "Mikrofon stumm", unmute_btn: "Stummschaltung aufheben",
    members_title: "Mitglieder",
    message_placeholder: "Nachricht schreiben...", send_btn: "Senden",
    err_missing_fields: "Raumcode, Passwort und Benutzername erforderlich.",
    err_room_exists: "Dieser Raum existiert bereits.",
    err_server_create: "Serverfehler beim Erstellen.",
    err_room_not_found: "Raum nicht gefunden.",
    err_wrong_password: "Falsches Passwort.",
    err_server_join: "Serverfehler beim Beitreten.",
    err_connect_fail: "Verbindung zum Server nicht moglich. Adresse prufen.",
    err_server_url: "Serveradresse eingeben.",
    err_join_fields: "Raumcode und Passwort erforderlich.",
    err_mic: "Zugriff auf Mikrofon nicht moglich: ",
    sys_joined: "{user} ist dem Raum beigetreten.", sys_left: "{user} hat den Raum verlassen.",
    voice_suffix: " (Sprachchat)", you_suffix: " (du)"
  },
  it: {
    name: "Italiano",
    tagline: "Stanze di testo e voce protette da password.",
    server_label: "Indirizzo del server",
    username_label: "Nome utente", username_placeholder: "Il tuo nome utente",
    tab_join: "Entra", tab_create: "Crea",
    join_room_label: "Codice stanza", join_room_placeholder: "es: team-rex",
    password_label: "Password",
    join_btn: "Entra nella stanza",
    create_room_label: "Codice stanza (identificatore unico)",
    create_name_label: "Nome visualizzato", create_name_placeholder: "es: Team Rex",
    create_btn: "Crea stanza",
    leave_btn: "Esci",
    voice_title: "Voce", voice_join_btn: "Entra in voce", voice_leave_btn: "Esci da voce",
    mute_btn: "Disattiva microfono", unmute_btn: "Riattiva microfono",
    members_title: "Membri",
    message_placeholder: "Scrivi un messaggio...", send_btn: "Invia",
    err_missing_fields: "Codice stanza, password e nome utente richiesti.",
    err_room_exists: "Questa stanza esiste gia.",
    err_server_create: "Errore del server durante la creazione.",
    err_room_not_found: "Stanza non trovata.",
    err_wrong_password: "Password errata.",
    err_server_join: "Errore del server durante l'accesso.",
    err_connect_fail: "Impossibile connettersi al server. Controlla l'indirizzo.",
    err_server_url: "Inserisci l'indirizzo del server.",
    err_join_fields: "Codice stanza e password richiesti.",
    err_mic: "Impossibile accedere al microfono: ",
    sys_joined: "{user} e entrato nella stanza.", sys_left: "{user} ha lasciato la stanza.",
    voice_suffix: " (voce)", you_suffix: " (tu)"
  },
  pt: {
    name: "Portugues",
    tagline: "Salas de texto e voz protegidas por senha.",
    server_label: "Endereco do servidor",
    username_label: "Apelido", username_placeholder: "O teu apelido",
    tab_join: "Entrar", tab_create: "Criar",
    join_room_label: "Codigo da sala", join_room_placeholder: "ex: team-rex",
    password_label: "Senha",
    join_btn: "Entrar na sala",
    create_room_label: "Codigo da sala (identificador unico)",
    create_name_label: "Nome exibido", create_name_placeholder: "ex: Equipa Rex",
    create_btn: "Criar sala",
    leave_btn: "Sair",
    voice_title: "Voz", voice_join_btn: "Entrar na voz", voice_leave_btn: "Sair da voz",
    mute_btn: "Silenciar microfone", unmute_btn: "Ativar microfone",
    members_title: "Membros",
    message_placeholder: "Escreve uma mensagem...", send_btn: "Enviar",
    err_missing_fields: "Codigo da sala, senha e apelido sao obrigatorios.",
    err_room_exists: "Esta sala ja existe.",
    err_server_create: "Erro do servidor ao criar.",
    err_room_not_found: "Sala nao encontrada.",
    err_wrong_password: "Senha incorreta.",
    err_server_join: "Erro do servidor ao entrar.",
    err_connect_fail: "Nao foi possivel ligar ao servidor. Verifica o endereco.",
    err_server_url: "Indica o endereco do servidor.",
    err_join_fields: "Codigo da sala e senha sao obrigatorios.",
    err_mic: "Nao foi possivel aceder ao microfone: ",
    sys_joined: "{user} entrou na sala.", sys_left: "{user} saiu da sala.",
    voice_suffix: " (voz)", you_suffix: " (tu)"
  },
  ru: {
    name: "Русский",
    tagline: "Текстовые и голосовые комнаты, защищённые паролем.",
    server_label: "Адрес сервера",
    username_label: "Никнейм", username_placeholder: "Твой никнейм",
    tab_join: "Войти", tab_create: "Создать",
    join_room_label: "Код комнаты", join_room_placeholder: "напр: team-rex",
    password_label: "Пароль",
    join_btn: "Войти в комнату",
    create_room_label: "Код комнаты (уникальный идентификатор)",
    create_name_label: "Отображаемое имя", create_name_placeholder: "напр: Команда Rex",
    create_btn: "Создать комнату",
    leave_btn: "Выйти",
    voice_title: "Голос", voice_join_btn: "Войти в голосовой чат", voice_leave_btn: "Выйти из голосового чата",
    mute_btn: "Выключить микрофон", unmute_btn: "Включить микрофон",
    members_title: "Участники",
    message_placeholder: "Введите сообщение...", send_btn: "Отправить",
    err_missing_fields: "Требуются код комнаты, пароль и никнейм.",
    err_room_exists: "Эта комната уже существует.",
    err_server_create: "Ошибка сервера при создании.",
    err_room_not_found: "Комната не найдена.",
    err_wrong_password: "Неверный пароль.",
    err_server_join: "Ошибка сервера при подключении.",
    err_connect_fail: "Не удалось подключиться к серверу. Проверьте адрес.",
    err_server_url: "Введите адрес сервера.",
    err_join_fields: "Требуются код комнаты и пароль.",
    err_mic: "Не удалось получить доступ к микрофону: ",
    sys_joined: "{user} присоединился к комнате.", sys_left: "{user} покинул комнату.",
    voice_suffix: " (голос)", you_suffix: " (ты)"
  },
  hi: {
    name: "हिन्दी",
    tagline: "पासवर्ड-सुरक्षित टेक्स्ट और वॉइस रूम।",
    server_label: "सर्वर पता",
    username_label: "उपनाम", username_placeholder: "आपका उपनाम",
    tab_join: "शामिल हों", tab_create: "बनाएं",
    join_room_label: "कमरे का कोड", join_room_placeholder: "उदा: team-rex",
    password_label: "पासवर्ड",
    join_btn: "कमरे में प्रवेश करें",
    create_room_label: "कमरे का कोड (अद्वितीय पहचानकर्ता)",
    create_name_label: "प्रदर्शित नाम", create_name_placeholder: "उदा: टीम Rex",
    create_btn: "कमरा बनाएं",
    leave_btn: "छोड़ें",
    voice_title: "वॉइस", voice_join_btn: "वॉइस में शामिल हों", voice_leave_btn: "वॉइस छोड़ें",
    mute_btn: "माइक म्यूट करें", unmute_btn: "म्यूट हटाएं",
    members_title: "सदस्य",
    message_placeholder: "संदेश लिखें...", send_btn: "भेजें",
    err_missing_fields: "कमरे का कोड, पासवर्ड और उपनाम आवश्यक हैं।",
    err_room_exists: "यह कमरा पहले से मौजूद है।",
    err_server_create: "बनाते समय सर्वर त्रुटि।",
    err_room_not_found: "कमरा नहीं मिला।",
    err_wrong_password: "गलत पासवर्ड।",
    err_server_join: "शामिल होते समय सर्वर त्रुटि।",
    err_connect_fail: "सर्वर से कनेक्ट नहीं हो सका। पता जांचें।",
    err_server_url: "सर्वर का पता दर्ज करें।",
    err_join_fields: "कमरे का कोड और पासवर्ड आवश्यक हैं।",
    err_mic: "माइक्रोफ़ोन तक पहुंच नहीं हो सकी: ",
    sys_joined: "{user} कमरे में शामिल हुए।", sys_left: "{user} ने कमरा छोड़ दिया।",
    voice_suffix: " (वॉइस में)", you_suffix: " (आप)"
  }
};

let currentLang = "en";

function detectLanguage() {
  const supported = Object.keys(translations);
  const sysLang = (navigator.language || "en").toLowerCase().split("-")[0];
  return supported.includes(sysLang) ? sysLang : "en";
}

function t(key, params) {
  const dict = translations[currentLang] || translations.en;
  let str = dict[key] !== undefined ? dict[key] : (translations.en[key] || key);
  if (params) {
    Object.keys(params).forEach((p) => {
      str = str.replace(`{${p}}`, params[p]);
    });
  }
  return str;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = translations[currentLang] && translations[currentLang].rtl ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  const muteBtn = document.getElementById("mute-btn");
  if (muteBtn && !muteBtn.classList.contains("hidden")) {
    // Le libelle exact (muet/actif) est gere par renderer.js selon l'etat courant
  }
}

function setLang(code) {
  currentLang = translations[code] ? code : "en";
  applyStaticTranslations();
}

function initLangSelect() {
  const select = document.getElementById("lang-select");
  if (!select) return;
  Object.keys(translations).forEach((code) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = translations[code].name;
    select.appendChild(opt);
  });
  currentLang = detectLanguage();
  select.value = currentLang;
  applyStaticTranslations();
  select.addEventListener("change", () => setLang(select.value));
}

window.i18n = { t, setLang, applyStaticTranslations, initLangSelect, get currentLang() { return currentLang; } };

document.addEventListener("DOMContentLoaded", initLangSelect);
