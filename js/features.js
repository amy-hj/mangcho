/* ============================================================
   Hamnal — 기능 패치 (features.js)   ※ 맨 마지막에 로드
   J님 파일(screens.js / data.js / app.js / style.css)은 수정하지 않습니다.
   같은 이름의 함수를 여기서 다시 정의해 동작을 바꿉니다.

   ▶ 덮어쓰는 함수: calendarMarkup, attendBackdrop, scAttendDone, scFortune,
                    bubble, chatListMarkup, scMy, scMyHistory, refreshSeeds
   ▶ 감싸는 함수:   render (앞뒤 훅), save (기능 상태 동시 저장)
   ▶ 추가 화면:     saju.js 참고 (사주팔자 / 자미두수)

   기능 상태(FEAT)는 별도 키 'hamnal_feat_v1' 에 저장됩니다.
   ============================================================ */

/* ---------- 기능 상태 ---------- */
var FEAT_KEY = 'hamnal_feat_v1';
var FEAT = (function () {
  var d = null;
  try { d = JSON.parse(localStorage.getItem(FEAT_KEY) || 'null'); } catch (e) {}
  return d || {
    seeds: 0,              /* 해바라기씨: 0부터 시작 */
    seedHistory: [],       /* { label, at, delta } — 최신순 */
    attendance: {},        /* { 'YYYY-MM-DD': true } */
    letterRead: {},        /* { 'YYYY-MM': true } */
    form: null,            /* 회원정보 (PROFILE_FORM 형태) */
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
function syncProfile() {
  if (typeof state === 'undefined') return;
  if (FEAT.form) state.form = Object.assign({}, state.form, FEAT.form);
  var f = state.form || PROFILE_FORM;
  ME.name  = f.name || ME.name;
  ME.sex   = /여/.test(f.gender || '') ? '♀' : (/남/.test(f.gender || '') ? '♂' : ME.sex);
  ME.birth = f.year + '.' + String(f.month).padStart(2, '0') + '.' + String(f.day).padStart(2, '0') +
             (f.unknownTime ? ' (시간 모름)' : ' ' + String(f.hour).padStart(2, '0') + ':' + String(f.minute).padStart(2, '0')) +
             (f.region ? ' ' + f.region : '');
}

/* ---------- render 훅 ---------- */
var _renderOrig = render;
render = function (id, opts) {
  syncSeeds();
  syncProfile();
  if (id === 'attend-done') { ATTEND_DONE.desc = ['오늘 씨앗 1개를 받았어요!', '자정이 지나면 안 쓴 씨앗은 사라져요']; }
  _renderOrig(id, opts);
  setupSuggestSwipe();
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

/* ============================================================
   1-3 · 오늘의 운세 (생년월일시 → 일간 × 오늘 일진, 결정론)
   ============================================================ */
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
            (F.ss ? '<p class="f-tag">오늘의 일진 ' + esc(F.todayGz) + ' · 나에겐 <b>' + esc(F.ss) + '</b>의 날</p>' : '') +
            '<p class="f-quote">' + esc(F.quote) + '</p>' +
            '<div class="f-desc">' + F.body.map(esc).join('<br>') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="f-summary"><p class="f-summary-label">' + esc(F.summaryLabel) + '</p><div class="f-items">' + items + '</div></div>' +
      '</div>' +
    '</div>';
};

/* ============================================================
   2-1 · 코치 선택 시 말풍선 아바타/이름   2-3 · 핀 위치
   ============================================================ */
bubble = function (m) {
  var isMe = m.side === 'me';
  var box = '<div class="bubble bubble--' + (isMe ? 'me' : 'other') + '"><p class="txt">' + esc(m.text) + '</p><span class="at">' + esc(m.at) + '</span></div>';
  if (isMe) return '<div class="msg-row msg-row--me">' + box + '</div>';
  var kochi = (typeof state !== 'undefined' && state.charId === 'kochi');
  var av = kochi ? ASSET.avatar2 : ASSET.avatarChat;
  var who = kochi ? '코치' : (m.who === '햄찌' ? '멜랑' : m.who);
  return '<div class="msg-row msg-row--' + (kochi ? 'kochi' : 'melang') + '"><div class="avatar"><img src="' + av + '" alt=""></div>' +
    '<div class="msg-col"><span class="who">' + esc(who) + '</span>' + box + '</div></div>';
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

/* ============================================================
   3-1 · 마이 (회원정보 반영 + 명반 진입)   3-2 · 씨앗 내역
   ============================================================ */
var _scMyOrig = scMy;
scMy = function (state) {
  var html = _scMyOrig(state);
  /* 프로필 카드 아래에 "내 명반" 카드 삽입 */
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

/* SCREENS 맵은 함수 참조를 고정으로 들고 있으므로 덮어쓴 화면 함수를 재등록 */
SCREENS['fortune']     = scFortune;
SCREENS['attend-done'] = scAttendDone;
SCREENS['my']          = scMy;
SCREENS['my-history']  = scMyHistory;

/* ============================================================
   이벤트 (app.js 리스너 뒤에 실행됨)
   ============================================================ */
document.getElementById('viewport').addEventListener('click', function (e) {
  var el;

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

/* ---------- 사이드바 목록 재구성 (새 화면 반영) & 최초 렌더 ---------- */
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
syncProfile();
render(state.current || 'home', { replace: true });
