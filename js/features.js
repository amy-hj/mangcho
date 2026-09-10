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

/* [수정2] 연애 응답 */
(function () {
  for (var i = 0; i < RULES.length; i++) if (RULES[i].topic === '연애') {
    RULES[i].melang = ['오! 연애 고민이구나! 어떤 상황인지 천천히 말해줘.', '듣고 나서 네 마음이 어떤지도 궁금해.'];
    RULES[i].kochi  = ['연애, 제일 신경 쓰이는 분야지. 말해봐.', '상황부터 정리해줘. 언제부터 그랬어?'];
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
    onbTopics: [],         /* 온보딩 8에서 고른 대화 주제 */
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
var FORM_SCREENS = { 'onb-profile': 1, 'my-edit': 1, 'onb-pick': 1, 'onb-topic': 1 };
function captureForm() {
  if (typeof state === 'undefined') return;
  if (state.current === 'onb-profile' || state.current === 'my-edit') { FEAT.form = Object.assign({}, state.form); }
  if (state.current === 'onb-pick') {
    var n = document.querySelector('#viewport #onb-name'); if (n) state.onbName = n.value;
    FEAT.hamName = state.onbName || '';
    FEAT.onbCharId = state.charId || 'melang';   /* [수정4] 온보딩에서 고른 햄찌 기록 */
  }
  if (state.current === 'onb-topic') { FEAT.onbTopics = (state.onbTopics || []).slice(); }
  featSave();
}
var _renderOrig = render;
render = function (id, opts) {
  if (state && state.current && FORM_SCREENS[state.current] && state.current !== id) captureForm(); /* 폼 화면을 떠날 때 저장 */
  syncSeeds();
  syncProfile();
  if (id === 'attend-done') { ATTEND_DONE.desc = ['오늘 씨앗 1개를 받았어요!', '자정이 지나면 안 쓴 씨앗은 사라져요']; }
  _bubblePrev = '';
  if (id === 'chat-new') restoreSuggests();
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
 
/* ============================================================
   1-3 · 오늘의 운세 (생년월일시 → 일간 × 오늘 일진, 결정론)
   ============================================================ */
/* ⚠ [수정6] 운세 모달에 "오늘의 일진 ○○ · 나에겐 ○○의 날" 같은 일진/십성 표기 줄을 절대 넣지 않는다 (사용자 확정 지시) */
scFortune = function () {
  var f = sajuForm(), F;
  try {
    F = SAJU.fortune(f, new Date());
    if (window.console) console.log('[운세] 개인화 작동 — 생년월일 ' + f.year + '.' + f.month + '.' + f.day + ' 기준, ' + F.score);
  } catch (e) {
    F = FORTUNE;
    if (window.console) console.error('[운세] 계산 실패 → 기본 문구(80점)로 대체. 원인:', e);
  }
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
 
/* ============================================================
   2-1 · 코치 선택 시 말풍선 아바타/이름   2-3 · 핀 위치
   ============================================================ */
/* [수정4] 대화방마다 그 방을 시작할 때 고른 햄찌의 사진·이름으로 표시 */
function roomCharId() {
  if (typeof state === 'undefined') return 'melang';
  if (state.current === 'chat-start' || state.current === 'chat-new') return state.charId || 'melang';
  return state.chatCharId || state.charId || 'melang';
}
var _bubblePrev = '';
bubble = function (m) {
  var isMe = m.side === 'me';
  var grouped = (m.side === _bubblePrev);   /* 같은 화자가 연달아 말하면 묶음: 아바타·이름 생략 */
  _bubblePrev = m.side;
  var box = '<div class="bubble bubble--' + (isMe ? 'me' : 'other') + '"><p class="txt">' + esc(m.text) + '</p><span class="at">' + esc(m.at) + '</span></div>';
  if (isMe) return '<div class="msg-row msg-row--me">' + box + '</div>';
  var cid = roomCharId();
  var kochi = cid === 'kochi';
  var av = kochi ? ASSET.avatar2 : ASSET.avatarChat;
  /* 이름: 이 방의 햄찌가 온보딩에서 이름 지어준 그 애면 지어준 이름, 아니면 기본 이름 */
  var who = (cid === FEAT.onbCharId && FEAT.hamName) ? FEAT.hamName : (kochi ? '코치' : '멜랑');
  if (grouped) {
    return '<div class="msg-row msg-row--' + (kochi ? 'kochi' : 'melang') + ' msg-row--cont">' +
      '<div class="avatar avatar--ghost"></div>' +
      '<div class="msg-col">' + box + '</div></div>';
  }
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
 
/* ============================================================
   온보딩에서 고른 햄찌 → 홈 캐릭터 이미지 + 이름
   ============================================================ */
/* ============================================================
   홈 말풍선: 온보딩에서 고른 대화 주제의 예시 질문 (햄찌 클릭마다 랜덤)
   문구 수정: 아래 TOPIC_QUESTIONS 의 한글만 고치면 됩니다.
   ============================================================ */
var TOPIC_QUESTIONS = {
  '인간관계': [
    '요즘 제일 자주 보는 사람은 누구야?',
    '오늘은 누구 때문에 기 빨렸어?',
    '고맙다고 말 못 한 사람 있지 않아?',
    '손절할까 말까 고민되는 사람 있어?'
  ],
  '일·직장': [
    '오늘 회사에서 제일 힘 빠진 순간은 언제였어?',
    '지금 하는 일, 3년 뒤에도 하고 있을 것 같아?',
    '월요일 아침의 너에게 한마디 한다면?',
    '요즘 일하면서 제일 뿌듯했던 건 뭐야?'
  ],
  '가족': [
    '요즘 가족한테 연락 자주 해?',
    '가족 중에 제일 대화하기 어려운 사람 있어?',
    '부모님이랑 최근에 웃었던 기억 있어?',
    '집에 가면 마음이 편해, 무거워?'
  ],
  '재테크': [
    '요즘 돈 모으는 목표 있어? 얼마나 모였어?',
    '이번 달에 제일 아까웠던 지출은 뭐야?',
    '월급 들어오면 제일 먼저 뭐부터 해?',
    '투자하면서 밤에 잠 못 잔 적 있어?'
  ],
  '연애·결혼': [
    '요즘 마음 가는 사람 있어? (귀 쫑긋)',
    '연애에서 제일 포기 못 하는 조건 하나만!',
    '요즘 애인이랑 어때? 얘기해줘.',
    '결혼은 하고 싶은 편이야, 아니야?'
  ],
  '건강': [
    '어젯밤 몇 시에 잤어? 솔직하게!',
    '요즘 몸에서 제일 신경 쓰이는 데 있어?',
    '오늘 물 몇 잔 마셨어?',
    '너는 무슨 운동을 해? 나는 쳇바퀴 타기!'
  ],
  '불안·스트레스': [
    '요즘 제일 걱정되는 거 하나만 말해줄래?',
    '스트레스 받으면 제일 먼저 뭐 해?',
    '오늘 마음은 10점 만점 에 몇 점이야?',
    '요즘 생각이 많아서 잠 못 든 날이 있었어?'
  ],
  '다른 문제': [
    '요즘 머릿속을 제일 많이 차지하는 게 뭐야?',
    '누구한테도 말 안 한 얘기가 있다면 나한테 슬쩍 털어놔도 돼.',
    '오늘 하루를 한 단어로 하면 뭘 거 같아?',
    '지금 제일 하고 싶은 게 뭐야?',
    '언제든지 볼주머니를 열어둘게.'
  ]
};
var GENERIC_QUESTIONS = [
  '오늘 밤엔 무슨 얘기 해줄래? 츄',
  '네 얘기 들으려고 볼주머니 비워놨어!',
  '오늘 하루 어땠어? 좋은 거든 별로든 다 괜찮아.'
];
var _lastQ = '';
function hamQuestion() {
  var topics = (typeof FEAT !== 'undefined' && FEAT.onbTopics && FEAT.onbTopics.length) ? FEAT.onbTopics
             : ((typeof state !== 'undefined' && state.onbTopics && state.onbTopics.length) ? state.onbTopics : []);
  var pool = [];
  topics.forEach(function (t) { if (TOPIC_QUESTIONS[t]) pool = pool.concat(TOPIC_QUESTIONS[t]); });
  if (!pool.length) pool = GENERIC_QUESTIONS;
  if (pool.length > 1) pool = pool.filter(function (q) { return q !== _lastQ; });
  var q = pool[Math.floor(Math.random() * pool.length)];
  _lastQ = q;
  return q;
}

/* ============================================================
   [말풍선→대화] 햄찌의 자기 대답 (질문 문장과 정확히 일치해야 매칭됩니다)
   질문 문구를 나중에 수정하면 여기 키도 같은 문장으로 바꿔주세요.
   ============================================================ */
var HAM_ANSWERS = {
  /* 인간관계 */
  '요즘 제일 자주 보는 사람은 누구야?': { melang: '나는 코치랑 자주 놀아 ㅎㅎ 같이 쳇바퀴도 타고 잠도 자.', kochi: '나는 멜랑! 어제는 쳇바퀴 빨리타기 대결을 했어!' },
  '오늘은 누구 때문에 기 빨렸어?': { melang: '나는 쳇바퀴 순서 때문에 코치랑 투닥거렸어 ㅎㅎ 너는?', kochi: '멜랑. 내 해바라기씨를 또 숨겨놨거든.' },
  '고맙다고 말 못 한 사람 있지 않아?': { melang: '나는 코치! 내가 아플 때 해바라기씨를 나눠줬는데 말 못 했어… 너는 누가 떠올라?', kochi: '있어. 멜랑. 근데 안 할 거야. 너는?' },
  '손절할까 말까 고민되는 사람 있어?': { melang: '음… 나는 다행히 없어! 너는 누가 자꾸 마음에 걸려?', kochi: '나는 정리가 빠른 편이야. 너는 왜 망설여져?' },
  /* 일·직장 */
  '오늘 회사에서 제일 힘 빠진 순간은 언제였어?': { melang: '나는 오늘 톱밥 정리하다가 기 빠졌어 ㅎㅎ 너는 언제였어?', kochi: '나는 쳇바퀴 점검. 반복 작업은 원래 힘 빠져. 너는?' },
  '지금 하는 일, 3년 뒤에도 하고 있을 것 같아?': { melang: '나는 3년 뒤에도 네 얘기 듣고 있을 거야 츄! 너는 어때?', kochi: '나는 계속해. 적성이거든. 너는 어떤데?' },
  '월요일 아침의 너에게 한마디 한다면?': { melang: '나라면 "이불 밖도 생각보다 따뜻해!" ㅎㅎ 너는 뭐라고 할래?', kochi: '"일단 씻어." 나는 이 한마디면 돼. 너는?' },
  '요즘 일하면서 제일 뿌듯했던 건 뭐야?': { melang: '나는 볼주머니 정리 다 했을 때! 너는 뭐가 제일 뿌듯했어?', kochi: '나는 밀린 기록 다 정리했을 때. 너는?' },
  /* 가족 */
  '요즘 가족한테 연락 자주 해?': { melang: '나는 밤마다 코치랑 안부 나눠 ㅎㅎ 너는 자주 하는 편이야?', kochi: '나는 필요할 때만. 너는 어때?' },
  '가족 중에 제일 대화하기 어려운 사람 있어?': { melang: '음… 나는 코치가 가끔 무뚝뚝해서 어려워 ㅎㅎ 너는 누구야?', kochi: '나는 말 많은 멜랑… 농담이야. 너는 누가 어려워?' },
  '부모님이랑 최근에 웃었던 기억 있어?': { melang: '나는 다 같이 해바라기씨 나눠 먹을 때 제일 웃어! 너는 언제였어?', kochi: '기억이 안 나면 그것도 답이야. 최근엔 언제였어?' },
  '집에 가면 마음이 편해, 무거워?': { melang: '나는 톱밥 이불에 눕는 순간 스르르 풀려 츄. 너는 어때?', kochi: '집은 내 공간이니까 당연히 편해. 너는 어느 쪽이야?' },
  /* 재테크 */
  '요즘 돈 모으는 목표 있어? 얼마나 모였어?': { melang: '나는 해바라기씨 100개 모으기! 절반 왔어 ㅎㅎ 너는?', kochi: '나는 씨앗 100개. 매일 정량 저축 중. 너는?' },
  '이번 달에 제일 아까웠던 지출은 뭐야?': { melang: '나는 안 먹는 간식 산 거… 츄… 너는 뭐가 아까웠어?', kochi: '나는 충동으로 산 쳇바퀴 부품. 너는?' },
  '월급 들어오면 제일 먼저 뭐부터 해?': { melang: '나는 해바라기씨부터 사먹어! 너는 뭐부터 해?', kochi: '저축 먼저, 소비는 나중. 너는 순서가 어떻게 돼?' },
  '투자하면서 밤에 잠 못 잔 적 있어?': { melang: '나는 씨앗 시세만 봐도 두근거리더라 ㅎㅎ 너는 그런 적 있어?', kochi: '잠을 설치면 비중이 큰 거야. 너는 어땠는데?' },
  /* 연애·결혼 */
  '요즘 마음 가는 사람 있어? (귀 쫑긋)': { melang: '나부터? 그건 비밀이야 츄!! 너는 있어?', kochi: '나는 없어. 네 얘기가 궁금한데.' },
  '연애에서 제일 포기 못 하는 조건 하나만!': { melang: '나는 같이 있을 때 편한 거! 너는 뭐야?', kochi: '나는 대화가 통하는 거. 너는?' },
  '요즘 그 사람이랑 어때? 얘기해줘.': { melang: '두근두근… 천천히 다 말해줘 ㅎㅎ 듣고 있을게.', kochi: '변화가 있었어? 사실부터 말해줘.' },
  '결혼은 하고 싶은 편이야, 아니야?': { melang: '나는 톱밥 집에서 다 같이 사는 게 꿈이야 ㅎㅎ 너는 어때?', kochi: '나는 아직 모르겠어. 너는 하고 싶은 쪽이야?' },
  /* 건강 */
  '어젯밤 몇 시에 잤어? 솔직하게!': { melang: '나는 쳇바퀴 타다가 늦게 잤어… 츄… 너는 몇 시야?', kochi: '나는 11시. 정시 취침이 원칙. 너는?' },
  '요즘 몸에서 제일 신경 쓰이는 데 있어?': { melang: '나는 요즘 볼주머니가 좀 무거워 ㅎㅎ 너는 어디가 신경 쓰여?', kochi: '나는 앞니 관리 중. 너는 어디야?' },
  '오늘 물 몇 잔 마셨어?': { melang: '나는 물병 반 통 마셨어! 너는 몇 잔?', kochi: '나는 정량 채웠어. 너는?' },
  '너는 무슨 운동을 해? 나는 쳇바퀴 타기!': { melang: '매일 밤 쳇바퀴 10바퀴가 목표야 ㅎㅎ 너는 뭐 해?', kochi: '쳇바퀴 인터벌. 짧고 굵게. 너는 뭐 해?' },
  /* 불안·스트레스 */
  '요즘 제일 걱정되는 거 하나만 말해줄래?': { melang: '나도 겨울 씨앗 걱정을 해… 네 얘기 먼저 들려줘.', kochi: '걱정은 적어보면 반으로 줄어. 뭐가 제일 커?' },
  '스트레스 받으면 제일 먼저 뭐 해?': { melang: '나는 톱밥 파고들어 뒹굴어 ㅎㅎ 너는 뭐부터 해?', kochi: '나는 쳇바퀴. 몸을 쓰면 정리돼. 너는?' },
  '오늘 마음은 10점 만점 에 몇 점이야?': { melang: '나는 오늘 8점! 네 점수도 궁금해 츄.', kochi: '나는 7점. 기준은 수면. 너는 몇 점이야?' },
  '요즘 생각이 많아서 잠 못 든 날이 있었어?': { melang: '나도 그런 밤엔 별 세다가 잠들어… 너는 요즘 어때?', kochi: '있었다면 원인이 있을 거야. 뭐 때문이야?' },
  /* 다른 문제 */
  '요즘 머릿속을 제일 많이 차지하는 게 뭐야?': { melang: '나는 겨울 간식 창고 생각뿐이야 ㅎㅎ 너는 뭐야?', kochi: '나는 이번 달 기록 정리. 너는?' },
  '누구한테도 말 안 한 얘기가 있다면 나한테 슬쩍 털어놔도 돼.': { melang: '여긴 우리 둘뿐이야. 볼주머니엔 자물쇠도 있어 츄.', kochi: '들은 건 어디 안 가. 편하게 꺼내.' },
  '오늘 하루를 한 단어로 하면 뭘 거 같아?': { melang: '나는 오늘 "몽글몽글"! 너는 한 단어로 뭐야?', kochi: '나는 "루틴". 너는?' },
  '지금 제일 하고 싶은 게 뭐야?': { melang: '나는 너랑 수다 떨기! 지금 하고 있네 ㅎㅎ 너는?', kochi: '나는 낮잠. 너는 뭐가 제일 하고 싶어?' },
  '언제든지 볼주머니를 열어둘게.': { melang: '언제든 와서 아무 얘기나 꺼내도 돼 츄.', kochi: '준비돼 있어. 시작해.' },
  /* 기본 인사 */
  '오늘 밤엔 무슨 얘기 해줄래? 츄': { melang: '나는 네 얘기면 뭐든 좋아 ㅎㅎ', kochi: '주제는 네가 정해. 듣는 건 내 몫이야.' },
  '네 얘기 들으려고 볼주머니 비워놨어!': { melang: '자리 넉넉하니까 천천히 채워줘 츄.', kochi: '용량은 충분해. 시작해.' },
  '오늘 하루 어땠어? 좋은 거든 별로든 다 괜찮아.': { melang: '나는 오늘 낮잠 세 번 잤어 ㅎㅎ 너는 어땠어?', kochi: '나는 평범했어. 너는?' }
};
var HAM_ANSWER_DEFAULT = { melang: '나부터 말하자면… 음, 네 얘기가 더 궁금해 ㅎㅎ 먼저 들려줘!', kochi: '내 얘긴 짧아. 네 차례야.' };

/* 말풍선의 질문으로 새 대화 시작: 햄찌가 질문 + 자기 얘기를 먼저 하고 답을 기다림 */
/* ============================================================
   [말풍선→대화] 주제별 퀵 리플라이 (2줄 × 3개) — 문구 수정 시 쉼표 규칙 주의
   ============================================================ */
var ORIG_SUGGESTS = SUGGESTS.map(function (line) { return line.slice(); });
var TOPIC_SUGGESTS = {
  '인간관계': [['친구랑 싸웠어', '회사 사람이 불편해', '요즘 좀 외로워'], ['고마운 사람이 있어', '손절을 고민 중이야', '새 친구를 사귀고 싶어']],
  '일·직장': [['오늘 회사에서 힘들었어', '이직을 고민 중이야', '일이 손에 안 잡혀'], ['상사 때문에 스트레스야', '뿌듯한 일이 있었어', '번아웃이 온 것 같아']],
  '가족': [['부모님이랑 다퉜어', '가족한테 서운했어', '집이 좀 불편해'], ['가족이 걱정돼', '효도하고 싶은데 어색해', '명절이 부담스러워']],
  '재테크': [['돈이 잘 안 모여', '충동구매를 했어', '투자로 마음이 불안해'], ['저축 목표를 세우고 싶어', '월급이 스쳐 지나가', '재테크 어떻게 시작해?']],
  '연애·결혼': [['짝사랑 중이야', '연인이랑 다퉜어', '권태기인 것 같아'], ['이별한 지 얼마 안 됐어', '결혼 얘기가 나왔어', '소개팅이 부담돼']],
  '건강': [['요즘 잠을 잘 못 자', '운동을 시작하고 싶어', '몸이 계속 피곤해'], ['식습관이 엉망이야', '병원 가기가 무서워', '체력이 떨어졌어']],
  '불안·스트레스': [['이유 없이 불안해', '생각이 너무 많아', '발표가 걱정돼'], ['잠들기 전이 제일 힘들어', '숨 좀 돌리고 싶어', '마음이 복잡해']],
  '다른 문제': [['그냥 수다 떨고 싶어', '고민이 정리가 안 돼', '비밀 얘기가 있어'], ['오늘 하루가 길었어', '칭찬받고 싶어', '아무 말이나 할래']]
};
function topicOf(q) { for (var t in TOPIC_QUESTIONS) { if (TOPIC_QUESTIONS[t].indexOf(q) !== -1) return t; } return ''; }
function setSuggests(lines) { SUGGESTS.length = 0; lines.forEach(function (l) { SUGGESTS.push(l.slice()); }); }
function restoreSuggests() { setSuggests(ORIG_SUGGESTS); }

function startTopicChat(q) {
  var cid = (typeof FEAT !== 'undefined' && FEAT.onbCharId) ? FEAT.onbCharId : (state.charId || 'melang');
  state.charId = cid;
  var ans = HAM_ANSWERS[q];
  var mine = ans ? ans[cid === 'kochi' ? 'kochi' : 'melang'] : HAM_ANSWER_DEFAULT[cid === 'kochi' ? 'kochi' : 'melang'];
  var who = (cid === FEAT.onbCharId && FEAT.hamName) ? FEAT.hamName : (cid === 'kochi' ? '코치' : '멜랑');
  state.startMsgs = [
    { side: 'other', who: who, text: q, at: now() },
    { side: 'other', who: who, text: mine, at: now() }
  ];
  state.roomName = '새대화';
  state.currentRoomId = null;
  var tp = topicOf(q);
  if (tp && TOPIC_SUGGESTS[tp]) { setSuggests(TOPIC_SUGGESTS[tp]); } else { restoreSuggests(); }
  state.showSuggests = true;
  state.draft = '';
  go('chat-start');
}

function hamInfo() {
  /* 홈·마이 표시는 항상 "온보딩에서 고른 햄찌" 기준 (대화방 선택과 무관) */
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
  HOME.speech = hamQuestion();   /* 말풍선 = 선택 주제 기반 질문 */
  var html = _homeBodyOrig();
  html = html.replace('<img class="home-char" src="' + ASSET.charHome + '"', '<img class="home-char' + (h.kochi ? ' home-char--kochi' : '') + '" src="' + h.homeImg + '"');
  /* 말풍선: 고정 이미지 제거 → 텍스트 길이에 맞춰 늘어나는 CSS 말풍선 */
  html = html.replace('<div class="home-speech">', '<div class="home-speech home-speech--fit">');
  html = html.replace('<img src="' + ASSET.speech + '" alt="">', '');
  return html;
};
 
/* ============================================================
   3-1 · 마이 (회원정보 반영 + 명반 진입)   3-2 · 씨앗 내역
   ============================================================ */
var _scMyOrig = scMy;
scMy = function (state) {
  var html = _scMyOrig(state);
  /* J님의 기존 햄찌 행(.my-row): 아바타를 고른 햄찌로 교체 (이름·설명은 syncProfile 에서 ME.pet 에 반영) */
  var h = hamInfo();
  html = html.replace('<img class="avatar34" src="' + ASSET.avatarTori + '"', '<img class="avatar34" src="' + h.avatar + '"');
  /* "내 명반" 진입 카드 */
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
 
/* ============================================================
   이벤트 (app.js 리스너 뒤에 실행됨)
   ============================================================ */
document.getElementById('viewport').addEventListener('click', function (e) {
  var el;




   
  /* 홈 말풍선 클릭: 그 질문으로 바로 대화 시작 */
  el = e.target.closest('.home-speech--fit');
  if (el) {
    var qEl = el.querySelector('p');
    if (qEl && qEl.textContent) startTopicChat(qEl.textContent);
    return;
  }

  /* 홈 햄찌 클릭: 질문 교체 + 띠용 애니메이션 */
  el = e.target.closest('.home-char');
  if (el) {
    var sp = document.querySelector('#viewport .home-speech--fit p');
    if (sp) sp.textContent = hamQuestion();
    el.classList.remove('boing');
    void el.offsetWidth;               /* 애니메이션 재시작 트릭 */
    el.classList.add('boing');
    return;
  }

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
  start();                                   /* 지워진 저장소 기준으로 상태 재생성 */
  var first = SCREEN_INDEX.filter(function (s) { return s.id.indexOf('onb') === 0; })[0];
  syncProfile();
  jump(first ? first.id : 'home');           /* 항상 온보딩 1부터 */
} else {
  syncProfile();
  render(state.current || 'home', { replace: true });
}

if (window.console) console.log('[features] v8 로드됨');
