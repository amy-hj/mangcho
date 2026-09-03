/* ============================================================
   Hamnal — 기능 패치 (features.js)   ※ 맨 마지막에 로드
   ▶ 덮어쓰는 함수: calendarMarkup, attendBackdrop, scAttendDone, scFortune,
                    bubble, chatListMarkup, scMy, scMyHistory, refreshSeeds
   ▶ 감싸는 함수:   render (앞뒤 훅), save (기능 상태 동시 저장)
   ▶ 추가 화면:     saju.js 참고 (사주팔자 / 자미두수)
 
   기능 상태(FEAT)는 별도 키 'hamnal_feat_v1' 에 저장됩니다.
   ============================================================ */
 
var TEST_RESET = true; /* 새로고침/창 껐다 킬때마다 데이터 다 삭제하고 온보딩부터 시작 */
 
/* ---------- 기능 상태 ---------- */
var FEAT_KEY = 'hamnal_feat_v1';
if (TEST_RESET) {
  try { localStorage.removeItem(FEAT_KEY); localStorage.removeItem('hamnal_v1'); } catch (e) {}
}
 
/* [수정1] 폼 기본값: 이름은 빈칸(placeholder 노출), 생년월일시는 현재 시각, 지역·성별 기본값 */
(function () {
  var t = new Date();
  function z(n) { return String(n).padStart(2, '0'); }
  PROFILE_FORM.name = '';
  PROFILE_FORM.year = String(t.getFullYear());
  PROFILE_FORM.month = z(t.getMonth() + 1);
  PROFILE_FORM.day = z(t.getDate());
  PROFILE_FORM.hour = z(t.getHours());
  PROFILE_FORM.minute = z(t.getMinutes());
  PROFILE_FORM.region = '대한민국 서울';
  PROFILE_FORM.gender = '남성';
})();
 
/* [수정2] 연애 응답: 중립 문구로 교체 (사적 맥락 연상 표현 금지) */
(function () {
  for (var i = 0; i < RULES.length; i++) if (RULES[i].topic === '연애') {
    RULES[i].melang = ['오! 연애 고민이구나! 어떤 상황인지 천천히 말해줘.', '듣고 나서 네 마음이 어떤지도 궁금해.'];
    RULES[i].kochi  = ['연애 고민. 알겠어, 들어볼게.', '상황부터 정리해줘. 언제부터 그랬어?'];
  }
})();
 
/* [수정3] "내가 잘 하고 있는지 모르겠어" 데모 점프 무력화 → 일반 메시지로 현재 대화에서 이어짐 */
JUMP_TO_ONGOING = '__demo_disabled__';
var FEAT = (function () {
  var d = null;
  try { d = JSON.parse(localStorage.getItem(FEAT_KEY) || 'null'); } catch (e) {}
  return d || {
    seeds: 0,              /* 해바라기씨: 0부터 시작 */
    seedHistory: [],       /* { label, at, delta } — 최신순 */
    attendance: {},        /* { 'YYYY-MM-DD': true } */
    letterRead: {},        /* { 'YYYY-MM': true } */
    form: null,            /* 회원정보 (PROFILE_FORM 형태) */
    hamName: '',           /* 온보딩에서 지어준 햄찌 이름 */
    cal: null              /* { y, m } 달력 표시 월 */
  };
})();
function featSave() { try { localStorage.setItem(FEAT_KEY, JSON.stringify(FEAT)); } catch (e) {} }
 
/* ---------- 날짜 유틸 ---------- */
function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function ymdDot(d) { return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0'); }
function ym(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
 
/* 편지 D-day: 이번 달 편지를 안 읽었으면 "편지 도착", 읽었으면 다음 달 1일까지 D-n */
function letterLabel() {
  var today = new Date();
  if (!FEAT.letterRead[ym(today)]) return '편지 도착';
  var next = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  var days = Math.round((next - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
  return '편지 D-' + days;
}
 
/* ---------- 씨앗 (단일 진실 소스 = FEAT.seeds) ---------- */
function addSeeds(n, label) {
  FEAT.seeds += n;
  FEAT.seedHistory.unshift({ label: label, at: ymdDot(new Date()), delta: (n > 0 ? '+ ' : '- ') + Math.abs(n) });
  featSave();
}
function syncSeeds() {
  if (typeof state !== 'undefined') state.seeds = FEAT.seeds;
  HOME.seeds  = String(FEAT.seeds);
  HOME.letter = letterLabel();
}
refreshSeeds = function () { syncSeeds(); }; /* app.js 의 "메시지 수 = 씨앗" 규칙 폐기 */
 
/* ---------- 회원정보 → 마이페이지 반영 ---------- */
var _formApplied = false;
function syncProfile() {
  if (typeof state === 'undefined') return;
  /* 저장된 회원정보는 최초 1회만 state.form 에 적용 — 이후엔 온보딩/마이에서 입력한 state.form 이 항상 우선 */
  if (FEAT.form && !_formApplied) { state.form = Object.assign({}, state.form, FEAT.form); _formApplied = true; }
  if (FEAT.hamName && !state.onbName) state.onbName = FEAT.hamName;
  /* 마이 햄찌 행: 온보딩에서 고른 캐릭터 + 지어준 이름 */
  if (typeof ME !== 'undefined' && ME.pet) {
    var cid0 = FEAT.onbCharId || state.charId || 'melang';
    var ch = CHARACTERS.filter(function (x) { return x.id === cid0; })[0] || CHARACTERS[0];
    ME.pet.name = state.onbName || ch.name;   /* 괄호 없이 이름만 */
    ME.pet.desc = ch.desc;
  }
  var f = state.form || PROFILE_FORM;
  ME.name  = f.name || '이름을 알려줘';
  ME.sex   = /여/.test(f.gender || '') ? '♀' : '♂';
  ME.birth = f.year + '.' + String(f.month).padStart(2, '0') + '.' + String(f.day).padStart(2, '0') +
             (f.unknownTime ? ' (시간 모름)' : ' ' + String(f.hour).padStart(2, '0') + ':' + String(f.minute).padStart(2, '0')) +
             (f.region ? ' ' + f.region : '');
}
 
/* ---------- render 훅 ---------- */
var FORM_SCREENS = { 'onb-profile': 1, 'my-edit': 1, 'onb-pick': 1 };
function captureForm() {
  if (typeof state === 'undefined') return;
  if (state.current === 'onb-profile' || state.current === 'my-edit') { FEAT.form = Object.assign({}, state.form); }
  if (state.current === 'onb-pick') {
    var n = document.querySelector('#viewport #onb-name'); if (n) state.onbName = n.value;
    FEAT.hamName = state.onbName || '';
    FEAT.onbCharId = state.charId || 'melang';   /* [수정4] 온보딩에서 고른 햄찌 기록 */
  }
  featSave();
}
var _renderOrig = render;
render = function (id, opts) {
  if (state && state.current && FORM_SCREENS[state.current] && state.current !== id) captureForm(); /* 폼 화면을 떠날 때 저장 */
  syncSeeds();
  syncProfile();
  if (id === 'attend-done') { ATTEND_DONE.desc = ['오늘 씨앗 1개를 받았어요!', '자정이 지나면 안 쓴 씨앗은 사라져요']; }
  _renderOrig(id, opts);
  setupSuggestSwipe();
  var nmIn = viewport.querySelector('[data-form="name"]');
  if (nmIn) nmIn.placeholder = '이름을 알려줘';
  if (id === 'letter-opened') {            /* 편지를 열면 이번 달 읽음 처리 → D-day 카운트 시작 */
    var k = ym(new Date());
    if (!FEAT.letterRead[k]) { FEAT.letterRead[k] = true; featSave(); }
  }
};
var _saveOrig = save;
save = function () { _saveOrig(); featSave(); };
 
/* 2-2 · 추천 문구 스와이프: CSS 없이도 동작하도록 스타일을 직접 주고, 데스크톱에선 마우스 드래그로 스크롤 */
function setupSuggestSwipe() {
  var box = document.querySelector('#viewport .suggests');
  if (!box) return;
  box.style.left = '0'; box.style.width = '375px'; box.style.padding = '0 16px'; box.style.boxSizing = 'border-box'; box.style.alignItems = 'stretch';
  Array.prototype.forEach.call(box.querySelectorAll('.line'), function (line) {
    line.style.display = 'flex'; line.style.flexWrap = 'nowrap'; line.style.overflowX = 'auto';
    line.style.webkitOverflowScrolling = 'touch'; line.style.scrollbarWidth = 'none'; line.style.cursor = 'grab';
    Array.prototype.forEach.call(line.children, function (c) { c.style.flex = '0 0 auto'; });
    var down = false, sx = 0, sl = 0, moved = false;
    line.addEventListener('mousedown', function (e) { down = true; moved = false; sx = e.pageX; sl = line.scrollLeft; line.style.cursor = 'grabbing'; });
    line.addEventListener('mousemove', function (e) { if (!down) return; var dx = e.pageX - sx; if (Math.abs(dx) > 4) moved = true; line.scrollLeft = sl - dx; });
    ['mouseup', 'mouseleave'].forEach(function (ev) { line.addEventListener(ev, function () { down = false; line.style.cursor = 'grab'; }); });
    /* 드래그로 넘긴 뒤 손을 뗄 때 칩이 눌리지 않게 */
    line.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  });
}
 
/* ============================================================
   1-4 · 출석 달력 (실제 달력 · 전월/후월 · 오늘 테두리 · 도장)
   ============================================================ */
function calState() {
  var t = new Date();
  if (!FEAT.cal) FEAT.cal = { y: t.getFullYear(), m: t.getMonth() + 1 };
  return FEAT.cal;
}
calendarMarkup = function () {
  var cs = calState(), y = cs.y, m = cs.m;
  var today = new Date(), todayKey = ymd(today);
  var first = new Date(y, m - 1, 1), daysIn = new Date(y, m, 0).getDate();
  var head = ATTEND_WEEKDAYS.map(function (w) { return '<div class="cal-cell"><span class="cal-wd">' + esc(w) + '</span></div>'; }).join('');
  var cells = [], i;
  for (i = 0; i < first.getDay(); i++) cells.push('<div class="cal-cell cal-cell--blank"></div>');
  for (i = 1; i <= daysIn; i++) {
    var d = new Date(y, m - 1, i), key = ymd(d);
    var isToday = key === todayKey, done = !!FEAT.attendance[key], future = d > today && !isToday;
    var mark = done
      ? '<img class="cal-stamp" src="' + ASSET.stamp + '" alt="출석">'
      : '<img class="cal-circle" src="' + ASSET.calEmpty + '" alt="">';
    cells.push('<div class="cal-cell' + (isToday ? ' cal-cell--today' : '') + (future ? ' cal-cell--future' : '') + '">' +
      '<span class="cal-day">' + i + '</span>' + mark + '</div>');
  }
  while (cells.length % 7) cells.push('<div class="cal-cell cal-cell--blank"></div>');
  var rows = '';
  for (i = 0; i < cells.length; i += 7) rows += '<div class="cal-row">' + cells.slice(i, i + 7).join('') + '</div>';
  return '' +
    '<div class="calendar">' +
      '<div class="cal-month">' +
        '<button class="cal-arrow" data-cal="prev"><img src="' + ASSET.calPrev + '" alt="이전 달"></button>' +
        '<span class="cal-title">' + y + '년 ' + m + '월</span>' +
        '<button class="cal-arrow cal-arrow--next" data-cal="next"><img src="' + ASSET.calNext + '" alt="다음 달"></button>' +
      '</div>' +
      '<div class="cal-row">' + head + '</div>' + rows +
    '</div>';
};
attendBackdrop = function () {
  var done = !!FEAT.attendance[ymd(new Date())];
  return '' +
    statusBar() + appBar({ back: 'home', title: '출석체크' }) + calendarMarkup() +
    '<button class="attend-cta' + (done ? ' is-done' : '') + '" id="btn-attend"' + (done ? ' disabled' : '') + '>' +
      '<span class="attend-cta-label">' + (done ? '오늘 출석 완료! 내일 또 만나 츄' : esc(ATTEND_CTA)) + '</span>' +
      '<span class="stack stack--24"><img class="v1" src="' + ASSET.seed24V1 + '" alt=""><img class="v2" src="' + ASSET.seed24V2 + '" alt=""><img class="base" src="' + ASSET.seed24 + '" alt=""></span>' +
    '</button>';
};
scAttendDone = function () {
  return '<div class="screen screen--paper">' + attendBackdrop() +
    '<div class="dim dim--strong" data-go="attend"></div>' +
    '<div class="modal modal--attend">' +
      '<p class="m-title">' + esc(ATTEND_DONE.title) + '</p>' +
      '<div class="m-desc">' + ATTEND_DONE.desc.map(esc).join('<br>') + '</div>' +
      '<button class="confirm confirm--wide" data-go="attend">' + esc(ATTEND_DONE.confirm) + '</button>' +
    '</div></div>';
};
 
/* 오늘의 운세 */
scFortune = function () {
  var f = sajuForm(), F;
  try { F = SAJU.fortune(f, new Date()); } catch (e) { F = FORTUNE; }
  var items = F.items.map(function (it) {
    return '<div class="f-item"><span class="f-label">' + esc(it[0]) + '</span><span class="f-value">' + esc(it[1]) + '</span></div>';
  }).join('');
  return '' +
    '<div class="screen screen--home">' + homeBody() +
      '<div class="dim dim--strong" data-go="home"></div>' +
      '<div class="fortune">' +
        '<div class="f-top">' +
          '<div class="f-close-row"><button class="f-close" data-go="home"><img src="' + ASSET.modalClose + '" alt="닫기"></button></div>' +
          '<div class="f-body">' +
            '<div class="f-score"><p class="f-score-label">' + esc(F.scoreLabel) + '</p><p class="f-score-value">' + esc(F.score) + '</p></div>' +
            '<p class="f-quote">' + esc(F.quote) + '</p>' +
            '<div class="f-desc">' + F.body.map(esc).join('<br>') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="f-summary"><p class="f-summary-label">' + esc(F.summaryLabel) + '</p><div class="f-items">' + items + '</div></div>' +
      '</div>' +
    '</div>';
};
 
/* 코치 선택 시 말풍선 아바타/이름 · 핀 위치 */
function roomCharId() {
  if (typeof state === 'undefined') return 'melang';
  if (state.current === 'chat-start' || state.current === 'chat-new') return state.charId || 'melang';
  return state.chatCharId || state.charId || 'melang';
}
bubble = function (m) {
  var isMe = m.side === 'me';
  var box = '<div class="bubble bubble--' + (isMe ? 'me' : 'other') + '"><p class="txt">' + esc(m.text) + '</p><span class="at">' + esc(m.at) + '</span></div>';
  if (isMe) return '<div class="msg-row msg-row--me">' + box + '</div>';
  var cid = roomCharId();
  var kochi = cid === 'kochi';
  var av = kochi ? ASSET.avatar2 : ASSET.avatarChat;
  var who = (cid === FEAT.onbCharId && FEAT.hamName) ? FEAT.hamName : (kochi ? '코치' : '멜랑');
  return '<div class="msg-row msg-row--' + (kochi ? 'kochi' : 'melang') + '"><div class="avatar"><img src="' + av + '" alt=""></div>' +
    '<div class="msg-col"><span class="who">' + esc(who) + '</span>' + box + '</div></div>';
};
 
/* [수정4] 방 생성 시 그 방의 햄찌 기록 · 방 열 때 복원(없으면 아바타로 추론) */
var _pushOrig = pushMessage;
pushMessage = function (text, bucket) {
  var before = state.rooms.length;
  _pushOrig(text, bucket);
  if (state.rooms.length > before) { state.rooms[0].charId = state.charId; featSave(); }
};
var _openOrig = openRoom;
openRoom = function (id) {
  var room = state.rooms.filter(function (r) { return r.id === id; })[0];
  if (room) state.chatCharId = room.charId || (String(room.avatar || '').indexOf('kochi') !== -1 ? 'kochi' : 'melang');
  _openOrig(id);
};
chatListMarkup = function (rooms) {
  var items = rooms.map(function (r) {
    return '<button class="list-item" data-room="' + r.id + '">' +
      '<div class="avatar"><img src="' + r.avatar + '" alt=""></div>' +
      '<div class="body">' +
        '<div class="nm-wrap" style="display:flex;align-items:center;gap:4px;min-width:0"><span class="nm">' + esc(r.name) + '</span>' + (r.pinned ? '<img class="pin" src="' + ASSET.pinFilled + '" alt="고정됨" style="width:12px;height:12px;flex:none">' : '') + '</div>' +
        '<span class="at">' + esc(r.at) + '</span>' +
      '</div></button>';
  }).join('');
  return '<div class="list-wrap"><div class="list-title">대화 목록</div><div class="list-items">' + items + '</div></div>';
};
 
/* 온보딩에서 고른 햄찌 → 홈 캐릭터 이미지 + 이름 */
function hamInfo() {
  var cid = (typeof FEAT !== 'undefined' && FEAT.onbCharId) ? FEAT.onbCharId
          : ((typeof state !== 'undefined' && state.charId) || 'melang');
  var kochi = cid === 'kochi';
  var base = kochi ? '코치' : '멜랑';
  var nick = (typeof state !== 'undefined' && state.onbName) ? state.onbName : '';
  return { kochi: kochi, base: base, nick: nick, label: nick || base,
           homeImg: kochi ? ASSET.cardKochi : ASSET.charHome, avatar: kochi ? ASSET.avatar2 : ASSET.avatar1 };
}
var _homeBodyOrig = homeBody;
homeBody = function () {
  var h = hamInfo();
  var html = _homeBodyOrig();
  html = html.replace('<img class="home-char" src="' + ASSET.charHome + '"', '<img class="home-char' + (h.kochi ? ' home-char--kochi' : '') + '" src="' + h.homeImg + '"');
  return html;
};
 
/*  마이 (회원정보 반영 + 명반 진입) · 씨앗 내역 */
var _scMyOrig = scMy;
scMy = function (state) {
  var html = _scMyOrig(state);
  var h = hamInfo();
  html = html.replace('<img class="avatar34" src="' + ASSET.avatarTori + '"', '<img class="avatar34" src="' + h.avatar + '"');
  var card = '<button class="my-card my-menu" data-go="saju"><span class="lbl">내 명반 · 사주팔자 / 자미두수</span><img class="chev" src="' + ASSET.chevron + '" alt=""></button>';
  return html.replace('<p class="my-section">설정</p>', card + '<p class="my-section">설정</p>');
};
scMyHistory = function (state) {
  var hist = FEAT.seedHistory.length ? FEAT.seedHistory : [];
  var rows = hist.map(function (h) {
    return '<div class="hist-row"><span class="hist-t"><span class="nm">' + esc(h.label) + '</span><span class="at">' + esc(h.at) + '</span></span>' +
      '<span class="delta' + (h.delta.charAt(0) === '-' ? ' minus' : '') + '">' + esc(h.delta) + '</span></div>';
  }).join('') || '<p class="hist-empty">아직 내역이 없어요. 출석체크로 첫 씨앗을 받아보세요 🌻</p>';
  var status = SEED_STATUS.map(function (s) {
    return '<div class="hist-status"><span class="lbl' + (s.muted ? ' muted' : '') + '">' + esc(s.label) + '</span><span class="num">' + esc(s.value) + '</span></div>';
  }).join('');
  return '' +
    '<div class="screen screen--paper">' + statusBar() + subBar('my', '씨앗 내역') +
      '<div class="hist-body">' +
        '<div class="my-card hist-card"><p class="card-title">내 씨앗</p>' +
          '<div class="hist-total">' + seedIcon() + '<span class="big">' + FEAT.seeds + '</span></div>' +
          '<div class="hist-line"></div>' + status +
          '<button class="gray-btn gray-btn--wide" data-go="my-charge">충전하기</button></div>' +
        '<div class="my-card ticket-card"><p class="card-title">' + esc(SEED_TICKET.title) + '</p>' +
          '<div class="ticket-row"><span class="nm">' + esc(SEED_TICKET.name) + '</span><span class="until">' + esc(SEED_TICKET.until) + '</span></div>' +
          '<p class="ticket-note">' + SEED_TICKET.note.map(esc).join('<br>') + '</p></div>' +
        '<div class="my-card hist-card"><p class="card-title">사용내역</p>' + rows + '</div>' +
      '</div></div>';
};
 
/* [수정5] 대화방 메뉴: 고정된 방이면 "고정 해제"로 표시하고, 누르면 토글 */
function currentRoom() {
  if (typeof state === 'undefined') return null;
  return state.rooms.filter(function (r) { return r.id === state.currentRoomId; })[0]
      || state.rooms.filter(function (r) { return r.name === state.roomName; })[0] || null;
}
var _scChatMenuOrig = scChatMenu;
scChatMenu = function (state) {
  var html = _scChatMenuOrig(state);
  var room = currentRoom();
  html = html.replace('data-go="chat-list-pin"', 'data-pin-toggle="1"');
  if (room && room.pinned) html = html.replace('<span>채팅방 고정</span>', '<span>고정 해제</span>');
  return html;
};
 
/* SCREENS 맵은 함수 참조를 고정으로 들고 있으므로 덮어쓴 화면 함수를 재등록 */
SCREENS['fortune']     = scFortune;
SCREENS['attend-done'] = scAttendDone;
SCREENS['my']          = scMy;
SCREENS['my-history']  = scMyHistory;
SCREENS['chat-menu']   = scChatMenu;
 
/* 이벤트 (app.js 리스너 뒤에 실행됨) */
document.getElementById('viewport').addEventListener('click', function (e) {
  var el;
 
  /* [수정5] 대화방 고정 토글 */
  el = e.target.closest('[data-pin-toggle]');
  if (el) {
    var room = currentRoom();
    if (room) room.pinned = !room.pinned;
    save();
    navStack = [];
    render('chat', { replace: true });
    return;
  }
 
  /* 달력 전월/후월 */
  el = e.target.closest('[data-cal]');
  if (el) {
    var cs = calState();
    if (el.dataset.cal === 'prev') { cs.m--; if (cs.m < 1) { cs.m = 12; cs.y--; } }
    else { cs.m++; if (cs.m > 12) { cs.m = 1; cs.y++; } }
    featSave(); render(state.current, { replace: true }); return;
  }
 
  /* 출석체크: 1일 1회 · 씨앗 +1 · 도장 · 팝업 */
  if (e.target.closest('#btn-attend')) {
    var key = ymd(new Date());
    if (FEAT.attendance[key]) return;
    FEAT.attendance[key] = true;
    var t = new Date(); FEAT.cal = { y: t.getFullYear(), m: t.getMonth() + 1 };
    addSeeds(1, '출석 체크');
    render('attend-done'); return;
  }
 
  /* 씨앗 구매 (app.js 가 먼저 state.seeds 를 올린 뒤 실행됨 → FEAT 기준으로 확정) */
  if (e.target.closest('#btn-buy-seed')) {
    var p = SEED_PRODUCTS[state.payIndex] || { qty: 0, label: '씨앗' };
    addSeeds(p.qty, '씨앗 충전' + p.label);
    render('my-charge', { replace: true }); return;
  }
 
  /* 온보딩 6: 햄찌 카드 선택 시 이름과 함께 저장 */
  if (e.target.closest('[data-onbchar]')) { captureForm(); return; }
 
  /* 회원정보 저장 */
  if (e.target.closest('#btn-edit-save')) {
    FEAT.form = Object.assign({}, state.form); featSave();
    render('my', { replace: true }); return;
  }
 
  /* "처음부터": 기능 상태도 초기화 */
  if (e.target.closest('#btn-reset')) {
    try { localStorage.removeItem(FEAT_KEY); } catch (e2) {}
  }
});
document.getElementById('btn-reset').addEventListener('click', function () {
  try { localStorage.removeItem(FEAT_KEY); } catch (e) {}
  location.reload();
});
 
/* ---------- 사이드바 목록 재구성: 온보딩을 맨 앞으로 + 새 화면 반영 ---------- */
(function reorderIndex() {
  var onb = SCREEN_INDEX.filter(function (s) { return s.id.indexOf('onb') === 0; });
  var rest = SCREEN_INDEX.filter(function (s) { return s.id.indexOf('onb') !== 0; });
  SCREEN_INDEX.length = 0;
  onb.concat(rest).forEach(function (s) { SCREEN_INDEX.push(s); });
})();
(function rebuildIndex() {
  var nav = document.getElementById('screen-index');
  nav.innerHTML = '';
  SCREEN_INDEX.forEach(function (s) {
    var b = document.createElement('button');
    b.dataset.go = s.id;
    b.innerHTML = '<span class="cat">' + s.cat + '</span><span class="sep">:</span>' + s.label;
    b.addEventListener('click', function () { jump(s.id); });
    nav.appendChild(b);
  });
})();
if (TEST_RESET) {
  start();
  var first = SCREEN_INDEX.filter(function (s) { return s.id.indexOf('onb') === 0; })[0];
  syncProfile();
  jump(first ? first.id : 'home');
} else {
  syncProfile();
  render(state.current || 'home', { replace: true });
}
