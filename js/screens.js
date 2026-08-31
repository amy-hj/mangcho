/* ============================================================
   Hamnal 주화면 프로토타입 — 화면 렌더러
   좌표/색/치수는 Figma "디자인시스템_최종 / Design / 주화면 1–10" 기준
   ============================================================ */

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- 공통 조각 ---------- */

function statusBar() {
  return '' +
    '<div class="statusbar">' +
      '<div class="time">9:41</div>' +
      '<div class="phone-status">' +
        '<div class="sig"><img src="' + ASSET.signal + '" alt=""></div>' +
        '<div class="wifi"><img src="' + ASSET.wifi + '" alt=""></div>' +
        '<div class="bat"><img src="' + ASSET.battery + '" alt=""></div>' +
      '</div>' +
    '</div>';
}

/* active: 'home' | 'chat' */
function bottomNav(active) {
  var homeOn = active === 'home';
  var chatOn = active === 'chat';

  var homeIco = '<div class="ico">' +
    (homeOn ? '<img class="fill-home" src="' + ASSET.tabHomeOnV + '" alt="">' : '') +
    '<img class="base" src="' + (homeOn ? ASSET.tabHomeOn : ASSET.tabHomeOff) + '" alt=""></div>';

  var chatIco = '<div class="ico">' +
    (chatOn ? '<img class="fill-chat" src="' + ASSET.tabChatOnV + '" alt="">' : '') +
    '<img class="base" src="' + (chatOn ? ASSET.tabChatOn : ASSET.tabChatOff) + '" alt=""></div>';

  return '' +
    '<nav class="bottomnav">' +
      '<button class="tab" data-go="home">'       + homeIco + '<span>홈</span></button>' +
      '<button class="tab" data-go="chat-list">'  + chatIco + '<span>대화</span></button>' +
      '<button class="tab"><div class="ico"><img class="base" src="' + ASSET.tabLetter + '" alt=""></div><span>편지</span></button>' +
      '<button class="tab"><div class="ico"><img class="base" src="' + ASSET.tabMy + '" alt=""></div><span>마이</span></button>' +
    '</nav>';
}

/* opts: { back:'화면id', title:'…', kebab:'화면id' } */
function appBar(opts) {
  var lead = '';
  if (opts.back) lead += '<button class="icon20" data-go="' + opts.back + '"><img src="' + ASSET.back + '" alt="뒤로"></button>';
  lead += '<p class="title">' + esc(opts.title) + '</p>';

  var tail = opts.kebab
    ? '<button class="icon24" data-go="' + opts.kebab + '"><img src="' + ASSET.kebab + '" alt="메뉴"></button>'
    : '';

  return '<header class="appbar"><div class="lead">' + lead + '</div>' + tail + '</header>';
}

function bubble(m) {
  var isMe = m.side === 'me';
  var box =
    '<div class="bubble bubble--' + (isMe ? 'me' : 'other') + '">' +
      '<p class="txt">' + esc(m.text) + '</p>' +
      '<span class="at">' + esc(m.at) + '</span>' +
    '</div>';

  if (isMe) return '<div class="msg-row msg-row--me">' + box + '</div>';

  return '' +
    '<div class="msg-row">' +
      '<div class="avatar"><img src="' + ASSET.avatarChat + '" alt=""></div>' +
      '<div class="msg-col"><span class="who">' + esc(m.who) + '</span>' + box + '</div>' +
    '</div>';
}

/* 입력값이 있으면 전송 버튼이 활성(노란색)으로 바뀝니다 */
function composer(placeholder, value) {
  var on = !!(value && value.trim());
  return '' +
    '<div class="composer"><div class="inner">' +
      '<div class="field">' +
        '<input id="msg-input" type="text" placeholder="' + esc(placeholder) + '" value="' + esc(value || '') + '">' +
      '</div>' +
      '<button class="send' + (on ? ' is-on' : '') + '" id="btn-send"' + (on ? '' : ' disabled') + '>' +
        '<img src="' + (on ? ASSET.sendActive : ASSET.send) + '" alt="보내기">' +
      '</button>' +
    '</div></div>';
}

/* ---------- 홈 본문 (주화면 1 · 오늘의 운세 배경 공용) ---------- */
function homeBody() {
  var pill = function (mod, v1, v2, base, label) {
    return '<div class="pill pill--' + mod + '"><div class="inner">' +
      '<div class="stack">' +
        '<img class="v1" src="' + v1 + '" alt="">' +
        '<img class="v2" src="' + v2 + '" alt="">' +
        '<img class="base" src="' + base + '" alt="">' +
      '</div>' +
      '<span class="label">' + esc(label) + '</span>' +
    '</div></div>';
  };

  return '' +
      '<img class="home-cage" src="' + ASSET.cage + '" alt="">' +
      statusBar() +
      pill('seed',   ASSET.seedV1,   ASSET.seedV2,   ASSET.seed, HOME.seeds) +
      pill('letter', ASSET.letterV1, ASSET.letterV2, ASSET.seed, HOME.letter) +

      '<div class="side-actions">' +
        '<button class="act act--fortune" data-go="fortune"><div class="ico">' +
          '<img class="v1" src="' + ASSET.fortuneV1 + '" alt="">' +
          '<img class="v2" src="' + ASSET.fortuneV2 + '" alt="">' +
          '<img class="base" src="' + ASSET.fortune + '" alt="">' +
        '</div><span class="cap">오늘운세</span></button>' +
        '<button class="act act--attend" data-go="attend"><div class="ico">' +
          '<img class="v1" src="' + ASSET.attendV1 + '" alt="">' +
          '<img class="v2" src="' + ASSET.attendV2 + '" alt="">' +
          '<img class="base" src="' + ASSET.attend + '" alt="">' +
        '</div><span class="cap">출석체크</span></button>' +
      '</div>' +

      '<div class="home-speech">' +
        '<img src="' + ASSET.speech + '" alt="">' +
        '<p>' + esc(HOME.speech) + '</p>' +
      '</div>' +
      '<img class="home-char" src="' + ASSET.charHome + '" alt="">' +

      bottomNav('home');
}

/* 주화면 1 · home */
function scHome() {
  return '<div class="screen screen--home">' + homeBody() + '</div>';
}

/* ---------- 주화면 2 · 대화없을때 ---------- */
function scChatEmpty() {
  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      '<header class="appbar"><div class="lead"><p class="title">대화 목록</p></div></header>' +
      '<div class="empty-state">' +
        '<img class="art" src="' + ASSET.charFull + '" alt="">' +
        '<p>무슨 얘길 해줄지 기다리고 있어!</p>' +
      '</div>' +
      '<button class="fab" data-go="chat-new"><img src="' + ASSET.fab + '" alt="새 대화"></button>' +
      bottomNav('chat') +
    '</div>';
}

/* ---------- 주화면 3 · 대화 처음 시작시 ---------- */
function scChatNew() {
  var cards = CHARACTERS.map(function (c) {
    return '<button class="pick-card" data-pick="' + c.id + '">' +
      '<img src="' + c.card + '" alt="">' +
      '<span class="nm">' + esc(c.name) + '</span>' +
      '<span class="ds">' + esc(c.desc) + '</span>' +
    '</button>';
  }).join('');

  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      appBar({ back: 'chat-empty', title: '새대화' }) +
      '<p class="pick-title">누구랑 대화할래?</p>' +
      '<div class="pick-row">' + cards + '</div>' +
      bottomNav('chat') +
    '</div>';
}

/* ---------- 주화면 4 · 대화 (첫 인사 + 추천 문구) ---------- */
function scChatStart(state) {
  var msgs = (state.startMsgs || CHAT_START).map(bubble).join('');

  /* 추천 문구는 하나라도 누르면 사라집니다 */
  var chips = '';
  if (state.showSuggests) {
    chips = '<div class="suggests">' + SUGGESTS.map(function (line) {
      return '<div class="line">' + line.map(function (t) {
        return '<button class="chip" data-say="' + esc(t.trim()) + '">' + esc(t) + '</button>';
      }).join('') + '</div>';
    }).join('') + '</div>';
  }

  return '' +
    '<div class="screen screen--white">' +
      statusBar() +
      appBar({ back: 'chat-empty', title: state.roomName || '새대화', kebab: 'chat-menu' }) +
      '<div class="msg-list' + (state.showSuggests ? ' msg-list--short' : '') + '">' + msgs + '</div>' +
      chips +
      composer('메시지를 입력해주세요', state.draft) +
      bottomNav('chat') +
    '</div>';
}

/* ---------- 주화면 5 · 대화 (진행 중) ---------- */
function scChat(state) {
  var msgs = (state.msgs || CHAT_ONGOING).map(bubble).join('');

  return '' +
    '<div class="screen screen--white">' +
      statusBar() +
      appBar({ back: 'chat-list', title: state.roomName || ROOMS[0].name, kebab: 'chat-menu' }) +
      '<div class="msg-list">' + msgs + '</div>' +
      composer('메시지를 입력해주세요', state.draft) +
      bottomNav('chat') +
    '</div>';
}

/* ---------- 주화면 6·7 · 대화 목록 / 고정 ---------- */
function chatListMarkup(rooms) {
  var items = rooms.map(function (r) {
    return '<button class="list-item" data-room="' + r.id + '">' +
      '<div class="avatar"><img src="' + r.avatar + '" alt=""></div>' +
      '<div class="body">' +
        '<span class="nm">' + esc(r.name) + '</span>' +
        (r.pinned ? '<img class="pin" src="' + ASSET.pinFilled + '" alt="고정됨">' : '') +
        '<span class="at">' + esc(r.at) + '</span>' +
      '</div>' +
    '</button>';
  }).join('');

  return '' +
    '<div class="list-wrap">' +
      '<div class="list-title">대화 목록</div>' +
      '<div class="list-items">' + items + '</div>' +
    '</div>';
}

function scChatList(state) {
  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      chatListMarkup(state.rooms) +
      '<button class="fab" data-go="chat-new"><img src="' + ASSET.fab + '" alt="새 대화"></button>' +
      bottomNav('chat') +
    '</div>';
}

function scChatListPinned(state) {
  var rooms = state.rooms.map(function (r, i) {
    return i === 0 ? Object.assign({}, r, { pinned: true }) : r;
  });
  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      chatListMarkup(rooms) +
      '<button class="fab" data-go="chat-new"><img src="' + ASSET.fab + '" alt="새 대화"></button>' +
      bottomNav('chat') +
    '</div>';
}

/* ---------- 대화 화면 배경 (8·9·10 공통) ---------- */
function chatBackdrop(state) {
  var msgs = (state.msgs || CHAT_ONGOING).map(bubble).join('');
  return '' +
      statusBar() +
      appBar({ title: state.roomName || ROOMS[0].name }) +
      '<div class="msg-list">' + msgs + '</div>' +
      composer('메시지를 입력해주세요') +
      bottomNav('chat');
}

/* ---------- 주화면 8 · 대화방 메뉴 ---------- */
function scChatMenu(state) {
  return '' +
    '<div class="screen screen--white">' +
      chatBackdrop(state) +
      '<div class="dim dim--menu" data-go="chat"></div>' +
      '<div class="room-menu">' +
        '<button data-go="chat-list-pin"><span class="mi"><img class="sm" src="' + ASSET.menuPin + '" alt=""></span><span>채팅방 고정</span></button>' +
        '<button data-go="chat-rename"><span class="mi"><img src="' + ASSET.menuRename + '" alt=""></span><span>대화방명 바꾸기</span></button>' +
        '<button data-go="chat-delete"><span class="mi"><img src="' + ASSET.menuDelete + '" alt=""></span><span>채팅방 삭제</span></button>' +
      '</div>' +
    '</div>';
}

/* ---------- 주화면 9 · 대화방명 바꾸기 (10-1) ---------- */
function scChatRename(state) {
  var name = state.roomName || ROOMS[0].name;
  return '' +
    '<div class="screen screen--white">' +
      chatBackdrop(state) +
      '<div class="dim dim--modal" data-go="chat-menu"></div>' +
      '<div class="modal modal--rename">' +
        '<p class="m-title">대화방명 바꾸기</p>' +
        '<div class="m-field">' +
          '<div class="row">' +
            '<input id="rename-input" type="text" maxlength="50" value="' + esc(name) + '">' +
            '<span class="count" id="rename-count">' + name.length + '/50</span>' +
          '</div>' +
          '<div class="line"></div>' +
        '</div>' +
        '<div class="m-actions">' +
          '<button class="cancel" data-go="chat-menu">취소하기</button>' +
          '<button class="confirm" id="btn-rename">변경하기</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ---------- 주화면 10 · 채팅방 삭제 (10-2) ---------- */
function scChatDelete(state) {
  return '' +
    '<div class="screen screen--white">' +
      chatBackdrop(state) +
      '<div class="dim dim--modal" data-go="chat-menu"></div>' +
      '<div class="modal modal--delete">' +
        '<p class="m-title">채팅방 삭제</p>' +
        '<div class="m-desc">채팅방을 삭제하면 다시 되살릴 수 없어요.<br>그리고 편지에도 반영되지 않아요.</div>' +
        '<div class="m-actions">' +
          '<button class="cancel" data-go="chat-menu">취소하기</button>' +
          '<button class="confirm" id="btn-delete">삭제하기</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ============================================================
   출석체크 (Figma 출첵 체크 2 · 3)
   ============================================================ */
function calendarMarkup() {
  var CIRCLE = { e: ASSET.calEmpty, t: ASSET.calToday, x: ASSET.calSelected };

  var head = ATTEND_WEEKDAYS.map(function (w) {
    return '<div class="cal-cell"><span class="cal-wd">' + esc(w) + '</span></div>';
  }).join('');

  var rows = ATTEND_DAYS.map(function (row) {
    return '<div class="cal-row">' + row.map(function (c) {
      if (!c) return '<div class="cal-cell cal-cell--blank"></div>';
      var mark = c.s === 's'
        ? '<img class="cal-stamp" src="' + ASSET.stamp + '" alt="출석">'
        : '<img class="cal-circle" src="' + CIRCLE[c.s] + '" alt="">';
      return '<div class="cal-cell"><span class="cal-day">' + c.d + '</span>' + mark + '</div>';
    }).join('') + '</div>';
  }).join('');

  return '' +
    '<div class="calendar">' +
      '<div class="cal-month">' +
        '<button class="cal-arrow"><img src="' + ASSET.calPrev + '" alt="이전 달"></button>' +
        '<span class="cal-title">' + esc(ATTEND_MONTH) + '</span>' +
        '<button class="cal-arrow cal-arrow--next"><img src="' + ASSET.calNext + '" alt="다음 달"></button>' +
      '</div>' +
      '<div class="cal-row">' + head + '</div>' +
      rows +
    '</div>';
}

function attendBackdrop() {
  return '' +
    statusBar() +
    appBar({ back: 'home', title: '출석체크' }) +
    calendarMarkup() +
    '<button class="attend-cta" data-go="attend-done">' +
      '<span class="attend-cta-label">' + esc(ATTEND_CTA) + '</span>' +
      '<span class="stack stack--24">' +
        '<img class="v1" src="' + ASSET.seed24V1 + '" alt="">' +
        '<img class="v2" src="' + ASSET.seed24V2 + '" alt="">' +
        '<img class="base" src="' + ASSET.seed24 + '" alt="">' +
      '</span>' +
    '</button>';
}

function scAttend() {
  return '<div class="screen screen--paper">' + attendBackdrop() + '</div>';
}

/* 해바라기씨 받기 버튼 누른 후 — 출석 완료 카드 */
function scAttendDone() {
  return '' +
    '<div class="screen screen--paper">' +
      attendBackdrop() +
      '<div class="dim dim--strong" data-go="attend"></div>' +
      '<div class="modal modal--attend">' +
        '<p class="m-title">' + esc(ATTEND_DONE.title) + '</p>' +
        '<div class="m-desc">' + ATTEND_DONE.desc.map(esc).join('<br>') + '</div>' +
        '<button class="confirm confirm--wide" data-go="attend">' + esc(ATTEND_DONE.confirm) + '</button>' +
      '</div>' +
    '</div>';
}

/* ============================================================
   오늘의 운세 — 홈 위에 모달
   ============================================================ */
function scFortune() {
  var items = FORTUNE.items.map(function (it) {
    return '<div class="f-item"><span class="f-label">' + esc(it[0]) + '</span>' +
           '<span class="f-value">' + esc(it[1]) + '</span></div>';
  }).join('');

  return '' +
    '<div class="screen screen--home">' +
      homeBody() +   /* 배경은 홈 화면 전체 (Figma 785:6665) */
      '<div class="dim dim--strong" data-go="home"></div>' +
      '<div class="fortune">' +
        '<div class="f-top">' +
          '<div class="f-close-row">' +
            '<button class="f-close" data-go="home"><img src="' + ASSET.modalClose + '" alt="닫기"></button>' +
          '</div>' +
          '<div class="f-body">' +
            '<div class="f-score">' +
              '<p class="f-score-label">' + esc(FORTUNE.scoreLabel) + '</p>' +
              '<p class="f-score-value">' + esc(FORTUNE.score) + '</p>' +
            '</div>' +
            '<p class="f-quote">' + esc(FORTUNE.quote) + '</p>' +
            '<div class="f-desc">' + FORTUNE.body.map(esc).join('<br>') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="f-summary">' +
          '<p class="f-summary-label">' + esc(FORTUNE.summaryLabel) + '</p>' +
          '<div class="f-items">' + items + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ---------- 라우팅 테이블 ---------- */
var SCREENS = {
  'home':          scHome,
  'chat-empty':    scChatEmpty,
  'chat-new':      scChatNew,
  'chat-start':    scChatStart,
  'chat':          scChat,
  'chat-list':     scChatList,
  'chat-list-pin': scChatListPinned,
  'chat-menu':     scChatMenu,
  'chat-rename':   scChatRename,
  'chat-delete':   scChatDelete,
  'attend':        scAttend,
  'attend-done':   scAttendDone,
  'fortune':       scFortune
};
