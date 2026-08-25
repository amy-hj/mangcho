/* ============================================================
   Hamnal 주화면 프로토타입 — 목업 데이터
   서버/DB 없음. 새로고침하면 초기 상태로 돌아갑니다.
   ============================================================ */
var A = 'assets/';

var ASSET = {
  /* 상태바 */
  signal:  A + 'icon/status-signal.svg',
  wifi:    A + 'icon/status-wifi.svg',
  battery: A + 'icon/status-battery.svg',

  /* 탭바 */
  tabHomeOn:   A + 'icon/tab-home-on.png',
  tabHomeOnV:  A + 'icon/tab-home-on-v.svg',
  tabHomeOff:  A + 'icon/tab-home-off.png',
  tabChatOn:   A + 'icon/tab-chat-on.png',
  tabChatOnV:  A + 'icon/tab-chat-on-v.svg',
  tabChatOff:  A + 'icon/tab-chat-off.png',
  tabLetter:   A + 'icon/tab-letter.png',
  tabMy:       A + 'icon/tab-my.png',

  /* 홈 */
  cage:      A + 'img/home-cage.png',
  charHome:  A + 'img/char-melang.svg',
  speech:    A + 'icon/speech-union.svg',
  seed:      A + 'icon/seed.png',
  seedV1:    A + 'icon/seed-v1.svg',
  seedV2:    A + 'icon/seed-v2.svg',
  letterV1:  A + 'icon/letter-v1.svg',
  letterV2:  A + 'icon/letter-v2.svg',
  fortune:   A + 'icon/fortune.png',
  fortuneV1: A + 'icon/fortune-v1.svg',
  fortuneV2: A + 'icon/fortune-v2.svg',
  attend:    A + 'icon/attend.png',
  attendV1:  A + 'icon/attend-v1.svg',
  attendV2:  A + 'icon/attend-v2.svg',

  /* 대화 */
  charFull:   A + 'img/char-melang-full.png',
  cardMelang: A + 'img/char-melang-card.png',
  cardKochi:  A + 'img/char-kochi-card.png',
  avatarChat: A + 'img/avatar-chat.png',
  avatar1:    A + 'img/avatar-melang.png',
  avatar2:    A + 'img/avatar-kochi.png',
  avatar3:    A + 'img/avatar-3.png',

  /* 컨트롤 */
  fab:        A + 'icon/fab-plus.svg',
  back:       A + 'icon/back.svg',
  kebab:      A + 'icon/kebab.svg',
  send:       A + 'icon/send.svg',        /* 비활성 · 회색 */
  sendActive: A + 'icon/send-active.svg', /* 활성 · #FFC320 */
  menuPin:    A + 'icon/menu-pin.svg',   /* 메뉴용 · 외곽선 #211A11 · 16px */
  pinFilled:  A + 'icon/pin-filled.svg', /* 목록 고정 표시 · 꽉 찬 #B8B8B8 · 12px */
  menuRename: A + 'icon/menu-rename.svg',
  menuDelete: A + 'icon/menu-delete.svg',

  /* 출석체크 · 운세 */
  stamp:       A + 'img/stamp-attend.png',
  calEmpty:    A + 'icon/cal-empty.svg',     /* 미출석 · 점선 #CFCFCF */
  calToday:    A + 'icon/cal-today.svg',     /* 오늘 · 점선 #666666 */
  calSelected: A + 'icon/cal-selected.svg',  /* 점선 #D8D8D8 */
  calPrev:     A + 'icon/cal-prev.svg',
  calNext:     A + 'icon/cal-next.svg',
  seed24:      A + 'icon/seed24.png',
  seed24V1:    A + 'icon/seed24-v1.svg',
  seed24V2:    A + 'icon/seed24-v2.svg',
  modalClose:  A + 'icon/modal-close.svg'
};

/* 홈 */
var HOME = {
  seeds: '1,250',
  letter: '편지 D-16',
  speech: '너를 위해 볼주머니를 늘려봤어...'
};

/* 캐릭터 */
var CHARACTERS = [
  { id: 'melang', name: '멜랑', desc: '동글동글 귀여운 햄토피아의 인기햄이야!', card: ASSET.cardMelang, avatar: ASSET.avatar1 },
  { id: 'kochi',  name: '코치',  desc: '냉철하지만 속마음은 따뜻한 대문자T 햄이야!', card: ASSET.cardKochi,  avatar: ASSET.avatar2 }
];

/* 대화 목록 */
var ROOMS = [
  { id: 'r1', name: '회사내 인간관계 트러블과 업무 고민', at: '오전 11:36', avatar: ASSET.avatar1, pinned: false },
  { id: 'r2', name: '남자친구와의 여행 계획',            at: '어제',       avatar: ASSET.avatar2, pinned: false },
  { id: 'r3', name: '재테크와 주식투자 플랜 짜기',        at: '26.08.15',   avatar: ASSET.avatar3, pinned: false },
  { id: 'r4', name: '재테크와 주식투자 플랜 짜기',        at: '26.08.15',   avatar: ASSET.avatar3, pinned: false },
  { id: 'r5', name: '재테크와 주식투자 플랜 짜기',        at: '26.08.15',   avatar: ASSET.avatar2, pinned: false }
];

/* 새 대화(주화면 4) — 첫 인사 */
var CHAT_START = [
  { side: 'other', who: '햄찌', text: '안녕! 무슨 고민이 있어서 찾아왔어?', at: '오전 11:36' }
];

/* 진행 중 대화(주화면 5) */
var CHAT_ONGOING = [
  { side: 'other', who: '햄찌', text: '나였어도 너무 화났을거야! 네 잘못도 있지만 그런 식으로 말을 하다니!', at: '오전 11:36' },
  { side: 'me',                 text: '내가 잘하고 있는지 모르겠어',                                        at: '오전 11:36' },
  { side: 'other', who: '햄찌', text: '그런 상황에선 누구라도 당황스러울 거야. 그러니 너무 네 스스로를 탓하지 않았으면 해.', at: '오전 11:36' }
];

/* 추천 문구 (주화면 4) */
var SUGGESTS = [
  ['요즘 힘든 일이 있어', '불안감을 줄이고 싶어', '연애 고민 있어', '회사에서 힘들어'],
  ['오늘 운세 궁금해', '요즘 너무 심심해', '내가 잘 하고 있는지 모르겠어 ', '내가 잘 하고 있는지 모르겠어 ']
];

/* 이 추천 문구를 누르면 주화면 5(진행 중 대화) 상태로 이어집니다 */
var JUMP_TO_ONGOING = '내가 잘 하고 있는지 모르겠어';
var ONGOING_ROOM_NAME = '회사내 인간관계 트러블과 업무 고민';
var ONGOING_DRAFT = '진짜 너무 열받고 화나는 상황...';

/* 첫 메시지 → 대화방 제목 요약 (프로토타입용 규칙 기반) */
var SUMMARY_RULES = [
  { kw: ['잘하고있는지'], title: ONGOING_ROOM_NAME },
  { kw: ['힘든일있어'],   title: '요즘 지치는 마음 털어놓기' },
  { kw: ['불안'],         title: '불안감 줄이는 방법 찾기' },
  { kw: ['연애'],         title: '연애 고민 상담' },
  { kw: ['회사'],         title: '회사에서 힘든 일 이야기' },
  { kw: ['운세'],         title: '오늘의 운세 물어보기' },
  { kw: ['심심'],         title: '심심할 때 나누는 수다' }
];

/* 자동 응답 (프로토타입용) */
var REPLIES = [
  '그랬구나… 얘기해줘서 고마워. 좀 더 들려줄래?',
  '읽기만 해도 마음이 무거워지네. 오늘은 좀 어땠어?',
  '네 잘못이 아니야. 그럴 수도 있는 거야.',
  '음… 나라면 그 상황에서 볼주머니에 다 넣어버렸을 거야!'
];

/* ---------- 출석체크 (Figma 출첵 체크 2 · 3) ---------- */
var ATTEND_MONTH = '8월';
var ATTEND_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
/* s=도장 · e=미출석(#CFCFCF) · t=오늘(#666) · x=연한 점선(#D8D8D8) · null=빈칸 */
var ATTEND_DAYS = [
  [null, null, null, null, null, { d: 1, s: 'e' }, { d: 2, s: 's' }],
  [{ d: 3, s: 's' }, { d: 4, s: 'e' }, { d: 5, s: 'e' }, { d: 6, s: 's' }, { d: 7, s: 's' }, { d: 8, s: 'e' }, { d: 9, s: 's' }],
  [{ d: 10, s: 's' }, { d: 11, s: 'e' }, { d: 12, s: 'e' }, { d: 13, s: 's' }, { d: 14, s: 'e' }, { d: 15, s: 's' }, { d: 16, s: 's' }],
  [{ d: 17, s: 'e' }, { d: 18, s: 't' }, { d: 19, s: 'e' }, { d: 20, s: 'e' }, { d: 21, s: 'e' }, { d: 22, s: 'e' }, { d: 23, s: 'e' }],
  [{ d: 24, s: 'e' }, { d: 25, s: 'x' }, { d: 26, s: 'e' }, { d: 27, s: 'e' }, { d: 28, s: 'e' }, { d: 29, s: 'e' }, { d: 30, s: 'e' }],
  [{ d: 31, s: 'e' }, null, null, null, null, null, null]
];
var ATTEND_CTA = '출석체크하고 해바라기씨 받기';
var ATTEND_DONE = {
  title: '오늘의 씨앗 도착!',
  desc: ['오늘 씨앗 0개를 받았어요!', '자정이 지나면 안 쓴 씨앗은 사라져요'],
  confirm: '확인'
};

/* ---------- 오늘의 운세 (Figma 오늘의운세_모달) ---------- */
var FORTUNE = {
  scoreLabel: '오늘의 운세 점수',
  score: '80점',
  quote: '“ 두려워 하지말고 당당하게 맞서세요.”',
  body: [
    '오늘은 도전에 맞서 싸우고, 자신의 위치를',
    '굳건히 하는 날이에요. 경쟁과 도전 속에서도 당당히',
    '자신의 의견을 표현하고, 자신의 위치를 확고히',
    '할 수 있는 용기와 결단력을 가져야 해요'
  ],
  summaryLabel: '오늘의 운세 점수',
  items: [
    ['행운의 색', '파랑'],
    ['행운의 숫자', '5, 10'],
    ['추천 아이템', '손수건'],
    ['추천 음식', '마라탕']
  ]
};

/* 화면 인덱스 */
var SCREEN_INDEX = [
  { id: 'home',            num: '1',    label: 'home' },
  { id: 'chat-empty',      num: '2',    label: '대화없을때' },
  { id: 'chat-new',        num: '3',    label: '대화 처음 시작시' },
  { id: 'chat-start',      num: '4',    label: '대화' },
  { id: 'chat',            num: '5',    label: '대화' },
  { id: 'chat-list',       num: '6',    label: '대화 목록' },
  { id: 'chat-list-pin',   num: '7',    label: '고정' },
  { id: 'chat-menu',       num: '8',    label: '햄버거 누르고 나서' },
  { id: 'chat-rename',     num: '9',    label: '대화방명 바꾸기' },
  { id: 'chat-delete',     num: '10',   label: '채팅방 삭제' },
  { id: 'attend',          num: '출첵', label: '출석체크' },
  { id: 'attend-done',     num: '출첵', label: '해바라기씨 받은 후' },
  { id: 'fortune',         num: '운세', label: '오늘의 운세' }
];
