/* ============================================================
   Hamnal 주화면 프로토타입 — 라우터 + 인터랙션
   ============================================================ */

var viewport = document.getElementById('viewport');
var indexNav = document.getElementById('screen-index');
var label    = document.getElementById('screen-label');

var state, navStack;

function initialState() {
  return {
    rooms:     ROOMS.map(function (r) { return Object.assign({}, r); }),
    roomName:  ROOMS[0].name,
    msgs:      CHAT_ONGOING.slice(),
    startMsgs: CHAT_START.slice(),
    draft:        '',
    showSuggests: true,

    /* 마이페이지 */
    seeds:           ME.seeds,
    form:            Object.assign({}, PROFILE_FORM),
    withdrawChecked: false
  };
}

/* 첫 메시지에서 대화방 제목을 뽑습니다 (프로토타입: 규칙 기반) */
function summarize(text) {
  var flat = String(text).replace(/\s+/g, '');
  for (var i = 0; i < SUMMARY_RULES.length; i++) {
    for (var j = 0; j < SUMMARY_RULES[i].kw.length; j++) {
      if (flat.indexOf(SUMMARY_RULES[i].kw[j]) !== -1) return SUMMARY_RULES[i].title;
    }
  }
  var t = String(text).replace(/\s+/g, ' ').trim();
  return t.length > 18 ? t.slice(0, 18) + '…' : t;
}

function now() {
  var d = new Date();
  var h = d.getHours();
  var ampm = h < 12 ? '오전' : '오후';
  var hh = h % 12 || 12;
  return ampm + ' ' + hh + ':' + String(d.getMinutes()).padStart(2, '0');
}

/* ---------- 렌더 ---------- */
function render(id, opts) {
  opts = opts || {};
  if (!SCREENS[id]) return;

  if (!opts.replace && state.current && state.current !== id) navStack.push(state.current);
  state.current = id;

  viewport.innerHTML = SCREENS[id](state);

  var meta = SCREEN_INDEX.filter(function (s) { return s.id === id; })[0];
  label.textContent = meta ? meta.cat + ' : ' + meta.label : id;

  Array.prototype.forEach.call(indexNav.children, function (b) {
    b.classList.toggle('on', b.dataset.go === id);
  });

  var list = viewport.querySelector('.msg-list');
  if (list) list.scrollTop = list.scrollHeight;

  var input = viewport.querySelector('#rename-input');
  if (input) { input.focus(); input.select(); }
}

function go(id) { render(id); }

function back() {
  var prev = navStack.pop();
  render(prev || 'home', { replace: true });
}

/* ---------- 메시지 ---------- */
function pushMessage(text, bucket) {
  if (!text || !text.trim()) return;
  var arr = state[bucket];
  arr.push({ side: 'me', text: text.trim(), at: now() });
  state.showSuggests = false;   /* 첫 발화가 나가면 추천 문구는 사라짐 (탭이든 직접 입력이든) */

  /* 대화가 시작되면 "새대화" → 대화 내용 요약으로 제목 교체 */
  if (!state.roomName || state.roomName === '새대화') {
    state.roomName = summarize(text);
    if (!state.rooms.some(function (r) { return r.name === state.roomName; })) {
      state.rooms.unshift({
        id: 'new-' + state.rooms.length, name: state.roomName,
        at: now(), avatar: ASSET.avatar1, pinned: false
      });
    }
  }

  state.draft = '';
  render(state.current, { replace: true });

  setTimeout(function () {
    arr.push({
      side: 'other',
      who: '햄찌',
      text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
      at: now()
    });
    if (state.current === 'chat-start' || state.current === 'chat') {
      render(state.current, { replace: true });
    }
  }, 600);
}

function activeBucket() {
  return state.current === 'chat-start' ? 'startMsgs' : 'msgs';
}

/* ---------- 이벤트 ---------- */
viewport.addEventListener('click', function (e) {
  var el;

  el = e.target.closest('[data-go]');
  if (el) { go(el.dataset.go); return; }

  el = e.target.closest('[data-pick]');
  if (el) {
    state.startMsgs = CHAT_START.slice();
    state.roomName = '새대화';
    state.showSuggests = true;
    state.draft = '';
    go('chat-start');
    return;
  }

  el = e.target.closest('[data-room]');
  if (el) {
    var room = state.rooms.filter(function (r) { return r.id === el.dataset.room; })[0];
    if (room) { state.roomName = room.name; state.msgs = CHAT_ONGOING.slice(); }
    state.draft = '';
    go('chat');
    return;
  }

  el = e.target.closest('[data-say]');
  if (el) {
    var say = el.dataset.say;
    state.showSuggests = false;            /* 하나라도 누르면 추천 문구는 사라짐 */

    if (say === JUMP_TO_ONGOING) {         /* 이 문구는 주화면 5 상태로 이어짐 */
      state.roomName = ONGOING_ROOM_NAME;
      state.msgs     = CHAT_ONGOING.slice();
      state.draft    = ONGOING_DRAFT;
      go('chat');
      return;
    }
    pushMessage(say, activeBucket());
    return;
  }

  if (e.target.closest('#btn-send')) {
    var input = viewport.querySelector('#msg-input');
    if (input) { pushMessage(input.value, activeBucket()); input.value = ''; }
    return;
  }

  el = e.target.closest('[data-gender]');
  if (el) { state.form.gender = el.dataset.gender; render(state.current, { replace: true }); return; }

  if (e.target.closest('#btn-edit-save')) {   /* 06-4 수정하기 */
    navStack = [];
    render('my', { replace: true });
    return;
  }

  if (e.target.closest('#btn-rename')) {
    var ri = viewport.querySelector('#rename-input');
    var v = ri ? ri.value.trim() : '';
    if (v) {
      state.rooms.forEach(function (r) { if (r.name === state.roomName) r.name = v; });
      state.roomName = v;
    }
    navStack = [];
    render('chat', { replace: true });
    return;
  }

  if (e.target.closest('#btn-delete')) {
    state.rooms = state.rooms.filter(function (r) { return r.name !== state.roomName; });
    navStack = [];
    render(state.rooms.length ? 'chat-list' : 'chat-empty', { replace: true });
    return;
  }
});

viewport.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter') return;

  if (e.target.id === 'msg-input') {
    pushMessage(e.target.value, activeBucket());
    e.target.value = '';
  }
  if (e.target.id === 'rename-input') {
    var btn = viewport.querySelector('#btn-rename');
    if (btn) btn.click();
  }
});

viewport.addEventListener('change', function (e) {
  if (e.target.id === 'chk-withdraw') {
    state.withdrawChecked = e.target.checked;
    render(state.current, { replace: true });
  }
  if (e.target.id === 'chk-unknown-time') {
    state.form.unknownTime = e.target.checked;
    render(state.current, { replace: true });
  }
});

viewport.addEventListener('input', function (e) {
  if (e.target.id === 'rename-input') {
    var c = viewport.querySelector('#rename-count');
    if (c) c.textContent = e.target.value.length + '/50';
    return;
  }

  /* 입력창에 내용이 있으면 전송 버튼 활성화 (재렌더 없이 제자리 갱신) */
  if (e.target.id === 'msg-input') {
    state.draft = e.target.value;
    var btn = viewport.querySelector('#btn-send');
    if (!btn) return;
    var on = !!e.target.value.trim();
    btn.classList.toggle('is-on', on);
    btn.disabled = !on;
    var img = btn.querySelector('img');
    if (img) img.src = on ? ASSET.sendActive : ASSET.send;
  }
});

/* ---------- 좌측 인덱스 ----------
   인덱스로 점프할 때는 그 화면의 Figma 초기 상태로 되돌립니다. */
function jump(id) {
  if (id === 'chat-start') {
    state.startMsgs = CHAT_START.slice();
    state.roomName = '새대화';
    state.showSuggests = true;
    state.draft = '';
  }
  if (id === 'chat' || id === 'chat-menu' || id === 'chat-rename' || id === 'chat-delete') {
    state.msgs = CHAT_ONGOING.slice();
    state.roomName = ONGOING_ROOM_NAME;
    state.draft = (id === 'chat') ? ONGOING_DRAFT : '';
  }
  if (id.indexOf('my') === 0) {
    state.form = Object.assign({}, PROFILE_FORM);
    state.withdrawChecked = (id === 'my-withdraw') ? false : state.withdrawChecked;
  }
  navStack = [];
  render(id, { replace: true });
}

SCREEN_INDEX.forEach(function (s) {
  var b = document.createElement('button');
  b.dataset.go = s.id;
  b.innerHTML = '<span class="cat">' + s.cat + '</span><span class="sep">:</span>' + s.label;
  b.addEventListener('click', function () { jump(s.id); });
  indexNav.appendChild(b);
});

document.getElementById('btn-back').addEventListener('click', back);
document.getElementById('btn-reset').addEventListener('click', function () { start(); });

/* ---------- 창 크기에 맞춰 폰 프레임 축소 ---------- */
function fitPhone() {
  var sidebar = document.querySelector('.sidebar');
  var sw = (sidebar && getComputedStyle(sidebar).display !== 'none') ? sidebar.offsetWidth : 0;
  var caption = document.querySelector('.stage-caption');
  var capH = caption ? caption.offsetHeight : 28;

  var availH = window.innerHeight - capH - 56;   /* 캡션 + 위아래 여백 */
  var availW = window.innerWidth - sw - 56;

  var s = Math.min(1, availH / 812, availW / 375);
  document.documentElement.style.setProperty('--pscale', Math.max(0.35, s).toFixed(4));
}

window.addEventListener('resize', fitPhone);
fitPhone();

/* ---------- 시작 ---------- */
function start() {
  state = initialState();
  state.current = null;
  navStack = [];
  render('home', { replace: true });
}

start();
