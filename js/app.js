/* ============================================================
   Hamnal 주화면 프로토타입 — 라우터 + 인터랙션
   [PATCH] ① localStorage 저장  ② 시나리오 응답 엔진  ③ 대화방별 메시지
   - 폰 안에서 한 대화는 새로고침해도 남습니다.
   - 좌측 인덱스(사이드바)로 점프하면 Figma 초기 상태로 보여줍니다(데모용).
   - "처음부터" 버튼은 저장까지 지웁니다.
   ============================================================ */

var viewport = document.getElementById('viewport');
var indexNav = document.getElementById('screen-index');
var label    = document.getElementById('screen-label');

var state, navStack;
var STORAGE_KEY = 'hamnal_v1';

/* ---------- ① 저장 / 불러오기 ---------- */
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      rooms: state.rooms,
      msgsByRoom: state.msgsByRoom,
      charId: state.charId
    }));
  } catch (e) {}
  refreshSeeds();
}

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
  catch (e) { return null; }
}

/* 홈의 해바라기씨: 기본 1,250 + 내가 보낸 메시지 수 */
function refreshSeeds() {
  var n = 0;
  Object.keys(state.msgsByRoom || {}).forEach(function (k) {
    n += state.msgsByRoom[k].filter(function (m) { return m.side === 'me'; }).length;
  });
  HOME.seeds = (1250 + n).toLocaleString();
}

function initialState() {
  var saved = load();
  var s = {
    rooms:      saved ? saved.rooms : ROOMS.map(function (r) { return Object.assign({}, r); }),
    msgsByRoom: saved ? saved.msgsByRoom : { r1: CHAT_ONGOING.slice() },
    charId:     saved ? (saved.charId || 'melang') : 'melang',
    currentRoomId: null,
    roomName:  ROOMS[0].name,
    msgs:      CHAT_ONGOING.slice(),
    startMsgs: CHAT_START.slice(),
    draft:        '',
    showSuggests: true
  };
  return s;
}

function charName() {
  var c = CHARACTERS.filter(function (x) { return x.id === state.charId; })[0];
  return c ? c.name : '햄찌';
}
function charAvatar() {
  var c = CHARACTERS.filter(function (x) { return x.id === state.charId; })[0];
  return c ? c.avatar : ASSET.avatar1;
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

/* ---------- ② 시나리오 응답 엔진 ---------- */
var defaultIdx = 0;
function reply(text) {
  var id = state.charId || 'melang';
  for (var i = 0; i < RULES.length; i++) {
    for (var j = 0; j < RULES[i].kw.length; j++) {
      if (text.indexOf(RULES[i].kw[j]) !== -1) {
        state.lastTopic = RULES[i].topic;
        return (RULES[i][id] || RULES[i].melang).slice();
      }
    }
  }
  var pool = DEFAULT_REPLIES[id] || DEFAULT_REPLIES.melang;
  var lines = pool[defaultIdx % pool.length];
  defaultIdx++;
  return lines.slice();
}

/* 여러 줄을 순서대로, 타이핑(···) 효과와 함께 */
function speak(arr, lines, i) {
  i = i || 0;
  if (i >= lines.length) return;
  var typing = { side: 'other', who: charName(), text: '···', at: now(), typing: true };
  arr.push(typing);
  rerenderIfChat();

  var delay = 500 + Math.min(lines[i].length * 28, 1100);
  setTimeout(function () {
    var idx = arr.indexOf(typing);
    if (idx !== -1) arr.splice(idx, 1);
    arr.push({ side: 'other', who: charName(), text: lines[i], at: now() });
    save();
    rerenderIfChat();
    speak(arr, lines, i + 1);
  }, delay);
}

function rerenderIfChat() {
  if (state.current === 'chat-start' || state.current === 'chat') render(state.current, { replace: true });
}

/* ---------- ③ 메시지 (대화방별 저장) ---------- */
function pushMessage(text, bucket) {
  if (!text || !text.trim()) return;
  var arr = state[bucket];
  arr.push({ side: 'me', text: text.trim(), at: now() });
  state.showSuggests = false;

  /* 새 대화의 첫 발화 → 방 생성 + 제목 요약 + 이 배열을 방에 연결 */
  if (!state.roomName || state.roomName === '새대화') {
    state.roomName = summarize(text);
    var newId = 'new-' + Date.now();
    state.rooms.unshift({
      id: newId, name: state.roomName,
      at: now(), avatar: charAvatar(), pinned: false
    });
    state.currentRoomId = newId;
    state.msgsByRoom[newId] = arr;          /* startMsgs 배열 자체를 방에 연결 */
  } else if (state.currentRoomId) {
    state.msgsByRoom[state.currentRoomId] = arr;
    state.rooms.forEach(function (r) { if (r.id === state.currentRoomId) r.at = now(); });
  }

  state.draft = '';
  save();
  render(state.current, { replace: true });

  speak(arr, reply(text));
}

function activeBucket() {
  return state.current === 'chat-start' ? 'startMsgs' : 'msgs';
}

/* 방 열기: 저장된 메시지가 없으면 첫 인사로 시작 */
function openRoom(id) {
  var room = state.rooms.filter(function (r) { return r.id === id; })[0];
  if (!room) return;
  state.currentRoomId = id;
  state.roomName = room.name;
  if (!state.msgsByRoom[id]) {
    state.msgsByRoom[id] = [{ side: 'other', who: charName(), text: '다시 왔네! 이어서 얘기해줘 츄', at: now() }];
  }
  state.msgs = state.msgsByRoom[id];
  state.draft = '';
  go('chat');
}

/* ---------- 이벤트 ---------- */
viewport.addEventListener('click', function (e) {
  var el;

  el = e.target.closest('[data-go]');
  if (el) { go(el.dataset.go); return; }

  el = e.target.closest('[data-pick]');
  if (el) {
    state.charId = el.dataset.pick || 'melang';
    state.startMsgs = CHAT_START.map(function (m) { return Object.assign({}, m, { who: charName() }); });
    state.roomName = '새대화';
    state.currentRoomId = null;
    state.showSuggests = true;
    state.draft = '';
    save();
    go('chat-start');
    return;
  }

  el = e.target.closest('[data-room]');
  if (el) { openRoom(el.dataset.room); return; }

  el = e.target.closest('[data-say]');
  if (el) {
    var say = el.dataset.say;
    state.showSuggests = false;

    if (say === JUMP_TO_ONGOING) {         /* 데모: 이 문구는 주화면 5 상태로 이어짐 */
      state.roomName = ONGOING_ROOM_NAME;
      state.currentRoomId = 'r1';
      state.msgs = state.msgsByRoom.r1 || (state.msgsByRoom.r1 = CHAT_ONGOING.slice());
      state.draft = ONGOING_DRAFT;
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

  if (e.target.closest('#btn-rename')) {
    var ri = viewport.querySelector('#rename-input');
    var v = ri ? ri.value.trim() : '';
    if (v) {
      state.rooms.forEach(function (r) {
        if ((state.currentRoomId && r.id === state.currentRoomId) || r.name === state.roomName) r.name = v;
      });
      state.roomName = v;
      save();
    }
    navStack = [];
    render('chat', { replace: true });
    return;
  }

  if (e.target.closest('#btn-delete')) {
    var delId = state.currentRoomId;
    state.rooms = state.rooms.filter(function (r) {
      return delId ? r.id !== delId : r.name !== state.roomName;
    });
    if (delId) delete state.msgsByRoom[delId];
    state.currentRoomId = null;
    save();
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

viewport.addEventListener('input', function (e) {
  if (e.target.id === 'rename-input') {
    var c = viewport.querySelector('#rename-count');
    if (c) c.textContent = e.target.value.length + '/50';
    return;
  }

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
   인덱스로 점프할 때는 그 화면의 Figma 초기 상태로 되돌립니다(데모용, 저장엔 영향 없음). */
function jump(id) {
  if (id === 'chat-start') {
    state.startMsgs = CHAT_START.slice();
    state.roomName = '새대화';
    state.currentRoomId = null;
    state.showSuggests = true;
    state.draft = '';
  }
  if (id === 'chat' || id === 'chat-menu' || id === 'chat-rename' || id === 'chat-delete') {
    state.currentRoomId = 'r1';
    state.msgs = state.msgsByRoom.r1 || (state.msgsByRoom.r1 = CHAT_ONGOING.slice());
    state.roomName = ONGOING_ROOM_NAME;
    state.draft = (id === 'chat') ? ONGOING_DRAFT : '';
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
document.getElementById('btn-reset').addEventListener('click', function () {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  start();
});

/* ---------- 창 크기에 맞춰 폰 프레임 축소 ---------- */
function fitPhone() {
  var sidebar = document.querySelector('.sidebar');
  var sw = (sidebar && getComputedStyle(sidebar).display !== 'none') ? sidebar.offsetWidth : 0;
  var caption = document.querySelector('.stage-caption');
  var capH = caption ? caption.offsetHeight : 28;

  var availH = window.innerHeight - capH - 56;
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
  refreshSeeds();
  render('home', { replace: true });
}

start();
