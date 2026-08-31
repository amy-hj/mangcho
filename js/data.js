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
  { id: 'r4', name: '목돈모으기 프로젝트',                at: '26.08.15',   avatar: ASSET.avatar3, pinned: false },
  { id: 'r5', name: '직장 내 인간관계에 대한 고민',       at: '26.08.15',   avatar: ASSET.avatar2, pinned: false }
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

/* 화면 인덱스 — 카테고리 : 화면이름 */
var SCREEN_INDEX = [
  { id: 'home',          cat: '주화면', label: '1 home' },
  { id: 'chat-empty',    cat: '주화면', label: '2 대화없을때' },
  { id: 'chat-new',      cat: '주화면', label: '3 대화 처음 시작시' },
  { id: 'chat-start',    cat: '주화면', label: '4 대화' },
  { id: 'chat',          cat: '주화면', label: '5 대화' },
  { id: 'chat-list',     cat: '주화면', label: '6 대화 목록' },
  { id: 'chat-list-pin', cat: '주화면', label: '7 고정' },
  { id: 'chat-menu',     cat: '주화면', label: '8 햄버거 누르고 나서' },
  { id: 'chat-rename',   cat: '주화면', label: '9 대화방명 바꾸기' },
  { id: 'chat-delete',   cat: '주화면', label: '10 채팅방 삭제' },
  { id: 'attend',        cat: '출첵',   label: '출석체크' },
  { id: 'attend-done',   cat: '출첵',   label: '해바라기씨 받은 후' },
  { id: 'fortune',       cat: '운세',   label: '오늘의 운세' }
];

/* ============================================================
   [PATCH 1] 시나리오 응답 엔진 — 키워드별 맥락 응답
   - 캐릭터별 말투: melang(F·둥글) / kochi(T·팩트)
   - kw 중 하나라도 포함되면 그 규칙의 응답(순서대로 여러 줄)
   - 아무것도 안 걸리면 DEFAULT_REPLIES 로테이션
   - 여기 한글만 고치면 응답이 바뀝니다. 코드 몰라도 OK.
   ============================================================ */
var RULES = [
  { kw: ['팀장', '상사', '부장', '과장'], topic: '회사',
    melang: ['헐… 팀장님이 또 그랬어? 츄', '그 말 듣고 기분이 어땠어? 화났어, 아니면 속상한 쪽이었어?'],
    kochi:  ['지난번에도 같은 얘기였지. 이번이 몇 번째야.', '정확히 뭐라고 했는데? 그대로 말해봐.'] },
  { kw: ['회사', '출근', '야근', '회의', '업무'], topic: '회사',
    melang: ['회사 얘기구나. 볼주머니 열어놨어, 천천히 말해줘.', '오늘 제일 힘 빠졌던 순간이 언제였어?'],
    kochi:  ['응. 듣고 있어. 계속해.', '제일 문제였던 건 사람이야, 일이야?'] },
  { kw: ['힘들', '지쳤', '우울', '피곤', '불안'], topic: '마음',
    melang: ['으으, 많이 힘들었구나… 이리 와서 앉아 츄.', '그 마음, 언제부터 그랬는지 기억나?'],
    kochi:  ['힘든 건 사실이야. 부정 안 할게.', '근데 작년 이맘때 너, 이거보다 큰 것도 넘겼어. 기억나?'] },
  { kw: ['좋아', '행복', '신나', '최고', '기뻐'], topic: '좋은 일',
    melang: ['오!! 좋은 일이다!! 츄츄!! 🎉', '그 순간 제일 기억에 남는 장면 하나만 말해줘. 볼주머니에 예쁘게 넣어둘게.'],
    kochi:  ['오. 이런 날도 있네.', '뭐가 제일 좋았는지 한 줄로 말해봐. 기록해둘게.'] },
  { kw: ['연애', '남친', '여친', '썸', '그 사람', '남자친구', '여자친구'], topic: '연애',
    melang: ['오호… 그 사람 얘기네? (귀 쫑긋)', '지금 그 관계에서 네가 제일 궁금한 건 뭐야?'],
    kochi:  ['그 사람 얘기 이번 달 세 번째야.', '먼저 연락한 적은 있어? 숫자만 물어보는 거야.'] },
  { kw: ['사주', '운세', '명반', '팔자'], topic: '사주',
    melang: ['네 명반 얘기! 그건 내 전문 분야야 츄.', '정식 풀이는 편지에 담아줄게. 우선 요즘 제일 답답한 게 뭔지 말해줘.'],
    kochi:  ['명반은 편지에서 제대로 봐줄게.', '지금은 네 얘기부터. 뭐가 궁금해서 왔어?'] },
  { kw: ['심심', '지루', '할 거 없'], topic: '수다',
    melang: ['심심하구나! 나도 방금까지 해바라기씨 세고 있었어. 백스물세 개야.', '오늘 뭐 먹었어? 그런 것부터 얘기하자.'],
    kochi:  ['심심하면 온 거야? 나쁘지 않네.', '그럼 오늘 있었던 일 아무거나 하나.'] }
];

var DEFAULT_REPLIES = {
  melang: [
    ['응응, 듣고 있어. 계속 말해줘 츄.', '그래서 어떻게 됐어?'],
    ['흐음… (볼주머니에 넣는 중)', '그 얘기 들으니까 네가 어떤 마음이었을지 궁금해.'],
    ['오늘 그 얘기를 나한테 해줘서 고마워.', '조금만 더 자세히 말해줄래? 언제, 어디서였어?']
  ],
  kochi: [
    ['응. 계속해.', '그래서?'],
    ['들었어. 기록해둘게.', '그때 네가 한 말은 뭐였어?'],
    ['알겠어.', '그 일이 처음이야, 반복이야?']
  ]
};
