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
  var myOn   = active === 'my';
  var ltOn   = active === 'letter';

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
      '<button class="tab" data-go="letter-ready"><div class="ico">' +
        (ltOn ? '<img class="fill-letter" src="' + ASSET.tabLetterOnV + '" alt="">' : '') +
        '<img class="base" src="' + (ltOn ? ASSET.tabLetterOn : ASSET.tabLetter) + '" alt=""></div><span>편지</span></button>' +
      '<button class="tab" data-go="my"><div class="ico">' +
        (myOn ? '<img class="fill-my" src="' + ASSET.tabMyOnV + '" alt="">' : '') +
        '<img class="base" src="' + (myOn ? ASSET.tabMyOn : ASSET.tabMy) + '" alt=""></div><span>마이</span></button>' +
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


/* ============================================================
   마이페이지 (Figma 06-*)
   ============================================================ */

/* 서브페이지 공통 헤더: ‹ + 제목 */
function subBar(backId, title) {
  return '<header class="appbar appbar--sub">' +
    '<button class="icon20" data-go="' + backId + '"><img src="' + ASSET.backSub + '" alt="뒤로"></button>' +
    '<p class="sub-title">' + esc(title) + '</p>' +
  '</header>';
}

function seedIcon() {
  return '<span class="stack">' +
    '<img class="v1" src="' + ASSET.seedV1 + '" alt="">' +
    '<img class="v2" src="' + ASSET.seedV2 + '" alt="">' +
    '<img class="base" src="' + ASSET.seed + '" alt="">' +
  '</span>';
}

/* ---------- 06 마이페이지 ---------- */
function scMy(state) {
  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      '<header class="appbar appbar--my"><div class="lead"><p class="title">마이</p></div></header>' +
      '<div class="my-body">' +
        '<p class="my-section">프로필</p>' +

        '<div class="my-card my-card--profile">' +
          '<button class="my-profile" data-go="my-edit">' +
            '<span class="my-profile-l">' +
              '<img class="avatar44" src="' + ASSET.avatarMe + '" alt="">' +
              '<span class="my-profile-t">' +
                '<span class="nm">' + esc(ME.name) + '<em class="sex">' + esc(ME.sex) + '</em></span>' +
                '<span class="sub">' + esc(ME.birth) + '</span>' +
              '</span>' +
            '</span>' +
            '<img class="chev" src="' + ASSET.chevron + '" alt="">' +
          '</button>' +
          '<div class="my-divider"></div>' +
          '<div class="my-seed-row">' +
            '<span class="lbl">내 씨앗</span>' +
            '<span class="val">' + seedIcon() + '<span>' + state.seeds + '개</span></span>' +
          '</div>' +
          '<div class="my-seed-btns">' +
            '<button class="gray-btn" data-go="my-charge">충전하기</button>' +
            '<button class="gray-btn" data-go="my-history">내역보기</button>' +
          '</div>' +
        '</div>' +

        '<div class="my-card my-row">' +
          '<img class="avatar34" src="' + ASSET.avatarTori + '" alt="">' +
          '<span class="my-row-t">' +
            '<span class="nm">' + esc(ME.pet.name) + '</span>' +
            '<span class="sub">' + esc(ME.pet.desc) + '</span>' +
          '</span>' +
          '<img class="chev" src="' + ASSET.chevron + '" alt="">' +
        '</div>' +

        '<p class="my-section">설정</p>' +
        '<button class="my-card my-menu" data-go="my-data">' +
          '<span class="lbl">데이터 관리 · 대화 보관</span>' +
          '<img class="chev" src="' + ASSET.chevron + '" alt="">' +
        '</button>' +
        '<div class="my-card my-menu my-menu--off">' +
          '<span class="lbl">로그아웃</span>' +
          '<img class="chev" src="' + ASSET.chevronDim + '" alt="">' +
        '</div>' +
      '</div>' +
      bottomNav('my') +
    '</div>';
}

/* ---------- 06-1 회원정보 수정 ---------- */
/* 회원정보 폼 — 마이 06-1 과 온보딩 7 이 함께 씁니다 (직접 입력·수정 가능) */
function profileFields(state, extra) {
  var f = state.form;
  var lock = f.unknownTime;

  var num = function (key, val, unit, max, len) {
    return '<span class="num-field">' +
      '<input class="num-box" type="text" inputmode="numeric" maxlength="' + len + '"' +
        ' data-form="' + key + '" value="' + esc(val) + '"' +
        ' placeholder="' + esc(max) + '"' +
        (lock && (key === 'hour' || key === 'minute') ? ' disabled' : '') + '>' +
      '<span class="unit">' + esc(unit) + '</span>' +
    '</span>';
  };

  return '' +
    '<div class="edit-fields">' +
      '<div class="field"><p class="field-label">이름</p>' +
        '<input class="text-box" type="text" maxlength="20" data-form="name" value="' + esc(f.name) + '"' +
          ' placeholder="이름을 입력해줘"></div>' +

      '<div class="field"><p class="field-label">생년월일</p>' +
        '<div class="num-row">' +
          num('year', f.year, '년', 'YYYY', 4) +
          num('month', f.month, '월', 'MM', 2) +
          num('day', f.day, '일', 'DD', 2) +
        '</div>' +
      '</div>' +

      '<div class="field"><p class="field-label">태어난 시간</p>' +
        '<div class="num-row num-row--2">' +
          num('hour', f.hour, '시', 'HH', 2) +
          num('minute', f.minute, '분', 'MM', 2) +
        '</div>' +
        '<label class="chk chk--sm"><input type="checkbox" id="chk-unknown-time"' + (lock ? ' checked' : '') + '>' +
          '<span class="box"></span><span class="txt">태어난 시간을 모르겠어!</span></label>' +
      '</div>' +

      '<div class="field"><p class="field-label">출생지역 </p>' +
        '<input class="text-box" type="text" maxlength="40" data-form="region" value="' + esc(f.region) + '"' +
          ' placeholder="태어난 지역을 입력해줘"></div>' +

      '<div class="field"><p class="field-label">성별</p>' +
        '<div class="gender-row">' +
          ['남성', '여성'].map(function (g) {
            return '<button class="gender' + (f.gender === g ? ' on' : '') + '" data-gender="' + g + '">' + g + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      (extra || '') +
    '</div>';
}

function editFormMarkup(state) {
  return '' +
    '<div class="edit-body">' +
      profileFields(state,
        '<div class="edit-quit"><button class="link-btn" data-go="my-withdraw">회원탈퇴하기</button></div>') +
      '<button class="primary-btn" data-go="my-edit-confirm">저장하기</button>' +
    '</div>';
}

function scMyEdit(state) {
  return '<div class="screen screen--paper">' + statusBar() +
    subBar('my-edit-cancel', '회원정보수정') + editFormMarkup(state) + '</div>';
}

/* 마이페이지 계열 팝업 (Figma: 305 x auto, radius 16, 딤 검정 30%) */
function myModal(mod, cancelGo, confirmGo, confirmId) {
  var confirmAttr = confirmId ? ' id="' + confirmId + '"' : ' data-go="' + confirmGo + '"';
  return '' +
    '<div class="dim dim--soft" data-go="' + cancelGo + '"></div>' +
    '<div class="modal modal--my">' +
      '<p class="m-title">' + esc(mod.title) + '</p>' +
      '<p class="m-body">' + esc(mod.body) + '</p>' +
      '<div class="m-actions">' +
        '<button class="cancel" data-go="' + cancelGo + '">' + esc(mod.cancel) + '</button>' +
        '<button class="confirm"' + confirmAttr + '>' + esc(mod.confirm) + '</button>' +
      '</div>' +
    '</div>';
}

function scMyEditConfirm(state) {
  return '<div class="screen screen--paper">' + statusBar() +
    subBar('my-edit-cancel', '회원정보수정') + editFormMarkup(state) +
    myModal(EDIT_CONFIRM, 'my-edit', null, 'btn-edit-save') + '</div>';
}

function scMyEditCancel(state) {
  return '<div class="screen screen--paper">' + statusBar() +
    subBar('my-edit-cancel', '회원정보수정') + editFormMarkup(state) +
    myModal(EDIT_CANCEL, 'my', 'my-edit', null) + '</div>';
}

/* ---------- 06-2 데이터 관리 ---------- */
function dataBodyMarkup() {
  var items = ARCHIVED.map(function (a) {
    return '<div class="arch-item">' +
      '<img class="avatar34" src="' + a.avatar + '" alt="">' +
      '<span class="arch-t"><span class="nm">' + esc(a.name) + '</span>' +
      '<span class="at">' + esc(a.at) + '</span></span>' +
    '</div>';
  }).join('');
  return '' +
    '<div class="data-body">' +
      '<button class="wide-row" data-go="my-summary">전체 대화 요약</button>' +
      '<p class="my-section">보관된 대화</p>' +
      '<div class="arch-list">' + items + '</div>' +
    '</div>';
}

function scMyData() {
  return '<div class="screen screen--paper">' + statusBar() +
    subBar('my', '데이터 관리 · 대화 보관') + dataBodyMarkup() + '</div>';
}

function scMySummary() {
  return '<div class="screen screen--paper">' + statusBar() +
    subBar('my', '데이터 관리 · 대화 보관') + dataBodyMarkup() +
    myModal(SUMMARY_MODAL, 'my-data', 'my-data', null) + '</div>';
}

/* ---------- 06-5 씨앗 충전 ---------- */
function chargeBodyMarkup(state) {
  var rows = SEED_PRODUCTS.map(function (p, i) {
    return '<button class="seed-product" data-buy="' + i + '">' +
           '<span class="lbl">' + esc(p.label) + '</span>' +
           '<span class="price">' + esc(p.price) + '</span></button>';
  }).join('');
  return '' +
    '<div class="charge-body">' +
      '<div class="charge-top"><span class="lbl">보유 씨앗</span>' +
        '<span class="val">' + seedIcon() + '<span>' + state.seeds + '개</span></span></div>' +
      rows +
      '<p class="charge-note">' + esc(SEED_NOTICE) + '</p>' +
    '</div>';
}

function scMyCharge(state) {
  return '<div class="screen screen--paper">' + statusBar() + subBar('my', '씨앗 충전') +
    chargeBodyMarkup(state) + '</div>';
}

/* 상품 탭 → 결제 안내 팝업 (Figma 모달-결제안내) */
function scMyChargePay(state) {
  var p = SEED_PRODUCTS[state.payIndex] || SEED_PRODUCTS[0];
  return '' +
    '<div class="screen screen--paper">' + statusBar() + subBar('my', '씨앗 충전') +
      chargeBodyMarkup(state) +
      '<div class="dim dim--soft" data-go="my-charge"></div>' +
      '<div class="modal modal--pay">' +
        '<p class="m-title">' + esc(PAY_MODAL.title) + '</p>' +
        '<p class="m-body">' + esc(p.desc) + '<br>' + esc(PAY_MODAL.ask) + '</p>' +
        '<div class="m-actions">' +
          '<button class="cancel" data-go="my-charge">' + esc(PAY_MODAL.cancel) + '</button>' +
          '<button class="confirm" id="btn-buy-seed">' + esc(PAY_MODAL.confirm) + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ---------- 06-6 씨앗 내역 ---------- */
function scMyHistory(state) {
  var status = SEED_STATUS.map(function (s) {
    return '<div class="hist-status"><span class="lbl' + (s.muted ? ' muted' : '') + '">' + esc(s.label) + '</span>' +
           '<span class="num">' + esc(s.value) + '</span></div>';
  }).join('');
  var hist = SEED_HISTORY.map(function (h) {
    return '<div class="hist-row"><span class="hist-t"><span class="nm">' + esc(h.label) + '</span>' +
           '<span class="at">' + esc(h.at) + '</span></span>' +
           '<span class="delta">' + esc(h.delta) + '</span></div>';
  }).join('');
  return '' +
    '<div class="screen screen--paper">' + statusBar() + subBar('my', '씨앗 내역') +
      '<div class="hist-body">' +
        '<div class="my-card hist-card">' +
          '<p class="card-title">내 씨앗</p>' +
          '<div class="hist-total">' + seedIcon() + '<span class="big">' + state.seeds + '</span></div>' +
          '<div class="hist-line"></div>' + status +
          '<button class="gray-btn gray-btn--wide" data-go="my-charge">충전하기</button>' +
        '</div>' +
        '<div class="my-card ticket-card">' +
          '<p class="card-title">' + esc(SEED_TICKET.title) + '</p>' +
          '<div class="ticket-row"><span class="nm">' + esc(SEED_TICKET.name) + '</span>' +
            '<span class="until">' + esc(SEED_TICKET.until) + '</span></div>' +
          '<p class="ticket-note">' + SEED_TICKET.note.map(esc).join('<br>') + '</p>' +
        '</div>' +
        '<div class="my-card hist-card">' +
          '<p class="card-title">사용내역</p>' + hist +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ---------- 06-7 회원탈퇴 ---------- */
function scMyWithdraw(state) {
  var on = state.withdrawChecked;
  return '' +
    '<div class="screen screen--paper">' + statusBar() + subBar('my-edit', '회원탈퇴') +
      '<div class="quit-body">' +
        '<div class="quit-top">' +
          '<p class="quit-heading">' + esc(WITHDRAW.heading) + '</p>' +
          '<div class="my-card quit-card">' +
            '<p class="quit-card-title">' + esc(WITHDRAW.cardTitle) + '</p>' +
            '<div class="quit-bullets">' + WITHDRAW.bullets.map(function (b) {
              return '<p>' + esc(b) + '</p>'; }).join('') + '</div>' +
          '</div>' +
          '<label class="chk"><input type="checkbox" id="chk-withdraw"' + (on ? ' checked' : '') + '>' +
            '<span class="box"></span><span class="txt">' + esc(WITHDRAW.check) + '</span></label>' +
        '</div>' +
        '<button class="primary-btn' + (on ? '' : ' is-off') + '"' + (on ? ' data-go="my-bye"' : ' disabled') + '>' +
          esc(WITHDRAW.button) + '</button>' +
      '</div>' +
    '</div>';
}

/* 탈퇴하기 누른 뒤 — 탈퇴 완료 팝업 (Figma 모달-탈퇴완료) */
function scMyBye(state) {
  return '' +
    '<div class="screen screen--paper">' + statusBar() + subBar('my-edit', '회원탈퇴') +
      '<div class="quit-body">' +
        '<div class="quit-top">' +
          '<p class="quit-heading">' + esc(WITHDRAW.heading) + '</p>' +
          '<div class="my-card quit-card">' +
            '<p class="quit-card-title">' + esc(WITHDRAW.cardTitle) + '</p>' +
            '<div class="quit-bullets">' + WITHDRAW.bullets.map(function (b) {
              return '<p>' + esc(b) + '</p>'; }).join('') + '</div>' +
          '</div>' +
        '</div>' +
        '<button class="primary-btn">' + esc(WITHDRAW.button) + '</button>' +
      '</div>' +
      '<div class="dim dim--soft"></div>' +
      '<div class="modal modal--bye">' +
        '<p class="m-title">' + esc(BYE_MODAL.title) + '</p>' +
        '<p class="m-body">' + esc(BYE_MODAL.body) + '</p>' +
        '<div class="m-actions">' +
          '<button class="confirm" data-go="my">' + esc(BYE_MODAL.confirm) + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ============================================================
   편지 (Figma 편지2~5)
   ============================================================ */

/* 편지 목록 헤더 — 뒤로가기 + 제목 */
function letterBar(backId, title, share) {
  return '<header class="appbar appbar--letter">' +
    '<div class="lead">' +
      '<button class="icon20" data-go="' + backId + '"><img src="' + ASSET.backSub + '" alt="뒤로"></button>' +
      '<p class="sub-title">' + esc(title) + '</p>' +
    '</div>' +
    (share ? '<span class="share"><img src="' + ASSET.share + '" alt="공유"></span>' : '') +
  '</header>';
}

/* 개봉한 편지 목록 (편지3·4 공용) */
function openedListMarkup() {
  var rows = LETTER.opened.map(function (o) {
    var thumb = o.locked
      ? '<span class="lock-badge"><img src="' + ASSET.lock + '" alt="잠김"></span>'
      : '<img class="avatar34" src="' + ASSET.letterAvatar + '" alt="">';
    return '<div class="letter-row' + (o.locked ? ' letter-row--locked' : '') + '">' +
      thumb + '<span class="nm">' + esc(o.title) + '</span></div>';
  }).join('');
  return '<p class="letter-section">' + esc(LETTER.openedLabel) + '</p>' +
         '<div class="letter-rows">' + rows + '</div>';
}

/* ---------- 편지2 · 받은 편지 없음 ---------- */
function scLetterEmpty() {
  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      letterBar('home', LETTER.listTitle) +
      '<div class="empty-state">' +
        '<img class="art art--sad" src="' + ASSET.charSad + '" alt="">' +
        '<p>' + esc(LETTER.emptyText) + '</p>' +
      '</div>' +
      bottomNav('letter') +
    '</div>';
}

/* ---------- 편지3 · 생성 전 ---------- */
function scLetterList() {
  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      letterBar('home', LETTER.listTitle) +
      '<div class="letter-body">' +
        '<div class="letter-card letter-card--writing">' +
          '<img class="thumb35" src="' + ASSET.hourglass + '" alt="">' +
          '<span class="letter-card-t">' +
            '<span class="nm">' + esc(LETTER.writing.title) + '</span>' +
            '<span class="sub">' + esc(LETTER.writing.sub) + '</span>' +
          '</span>' +
        '</div>' +
        openedListMarkup() +
      '</div>' +
      bottomNav('letter') +
    '</div>';
}

/* ---------- 편지4 · 생성 후 (개봉하기) ---------- */
function scLetterReady() {
  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      letterBar('home', LETTER.listTitle) +
      '<div class="letter-body">' +
        '<div class="letter-card letter-card--ready">' +
          '<img class="avatar34" src="' + ASSET.letterAvatar + '" alt="">' +
          '<span class="letter-card-t">' +
            '<span class="nm">' + esc(LETTER.ready.title) + '</span>' +
            '<span class="sub">' + esc(LETTER.ready.sub) + '</span>' +
          '</span>' +
          '<button class="open-btn" data-go="letter-preview">개봉<br>하기</button>' +
        '</div>' +
        openedListMarkup() +
      '</div>' +
      bottomNav('letter') +
    '</div>';
}

/* ---------- 편지5 · 미리보기 ----------
   Figma 1473px — 세로로 흐르게(스크롤) 처리 */
function teaserLine(line) {
  return esc(line).replace(/\[\[(.+?)\]\]/g, '<span class="masked">$1</span>');
}

function scLetterPreview() {
  var body = LETTER_PREVIEW.body.map(esc).join('<br>');

  var teaser = LETTER_TEASER.items.map(function (it) {
    return '<div class="teaser-item">' +
      '<p class="teaser-ch">' + esc(it.ch) + '</p>' +
      '<p class="teaser-tx">' + it.lines.map(teaserLine).join('<br>') + '</p>' +
    '</div>';
  }).join('');

  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      letterBar('letter-ready', LETTER_PREVIEW.headTitle, true) +
      '<div class="letter-scroll">' +

        '<div class="letter-hero">' +
          '<div class="letter-speech">' +
            '<img src="' + ASSET.letterSpeech + '" alt="">' +
            '<span>' + esc(LETTER_PREVIEW.speech) + '</span>' +
          '</div>' +
          '<img class="letter-char" src="' + ASSET.charLetter + '" alt="">' +
        '</div>' +

        '<div class="letter-sheet">' +
          '<p class="letter-to">' + esc(LETTER_PREVIEW.to) + '</p>' +
          '<p class="letter-text">' + body + '</p>' +
          '<p class="letter-from">' + esc(LETTER_PREVIEW.from) + '</p>' +
        '</div>' +

        '<div class="teaser">' +
          '<div class="teaser-head">' +
            '<p class="teaser-title">' + esc(LETTER_TEASER.title) + '</p>' +
            '<p class="teaser-sub">' + LETTER_TEASER.sub.map(esc).join('<br>') + '</p>' +
          '</div>' +
          '<div class="teaser-card">' + teaser + '</div>' +
          '<div class="teaser-btn">' +
            '<button class="primary-btn" data-go="letter-opened">' + esc(LETTER_TEASER.cta) + '</button>' +
            '<p class="teaser-note">' + esc(LETTER_TEASER.note) + '</p>' +
          '</div>' +
        '</div>' +

      '</div>' +
    '</div>';
}


/* ---------- 장 본문 블록 렌더 ---------- */
function chapterBlocks(id) {
  var blocks = CHAPTER_BODY[id];
  if (!blocks) return '<div class="ch-empty">본문은 준비 중이에요.</div>';

  return blocks.map(function (b) {
    if (b.type === 'graph') {
      return '<section class="ch-sec ch-graph">' +
        '<p class="ch-label ch-label--dark">' + esc(b.label) + '</p>' +
        '<img class="ch-graph-img" src="' + ASSET.fortuneGraph + '" alt="' + esc(b.label) + '">' +
      '</section>';
    }
    if (b.type === 'period') {
      var cards = b.items.map(function (it) {
        return '<div class="ch-period">' +
          (it.badge ? '<span class="ch-badge">' + esc(it.badge) + '</span>' : '') +
          '<p class="ch-term"><b>' + esc(it.term) + '</b><span> | ' + esc(it.range) + '</span></p>' +
          '<p class="ch-term-tx">' + esc(it.text) + '</p>' +
        '</div>';
      }).join('');
      return '<section class="ch-sec ch-periods">' + cards + '</section>';
    }
    if (b.type === 'text') {
      var paras = b.paras.map(function (p) {
        return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>';
      }).join('');
      return '<section class="ch-sec">' +
        '<p class="ch-label">' + esc(b.label) + '</p>' +
        '<div class="ch-text">' + paras + '</div>' +
      '</section>';
    }
    if (b.type === 'flow') {
      var fsteps = b.steps.map(function (s, i) {
        return (i ? '<p class="ch-arrow">↓</p>' : '') +
          '<div class="ch-flowbox">' + s.lines.map(esc).join('<br>') + '</div>';
      }).join('');
      return '<section class="ch-sec ch-flow">' +
        '<p class="ch-label ch-label--dark">' + esc(b.label) + '</p>' +
        '<div class="ch-steps">' + fsteps + '</div>' +
      '</section>';
    }
    if (b.type === 'note') {
      return '<section class="ch-sec ch-note">' +
        '<span class="ch-badge">' + esc(b.badge) + '</span>' +
        (b.before ? '<div class="ch-text">' + b.before.map(function (p) {
          return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' : '') +
        '<div class="ch-notelist">' + b.items.map(function (q) {
          return '<div class="ch-quoteline">' +
            '<span class="t">' + esc(q.t).replace(/\n/g, '<br>') + '</span>' +
            (q.d ? '<span class="d">' + esc(q.d) + '</span>' : '') +
          '</div>';
        }).join('') + '</div>' +
        (b.after ? '<div class="ch-text">' + b.after.map(function (p) {
          return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' : '') +
      '</section>';
    }
    if (b.type === 'letter') {
      return '<section class="ch-sec ch-endletter">' +
        '<p class="ch-hello">' + esc(b.hello) + '</p>' +
        '<div class="ch-endtext">' + b.paras.map(function (p) {
          return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
        '<p class="ch-from">' + esc(b.from) + '</p>' +
        '<div class="ch-endbtn">' +
          '<button class="primary-btn" data-go="chat-list">' + esc(b.cta) + '</button>' +
          '<p class="teaser-note">' + esc(b.note) + '</p>' +
        '</div>' +
      '</section>';
    }
    if (b.type === 'quotes') {
      return '<section class="ch-sec ch-quotes">' +
        '<p class="ch-label ch-label--dark">' + esc(b.label) + '</p>' +
        b.items.map(function (q) {
          return '<div class="ch-quoteline">' +
            '<span class="t">' + esc(q.t).replace(/\n/g, '<br>') + '</span>' +
            '<span class="d">' + esc(q.d) + '</span>' +
          '</div>';
        }).join('') +
      '</section>';
    }
    if (b.type === 'panel') {
      return '<section class="ch-sec">' +
        '<p class="ch-label ch-label--dark">' + esc(b.label) + '</p>' +
        '<div class="ch-panel">' + b.lines.map(esc).join('<br>') + '</div>' +
      '</section>';
    }
    if (b.type === 'cycle') {
      var steps = b.steps.map(function (s, i) {
        return (i ? '<p class="ch-arrow">↓</p>' : '') +
          '<div class="ch-step">' +
            '<p class="k">' + esc(s.k) + '</p>' +
            '<p class="v">' + s.lines.map(esc).join('<br>') + '</p>' +
            (s.badge ? '<span class="ch-badge">' + esc(s.badge) + '</span>' : '') +
          '</div>';
      }).join('');
      return '<section class="ch-sec ch-cycle">' +
        '<p class="ch-label ch-label--dark">' + esc(b.label) + '</p>' +
        '<div class="ch-steps">' + steps + '</div>' +
      '</section>';
    }
    if (b.type === 'rx') {
      return '<section class="ch-sec ch-rx">' +
        '<div class="ch-gauge-head">' +
          '<span class="ch-badge">' + esc(b.badge) + '</span>' +
          '<span class="ch-rx-title">' + esc(b.title) + '</span>' +
        '</div>' +
        '<div class="ch-text">' + b.paras.map(function (p) {
          return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' +
        (b.tip ? '<div class="ch-tip">' +
          '<p class="ch-label">추천 문장</p>' +
          '<p class="v">' + esc(b.tip).replace(/\n/g, '<br>') + '</p>' +
        '</div>' : '') +
        (b.why ? '<div class="ch-why">' +
          '<p class="ch-label">이 처방이 네 것인 이유</p>' +
          '<div class="ch-text">' + b.why.map(function (p) {
            return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' +
        '</div>' : '') +
      '</section>';
    }
    if (b.type === 'stats') {
      return '<section class="ch-sec ch-stats">' + b.items.map(function (s) {
        return '<div class="ch-stat"><p class="n">' + esc(s.n) + '</p><p class="l">' + esc(s.l) + '</p></div>';
      }).join('') + '</section>';
    }
    if (b.type === 'bars') {
      return '<section class="ch-sec ch-bars">' +
        '<p class="ch-label">' + esc(b.label) + '</p>' +
        b.items.map(function (r) {
          return '<div class="ch-bar' + (r.first ? ' is-first' : '') + '">' +
            '<span class="l">' + esc(r.l) + '</span>' +
            '<span class="track"><span class="fill" style="width:' + r.pct + '%"></span></span>' +
            '<span class="p">' + r.pct + '%</span>' +
          '</div>';
        }).join('') +
      '</section>';
    }
    if (b.type === 'weather') {
      return '<section class="ch-sec ch-weather">' + b.items.map(function (w) {
        return '<div class="ch-wcard">' +
          '<span class="w">' + esc(w.w) + '</span>' +
          '<span class="t">' + esc(w.t) + '</span>' +
          '<img src="' + w.icon + '" alt="">' +
        '</div>';
      }).join('') + '</section>';
    }
    if (b.type === 'gauge') {
      var gcards = b.cards.map(function (c) {
        return '<div class="ch-gcard' + (b.flip ? ' is-flip' : '') + '">' +
          '<p class="ch-gt">' + esc(c.t) + '</p>' +
          '<p class="ch-gd">' + esc(c.d) + '</p>' +
        '</div>';
      }).join('');
      return '<section class="ch-sec ch-gauge">' +
        '<div class="ch-gauge-head">' +
          '<span class="ch-badge">' + esc(b.badge) + '</span>' +
          '<span class="ch-gauge-cap">' + esc(b.caption) + '</span>' +
        '</div>' +
        '<div class="ch-gcards">' + gcards + '</div>' +
      '</section>';
    }
    if (b.type === 'quote') {
      return '<section class="ch-sec">' +
        '<p class="ch-label">' + esc(b.label) + '</p>' +
        '<div class="ch-quote">' + b.lines.map(esc).join('<br>') + '</div>' +
      '</section>';
    }
    return '';
  }).join('');
}

/* ---------- 목차 아코디언 (편지6 · 1부 · 2부 공용) ---------- */
function tocAccordion(openIds) {
  openIds = openIds || [];
  return LETTER_TOC.parts.map(function (p) {
    var rows = p.items.map(function (it) {
      var open = openIds.indexOf(it.id) !== -1;
      return '<div class="toc-block' + (open ? ' is-open' : '') + '">' +
        '<button class="toc-row" data-chapter="' + it.id + '">' +
          '<span class="toc-t">' +
            '<span class="toc-h"><em class="emo">' + it.emoji + '</em>' +
              '<b>' + esc(it.name) + '</b><span class="bar">|</span>' + esc(it.tail) + '</span>' +
            '<span class="toc-s">' + esc(it.sub) + '</span>' +
          '</span>' +
          '<span class="toc-chev">' + (open ? '⌃' : '⌄') + '</span>' +
        '</button>' +
        (open ? '<div class="toc-panel">' + chapterBlocks(it.id) + '</div>' : '') +
      '</div>';
    }).join('');
    return '<div class="toc-part-block">' +
      '<p class="toc-part">' + esc(p.label) + '</p>' +
      '<div class="toc-rows">' + rows + '</div>' +
    '</div>';
  }).join('');
}
/* ---------- 편지6 · 결제 후 (목차) ---------- */
function letterSheetMarkup() {
  return '' +
    '<div class="letter-hero">' +
      '<div class="letter-speech">' +
        '<img src="' + ASSET.letterSpeech + '" alt="">' +
        '<span>' + esc(LETTER_PREVIEW.speech) + '</span>' +
      '</div>' +
      '<img class="letter-char" src="' + ASSET.charLetter + '" alt="">' +
    '</div>' +
    '<div class="letter-sheet">' +
      '<p class="letter-to">' + esc(LETTER_PREVIEW.to) + '</p>' +
      '<p class="letter-text">' + LETTER_PREVIEW.body.map(esc).join('<br>') + '</p>' +
      '<p class="letter-from">' + esc(LETTER_PREVIEW.from) + '</p>' +
    '</div>';
}

function scLetterOpened(state) {
  /* 결제 후이므로 가림(blur) 없이 그대로 보여줍니다 */
  var teaser = LETTER_TEASER.items.map(function (it) {
    return '<div class="teaser-item">' +
      '<p class="teaser-ch">' + esc(it.ch) + '</p>' +
      '<p class="teaser-tx">' + it.lines.map(function (l) {
        return esc(l).replace(/\[\[(.+?)\]\]/g, '$1');
      }).join('<br>') + '</p>' +
    '</div>';
  }).join('');

  var tabs = LETTER_TOC.tabs.map(function (t, i) {
    return '<button class="toc-tab' + (i === 0 ? ' on' : '') + '">' + esc(t) + '</button>';
  }).join('');

  var parts = tocAccordion(state.openChapters);

  return '' +
    '<div class="screen screen--paper">' +
      statusBar() +
      letterBar('letter-ready', LETTER_PREVIEW.headTitle, true) +
      '<div class="letter-scroll">' +
        letterSheetMarkup() +
        '<div class="teaser teaser--opened">' +
          '<div class="teaser-head">' +
            '<p class="teaser-title">' + esc(LETTER_TEASER.title) + '</p>' +
            '<p class="teaser-sub">' + LETTER_TEASER.sub.map(esc).join('<br>') + '</p>' +
          '</div>' +
          '<div class="teaser-card">' + teaser + '</div>' +
        '</div>' +
        '<div class="toc">' +
          '<div class="toc-tabs">' + tabs + '</div>' +
          parts +
        '</div>' +
        '<div class="letter-foot">' +
          '<span class="dday">' + esc(LETTER_TOC.dday) + '</span>' +
          '<img class="foot-char" src="' + ASSET.charLetter + '" alt="">' +
        '</div>' +
      '</div>' +
    '</div>';
}

/* ============================================================
   온보딩 (Figma 온보딩 1~4)
   ============================================================ */
function onbArt(o) {
  if (o.art === 'chat') {
    return '<div class="onb-chatcard">' + o.bubbles.map(function (b) {
      return '<div class="onb-brow onb-brow--' + b.side + '">' +
        '<span class="onb-bub onb-bub--' + b.side + '">' + esc(b.t) + '</span>' +
      '</div>';
    }).join('') + '</div>';
  }
  if (o.art === 'solo') {
    return '<div class="onb-art">' +
      '<div class="onb-speech"><img src="' + ASSET.speech + '" alt="">' +
        '<span>' + esc(o.speech) + '</span></div>' +
      '<img class="onb-solo" src="' + ASSET.cardMelang + '" alt="">' +
    '</div>';
  }
  if (o.art === 'duo') {
    return '<div class="onb-art">' +
      '<div class="onb-speech"><img src="' + ASSET.speech + '" alt="">' +
        '<span>' + esc(o.speech) + '</span></div>' +
      '<div class="onb-duo">' +
        '<span class="onb-duo-a"><img src="' + ASSET.onbDuo + '" alt=""></span>' +
        '<span class="onb-duo-b"><img src="' + ASSET.onbDuo + '" alt=""></span>' +
      '</div>' +
    '</div>';
  }
  /* letter — 편지 목차를 축소한 미리보기 */
  var L = ONB_LETTER_ART;
  var row = function (t) { return '<div class="onb-lrow"><span>' + esc(t) + '</span><em>⌄</em></div>'; };
  return '<div class="onb-letterart">' +
    '<div class="onb-lcol">' +
      '<div class="onb-lhead"></div>' +
      L.rows.map(row).join('') +
      '<div class="onb-lgap"></div>' +
      L.after.map(row).join('') +
    '</div>' +
    '<div class="onb-lcard">' +
      '<p class="onb-lopen"><em>' + L.open.emoji + '</em><b>' + esc(L.open.name) + '</b>' +
        '<span class="bar">|</span>' + esc(L.open.tail) + '<i class="chev">⌄</i></p>' +
      '<p class="onb-lsub">' + esc(L.open.sub) + '</p>' +
      '<div class="onb-lbox">' +
        '<p class="t">' + esc(L.open.card.t) + '</p>' +
        '<p class="d">' + esc(L.open.card.d) + '</p>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function scOnboarding(state, idx) {
  var o = ONBOARDING[idx];
  var next = ONBOARDING[idx + 1] ? ONBOARDING[idx + 1].id : 'onb-login';
  var dots = ONBOARDING.map(function (_, i) {
    return '<span class="onb-dot' + (i === idx ? ' on' : '') + '"></span>';
  }).join('');

  return '' +
    '<div class="screen screen--paper">' + statusBar() +
      '<button class="onb-skip" data-go="onb-login">' + esc(ONB_SKIP) + '</button>' +
      onbArt(o) +
      '<div class="onb-copy">' +
        '<p class="onb-title">' + o.title.map(esc).join('<br>') + '</p>' +
        '<p class="onb-desc">' + o.desc.map(esc).join('<br>') + '</p>' +
      '</div>' +
      '<div class="onb-foot">' +
        '<div class="onb-dots">' + dots + '</div>' +
        '<button class="primary-btn" data-go="' + next + '">' + esc(o.cta) + '</button>' +
      '</div>' +
    '</div>';
}

/* ---------- 온보딩 5 로그인 ---------- */
function scOnbLogin() {
  var btns = LOGIN.buttons.map(function (b) {
    return '<button class="login-btn login-btn--' + b.id + '" data-go="onb-pick">' +
      '<img src="' + b.icon + '" alt="">' +
      '<span>' + esc(b.label) + '</span>' +
    '</button>';
  }).join('');

  return '' +
    '<div class="screen screen--paper">' + statusBar() +
      '<div class="login-body">' +
        '<div class="login-top">' +
          '<p class="login-brand">' + esc(LOGIN.brand) + '</p>' +
          '<div class="login-copy">' +
            '<p class="login-title">' + esc(LOGIN.title) + '</p>' +
            '<p class="login-sub">' + LOGIN.sub.map(esc).join('<br>') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="login-btns">' + btns + '</div>' +
      '</div>' +
    '</div>';
}

/* ---------- 온보딩 6 햄찌 고르기 & 이름 정하기 ---------- */
function scOnbPick(state) {
  var cards = CHARACTERS.map(function (c) {
    return '<button class="opick-card' + (state.charId === c.id ? ' on' : '') + '" data-onbchar="' + c.id + '">' +
      '<img src="' + c.card + '" alt="">' +
      '<span class="nm">' + esc(c.name) + '</span>' +
      '<span class="ds">' + esc(c.desc) + '</span>' +
    '</button>';
  }).join('');

  return '' +
    '<div class="screen screen--paper">' + statusBar() +
      '<div class="opick-body">' +
        '<p class="onb-h1">' + esc(ONB_PICK.title) + '</p>' +
        '<p class="opick-desc">' + ONB_PICK.desc.map(esc).join('<br>') + '</p>' +
        '<div class="opick-row">' + cards + '</div>' +
        '<div class="opick-name">' +
          '<input id="onb-name" class="opick-input" type="text" maxlength="10"' +
            ' placeholder="' + esc(ONB_PICK.placeholder) + '"' +
            ' value="' + esc(state.onbName || '') + '">' +
          '<p class="opick-hint">' + esc(ONB_PICK.hint) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="opick-foot">' +
        '<button class="primary-btn" data-go="onb-profile">' + esc(ONB_PICK.cta) + '</button>' +
      '</div>' +
    '</div>';
}

/* ---------- 온보딩 7 사용자 정보받기 ---------- */
function scOnbProfile(state) {
  return '' +
    '<div class="screen screen--paper">' + statusBar() +
      '<p class="onb-h1 onb-h1--left">' + esc(ONB_PROFILE.title) + '</p>' +
      '<div class="edit-body edit-body--onb">' + profileFields(state) + '</div>' +
      '<div class="onb-cta">' +
        '<button class="primary-btn" data-go="onb-topic">' + esc(ONB_PROFILE.cta) + '</button>' +
      '</div>' +
    '</div>';
}

/* ---------- 온보딩 8 주 고민 고르기 ---------- */
function topicBody(state) {
  var picked = state.onbTopics || [];
  var rows = ONB_TOPIC.rows.map(function (r) {
    return '<div class="topic-row">' + r.map(function (c) {
      var on = picked.indexOf(c.t) !== -1;
      return '<button class="topic-chip' + (on ? ' on' : '') + '"' +
        ' data-topic="' + esc(c.t) + '" style="width:' + c.w + 'px">' +
        '<span class="e">' + c.e + '</span>' +
        '<span class="t">' + esc(c.t) + '</span>' +
      '</button>';
    }).join('') + '</div>';
  }).join('');

  return '' +
    '<div class="topic-body">' +
      '<p class="onb-h1">' + esc(ONB_TOPIC.title) + '</p>' +
      '<p class="topic-desc">' + ONB_TOPIC.desc.map(esc).join('<br>') + '</p>' +
      '<div class="topic-rows">' + rows + '</div>' +
    '</div>';
}

function scOnbTopic(state) {
  return '' +
    '<div class="screen screen--paper">' + statusBar() + topicBody(state) +
      '<div class="onb-cta">' +
        '<button class="primary-btn" data-go="onb-consent">' + esc(ONB_TOPIC.cta) + '</button>' +
      '</div>' +
    '</div>';
}

/* ---------- 온보딩 9 AI 데이터 전송 동의 팝업 ---------- */
function scOnbConsent(state) {
  var C = ONB_CONSENT;
  var rows = C.rows.map(function (r) {
    return '<div class="consent-row">' +
      '<p class="k">' + esc(r.k) + '</p>' +
      '<p class="v">' + r.v.map(esc).join('<br>') + '</p>' +
    '</div>';
  }).join('');

  return '' +
    '<div class="screen screen--paper">' + statusBar() + topicBody(state) +
      '<div class="onb-cta">' +
        '<button class="primary-btn">' + esc(ONB_TOPIC.cta) + '</button>' +
      '</div>' +
      '<div class="dim dim--soft" data-go="onb-topic"></div>' +
      '<div class="modal modal--consent">' +
        '<div class="consent-head">' +
          '<p class="t">' + esc(C.title) + '</p>' +
          '<p class="d">' + esc(C.lead) + '</p>' +
        '</div>' +
        '<div class="consent-rows">' + rows + '</div>' +
        '<div class="consent-btns">' +
          '<button class="primary-btn" data-go="onb-10">' + esc(C.ok) + '</button>' +
          '<button class="subtle-btn" data-go="onb-topic">' + esc(C.no) + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}


/* ---------- 온보딩 10~13 코치마크 ----------
   기존 화면을 그대로 그린 뒤, 그 위에 딤 + 말풍선을 얹습니다.
   딤은 구멍 하나만 남기고 화면을 덮습니다 (box-shadow 로 바깥을 칠함). */
function coachMark(c) {
  var t = c.tip;
  return '' +
    '<div class="coach" data-go="' + c.next + '">' +
      '<div class="coach-hole" style="left:' + c.hole[0] + 'px;top:' + c.hole[1] + 'px;' +
        'width:' + c.hole[2] + 'px;height:' + c.hole[3] + 'px"></div>' +
      '<div class="coach-tip" style="left:' + t.x + 'px;top:' + t.y + 'px;' +
        'width:' + t.w + 'px;height:' + t.h + 'px">' +
        '<img src="' + t.img + '" alt="">' +
        '<p class="coach-text" style="top:' + t.ty + 'px;width:' + t.tw + 'px">' +
          esc(c.text).replace(/\n/g, '<br>') +
        '</p>' +
      '</div>' +
    '</div>';
}

function scCoach(state, i) {
  var c = COACH[i];
  var base = SCREENS[c.base](state);
  return base.replace(/<\/div>$/, coachMark(c) + '</div>');
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
  'fortune':       scFortune,

  'my':              scMy,
  'my-edit':         scMyEdit,
  'my-edit-confirm': scMyEditConfirm,
  'my-edit-cancel':  scMyEditCancel,
  'my-data':         scMyData,
  'my-summary':      scMySummary,
  'my-charge':       scMyCharge,
  'my-charge-pay':   scMyChargePay,
  'my-history':      scMyHistory,
  'my-withdraw':     scMyWithdraw,
  'my-bye':          scMyBye,

  'letter-empty':    scLetterEmpty,
  'letter-list':     scLetterList,
  'letter-ready':    scLetterReady,
  'letter-preview':  scLetterPreview,
  'letter-opened':   scLetterOpened,

  'onb-1': function (s) { return scOnboarding(s, 0); },
  'onb-2': function (s) { return scOnboarding(s, 1); },
  'onb-3': function (s) { return scOnboarding(s, 2); },
  'onb-4': function (s) { return scOnboarding(s, 3); },

  'onb-login':   scOnbLogin,
  'onb-pick':    scOnbPick,
  'onb-profile': scOnbProfile,
  'onb-topic':   scOnbTopic,
  'onb-consent': scOnbConsent,

  'onb-10': function (s) { return scCoach(s, 0); },
  'onb-11': function (s) { return scCoach(s, 1); },
  'onb-12': function (s) { return scCoach(s, 2); },
  'onb-13': function (s) { return scCoach(s, 3); }
};
