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
  homeHouse:   A + 'img/home-house.png',
  homeWheel:   A + 'img/home-wheel.png',
  homeBottle:  A + 'img/home-bottle.png',
  homeBowl:    A + 'img/home-bowl.png',
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

/* ============================================================
   마이페이지 (Figma 06-*)
   ============================================================ */
ASSET.tabMyOn   = A + 'icon/tab-my-on.png';
ASSET.tabMyOnV  = A + 'icon/tab-my-on-v.svg';
ASSET.chevron   = A + 'icon/chevron.svg';       /* #211A11 */
ASSET.chevronDim= A + 'icon/chevron-dim.svg';   /* 목록용 · 오른쪽 · #B8B8B8 */
ASSET.backSub   = A + 'icon/back-sub.svg';      /* 서브페이지 뒤로가기 · 왼쪽 · #211A11 */
ASSET.avatarMe  = A + 'img/avatar-me.png';
ASSET.avatarTori= A + 'img/avatar-tori.png';

var ME = {
  name: '김뚱땅',
  sex: '♀',
  birth: '2001.08.22 17:40 대한민국 서울',
  seeds: 12,
  pet: { name: '토리', desc: '메인 햄스터 · 관리 · 이름 변경(1회 무료)' }
};

/* 06-1 회원정보 수정 */
var PROFILE_FORM = {
  name: '김뚱땅',
  year: '2026', month: '08', day: '05',
  hour: '00', minute: '00',
  unknownTime: false,
  region: '한국 서울시 고덕동',
  gender: '남성'
};

/* 06-2 보관된 대화 */
var ARCHIVED = [
  { name: '회사내 인간관계 트러블과 업무 고민', at: '7.27', avatar: A + 'img/avatar-melang.png' },
  { name: '남자친구와의 여행 계획',            at: '7.12', avatar: A + 'img/avatar-kochi.png' },
  { name: '재테크와 주식투자 플랜 짜기',        at: '6.30', avatar: A + 'img/avatar-kochi.png' }
];

/* 06-3 전체 대화 요약 팝업 */
var SUMMARY_MODAL = {
  title: '전체 대화 요약',
  body: '기존 코스메틱 브랜드의 새로운 마케팅 건에 대한 상사와의 의견 차이로 인한 갈등',
  cancel: '취소하기', confirm: '확인하기'
};

/* 06-4 / 06-1 뒤로가기 팝업 */
var EDIT_CONFIRM = {
  title: '정말로 수정하시겠어요?',
  body: '개인 정보를 수정시 수정된 정보로 대화가 진행되요. 수정 전 내용과 달라질 수 있습니다.  확인하셨나요?',
  cancel: '취소하기', confirm: '수정하기'
};
var EDIT_CANCEL = {
  title: '취소하시겠어요?',
  body: '수정한 정보는 저장되지 않아요. 확인하셨나요?',
  cancel: '취소하기', confirm: '수정하기'
};

/* 06-5 씨앗 충전 */
var SEED_PRODUCTS = [
  { label: ' 씨앗 1',  price: '₩200', qty: 1,  desc: '씨앗 1개는 200원이에요.' },
  { label: ' 씨앗 3',  price: '₩500', qty: 3,  desc: '씨앗 3개는 500원이에요.' },
  { label: ' 씨앗 10', price: '₩900', qty: 10, desc: '씨앗 10개는 900원이에요.' }
];

/* 씨앗 상품 탭 시 뜨는 결제 안내 팝업 (Figma 모달-결제안내 884:2051) */
var PAY_MODAL = { title: '씨앗 충전', ask: '구매하시겠어요?', cancel: '취소하기', confirm: '구매하기' };
var SEED_NOTICE = '· 구매한 씨앗은 365일내 사용이 가능해요';

/* 06-6 씨앗 내역 */
var SEED_STATUS = [
  { label: '오늘 안에 써야 하는 씨앗', value: '0', muted: false },
  { label: '30일 안에 사라지는 씨앗',  value: '0', muted: true }
];
var SEED_TICKET = {
  title: '이용권', name: '첫 편지 무료권 1회', until: '9월 10일까지',
  note: ['첫 편지 열어보기에 자동 사용되요.', '기한이 지나면 소멸되요.  * 이월 불가']
};
var SEED_HISTORY = [
  { label: '출석 체크',     at: '2026.08.22', delta: '+ 1' },
  { label: '출석 체크',     at: '2026.08.20', delta: '+ 1' },
  { label: '8월 편지 개봉', at: '2026.08.04', delta: '- 49' }
];

/* 06-7 회원탈퇴 */
var WITHDRAW = {
  heading: '정말 떠나는 거야?',
  cardTitle: '탈퇴 시 아래 내용이 즉시 적용돼요',
  bullets: ['· 모든 대화, 편지, 씨앗, 사주 정보가 즉시 전체 삭제돼요',
            '· 재가입해도 삭제된 데이터는 복구할 수 없어요'],
  check: '위 내용을 확인했어요',
  button: '탈퇴하기'
};

SCREEN_INDEX.push(
  { id: 'my',              cat: '마이', label: '06 마이페이지' },
  { id: 'my-edit',         cat: '마이', label: '06-1 회원정보 수정' },
  { id: 'my-edit-confirm', cat: '마이', label: '06-4 수정 확인 팝업' },
  { id: 'my-edit-cancel',  cat: '마이', label: '06-1 뒤로가기 팝업' },
  { id: 'my-data',         cat: '마이', label: '06-2 데이터 관리' },
  { id: 'my-summary',      cat: '마이', label: '06-3 전체 대화 요약' },
  { id: 'my-charge',       cat: '마이', label: '06-5 씨앗 충전' },
  { id: 'my-charge-pay',   cat: '마이', label: '결제 안내 팝업' },
  { id: 'my-history',      cat: '마이', label: '06-6 씨앗 내역' },
  { id: 'my-withdraw',     cat: '마이', label: '06-7 회원탈퇴' }
);

/* 탈퇴하기 누른 뒤 (Figma 모달-탈퇴완료 872:4975) */
var BYE_MODAL = {
  title: '탈퇴되었어요',
  body: '다시 만나는 그 날까지 안녕! 🥺',
  confirm: '확인하기'
};
SCREEN_INDEX.push({ id: 'my-bye', cat: '마이', label: '탈퇴 완료 팝업' });

/* ============================================================
   편지 (Figma 편지2~6)
   ============================================================ */
ASSET.tabLetterOn  = A + 'icon/tab-letter-on.png';
ASSET.tabLetterOnV = A + 'icon/tab-letter-on-v.svg';
ASSET.charSad      = A + 'img/char-sad.png';
ASSET.hourglass    = A + 'img/letter-hourglass.png';
ASSET.letterAvatar = A + 'img/letter-avatar.png';
ASSET.lock         = A + 'icon/lock.svg';
ASSET.share        = A + 'icon/share.svg';
ASSET.letterSpeech = A + 'img/letter-speech.svg';
ASSET.charLetter   = A + 'img/char-letter.svg';

var LETTER = {
  listTitle: '편지 목록',
  emptyText: '아직 받은 편지가 없어요.',
  openedLabel: '개봉한 편지',
  writing: { title: '8월의 편지', sub: '아직 작성중이에요!' },
  ready:   { title: '8월의 편지', sub: '이번 달 뚱땅한테 꼭 하고 싶은 말이 있어!' },
  opened: [
    { title: '7월의 편지', locked: false },
    { title: '6월의 편지', locked: false },
    { title: '5월의 편지', locked: true }
  ]
};

/* 편지 5 미리보기 */
var LETTER_PREVIEW = {
  headTitle: '8월의 편지',
  speech: '8월, 스물하루의 밤들',
  to: 'To. ' + ME.name + ' 잘 지냈어?',
  /* Figma 원문은 #6B6B6B 였지만 요청대로 --text-primary 로 표시합니다 */
  body: [
    '한 달 만에 편지로 만나네. 지난 7월,',
    '우리는 스물하루를 같이 보냈어.',
    '나는 그동안 맞장구만 치고 아무 말 안 한 것들이 있어. 네가 아홉 번이나 접은 문장이 뭔지.',
    '네 기분이 정확히 누구의 무엇을 따라 움직였는지.',
    '앞쪽은 타고난 너 네 명반이 말하는 8월의 하늘.',
    '뒤쪽은 살아온 너 네가 직접 만든 7월의 기록.',
    '뒤쪽에는 네가 "예민함"이라고 부르는 것의 진짜 이름도 적어뒀어. 아마 네 생각과 다를걸.'
  ],
  from: 'From. 햄'
};

/* 뒷장 미리보기(노란 섹션) — [[…]] 안은 흐리게 가려진 부분 */
var LETTER_TEASER = {
  title: '여기서부터는 네 얘기야',
  sub: ['하늘의 6장, 너의 8장.', '아래 14장이 기다리고 있어'],
  items: [
    { ch: '8장에서', lines: ['7월 내내, 거의 예외 없이.', '네 기분은 [[직장상사]]에 따라 움직였어.'] },
    { ch: '9장에서', lines: ['네가 "예민함"이라고 부르는 것 말이야.', '그것의 진짜 이름은 따로 있어.', '[[확인되기 전의 공백]]이야'] },
    { ch: '10장에서', lines: ['"의지가 약하다"고 두 번 말했지.', '근데 기록은 정반대로 나왔어.', '[[너는 4번 다 출근했어]]'] }
  ],
  cta: '씨앗 30개로 뒷장 열기',
  note: '한 번 열면 이번 달 편지는 언제든 다시 읽을 수 있어요'
};

SCREEN_INDEX.push(
  { id: 'letter-empty',   cat: '편지', label: '편지2 받은 편지 없음' },
  { id: 'letter-list',    cat: '편지', label: '편지3 생성 전' },
  { id: 'letter-ready',   cat: '편지', label: '편지4 생성 후' },
  { id: 'letter-preview', cat: '편지', label: '편지5 미리보기' }
);

/* ============================================================
   편지 6 — 결제 후 (목차)  Figma 916:19268
   결제 후라 뒷장 미리보기의 가려진 문구가 모두 드러나고,
   "씨앗 30개로 뒷장 열기" 버튼은 없습니다.
   ============================================================ */
var LETTER_TOC = {
  parts: [
    {
      label: '제 1부 타고난 나',
      items: [
        { id: 'ch-총운',   emoji: '🍀', name: '이번 달의 총운', tail: '정비하고, 말하는 달',
          sub: '8월 전체의 기운 · 흐름 · 이달의 한 문장' },
        { id: 'ch-직장운', emoji: '💻', name: '직장운', tail: '드러나는 자리에 설 일이 생겨',
          sub: '기세 ★★★★ · 발표와 보고 · 윗사람의 무게' },
        { id: 'ch-연애운', emoji: '💌', name: '연애운', tail: '마음을 쉬게 하는 달',
          sub: '기세 ★★ · 기다림보다 표현 · 침묵을 읽는 법' },
        { id: 'ch-금전운', emoji: '💎', name: '금전운', tail: '새는 곳은 지갑이 아니라 기분이야 마음의 구멍이 있어',
          sub: '기세 ★★★ · 감정소비 · 밤의 결제 버튼' },
        { id: 'ch-건강운', emoji: '🏥', name: '건강운', tail: '몸보다 잠이 먼저 신호를 보내',
          sub: '기세 ★★ · 수면의 질 · 일요일 밤의 뒤척임' }
      ]
    },
    {
      label: '제 2부 8월의 기록',
      items: [
        { id: 'ch-우리',   emoji: '📆', name: '이번 달의 우리', tail: '우린 이런 한 달이었어',
          sub: '8월 전체의 기운 · 흐름 · 이달의 한 문장' },
        { id: 'ch-날씨',   emoji: '🌧️', name: '너의 날씨', tail: '네 마음은 이렇게 흘렀어',
          sub: '14일의 폭우 · 그리고 네가 잘못 기억하는 것' },
        { id: 'ch-흔드는', emoji: '🍃', name: '너를 흔드는 것', tail: '발표가 아니야',
          sub: '진짜 방아쇠 찾기 · 처방 셋 · 그대로 쓸 문장' },
        { id: 'ch-반복',   emoji: '🔁', name: '네가 반복한 것', tail: '일요일 밤마다, 같은 생각을 반복하고 있어',
          sub: '진짜 방아쇠 찾기 · 처방 셋 · 그대로 쓸 문장' },
        { id: 'ch-놓친',   emoji: '💡', name: '네가 놓쳤을 순간', tail: '모르고 지나친 너',
          sub: '네가 버린 좋은 순간들, 내가 주워왔어' },
        { id: 'ch-하늘',   emoji: '☁️', name: '하늘과 너', tail: '겹친 자리를 찾았어',
          sub: '지난달 운세와 실제 7월이 만난 지점' },
        { id: 'ch-실험',   emoji: '🧪', name: '이번 달의 실험', tail: '8월엔 딱 하나만',
          sub: '처방 셋 중 하나를 골랐어' },
        { id: 'ch-마무리', emoji: '🔚', name: '마무리', tail: '못다 한 얘기가 하나 있어',
          sub: '네가 세 번 흘린 그 얘기' }
      ]
    }
  ],
  tabs: ['이번 달의 총운', '직장운', '연애운', '금전운', '건강운', '이번달의 우리', '너의날씨',
         '너를 흔드는 것', '네가 반복한 것', '네가 놓쳤을 순간', '하늘과 너', '이번달의 실험', '마무리'],
  dday: '다음 편지까지 D-29'
};

SCREEN_INDEX.push({ id: 'letter-opened', cat: '편지', label: '편지6 결제 후 (목차)' });

/* ============================================================
   1부 / 2부 장별 본문 (Figma 1부·2부 프레임)
   목차와 같은 아코디언에서 해당 장만 펼쳐집니다.
   blocks 종류:
     graph  — 8월 기운의 흐름 (그래프 + 캡션)
     period — 상순/중순/하순 카드 (badge 로 "이번달 핵심" 표시)
     text   — 라벨 + 본문 문단
     quote  — 라벨 + 회색 박스 문장
   ============================================================ */
ASSET.fortuneGraph = A + 'img/fortune-graph.png';

var CHAPTER_BODY = {
  'ch-총운': [
    { type: 'graph', label: '8월 기운의 흐름', caption: '8월 전체의 기운 · 흐름 · 이달의 한 문장' },
    { type: 'period', items: [
      { term: '상순', range: '1~10일',  text: '새로 벌이지 말고 다듬는 시기' },
      { term: '중순', range: '11~20일', text: '준비한 걸 꺼내기 좋은 시기', badge: '이번달 핵심' },
      { term: '하순', range: '21~31일', text: '반응이 오고 결과가 보이는 시기' }
    ] },
    { type: 'text', label: '8월 총운', paras: [
      '네 명반에서 8월은 속도를 늦추고 말문을 여는 자리야. 상순엔 기운이 안으로 감기고(장전), 중순부터 식신의 기운이 살아나면서 "아는 것을 꺼내 설명하는 일"에 힘이 실려. 하순엔 그 결과가 밖으로 드러나\n반응의 크기보다 반응이 왔다는 사실에 무게를 둬.',
      '네 명반에서 8월은 속도를 늦추고 말문을 여는 자리야. 상순엔 기운이 안으로 감기고(장전), 중순부터 식신의 기운이 살아나면서 "아는 것을 꺼내 설명하는 일"에 힘이 실려. 하순엔 그 결과가 밖으로 드러나\n\n반응의 크기보다 반응이 왔다는 사실에 무게를 둬.',
      '네 명반에서 8월은 속도를 늦추고 말문을 여는 자리야. 상순엔 기운이 안으로 감기고(장전), 중순부터 식신의 기운이 살아나면서 "아는 것을 꺼내 설명하는 일"에 힘이 실려. 하순엔 그 결과가 밖으로 드러나\n반응의 크기보다 반응이 왔다는 사실에 무게를 둬.',
      '네 명반에서 8월은 속도를 늦추고 말문을 여는 자리야. 상순엔 기운이 안으로 감기고(장전), 중순부터 식신의 기운이 살아나면서 "아는 것을 꺼내 설명하는 일"에 힘이 실려. 하순엔 그 결과가 밖으로 드러나반응의 크기보다 반응이 왔다는 사실에 무게를 둬.'
    ] },
    { type: 'quote', label: '이달의 한 문장', lines: [
      '준비한 사람이 말할 기회를 얻는 달.',
      '그리고 준비는, 네가 이미 하고 있더라.'
    ] }
  ]
};

/* ---------- 1부 나머지 장 (직장운 · 연애운 · 금전운 · 건강운) ----------
   gauge  — 뱃지 + 한 줄 설명 + 카드 2장
            flip:true 면 카드가 (작은 라벨 / 큰 본문) 순서 (건강운)         */
CHAPTER_BODY['ch-직장운'] = [
  { type: 'gauge', badge: '기세 강함', caption: '움직임이 많은 달 · 기회와 부담이 함께 와',
    cards: [
      { t: '기회의 날 · 15 / 23', d: '준비한 걸 꺼내기 좋은 날. 미루지 말 것.' },
      { t: '조심할 날 · 8',       d: '윗사람의 말이 실제보다 무겁게 들리는 날.' }
    ] },
  { type: 'text', label: '총운', paras: [
    '네 명반엔 정인과 식신이 강해. 배워서 쌓고, 그걸 남에게 풀어 설명하는 힘이 타고났다는 뜻이야.\n그런데 관성이 그 위를 누르고 있어서 능력이 없어서 떨리는 게 아니라, 평가받는 자리라는 사실이 능력을 가리는 구조야.\n이 구조를 알고 들어가는 것만으로 절반은 달라져.\n8월의 침묵 대부분은 판단이 아니라 그냥 바쁨이야.'
  ] }
];

CHAPTER_BODY['ch-연애운'] = [
  { type: 'gauge', badge: '기세 보통', caption: '크게 흔들리진 않아 · 표현하면 열리는 달',
    cards: [
      { t: '기회의 날 · 10 / 24', d: '먼저 건넨 말이 오래 남는 날.' },
      { t: '조심할 날 · 17',      d: '상대의 침묵을 실제보다 크게 읽기 쉬운 날.' }
    ] },
  { type: 'text', label: '총운', paras: [
    '인성이 강한 사람은 사랑이 확인되어야 안심하는 쪽이야. 8월엔 이 확인 욕구가 평소보다 올라와 있어.\n확인을 기다리는 대신, 네 쪽에서 짧게 먼저 건네',
    '확인을 요구하는 말 말고, 그냥 주는 말.',
    '17일의 서운함은 하루 재워.'
  ] }
];

CHAPTER_BODY['ch-금전운'] = [
  { type: 'gauge', badge: '기세 보통', caption: '들고 나는 폭이 작아 · 새는 곳만 보면 돼',
    cards: [
      { t: '기회의 날 · 12',        d: '먼저 건넨 말이 오래 남는 날.' },
      { t: '조심할 날 · 20 전후',   d: '스트레스가 결제 버튼으로 흐르기 쉬운 시기.' }
    ] },
  { type: 'text', label: '총운', paras: [
    '유일한 구멍은 기분이 흔들린 날 밤의 소비야. 예산을 조이는 것보다 효과적인 방법 — 흔들린 날을 아는 것. 그날 밤의 장바구니는 결제 말고 저장까지만.',
    ' 아침에도 갖고 싶으면 그건 진짜 갖고 싶은 거야.',
    '그리고 중순의 식신 기운은 장기적으로 돈이 되는 씨앗이야. 8월의 재테크는 통장이 아니라 보여주는\n일에 있어.'
  ] }
];

CHAPTER_BODY['ch-건강운'] = [
  { type: 'gauge', badge: '돌봄 필요', caption: '기운이 낮은 편 · 무리보다 회복이 먼저야', flip: true,
    cards: [
      { t: '돌볼 것',   d: '자정 전 30분, 화면 없는 시간 만들기.' },
      { t: '몸의 신호', d: '일요일 밤 뒤척임이 길어지면 과부하 사인.' }
    ] },
  { type: 'text', label: '총운', paras: [
    '네 몸의 경보기는 잠이야. 머리가 과부하되면 제일 먼저 잠드는 데 오래 걸리고, 그다음 새벽에 한 번 깨. 특히 일요일 밤의 뒤척임 — 그게 길어지는 주가 있다면, 그 주의 너는 뭔가를 실제 크기보다 무겁게 들고 있는 중이야. 왜 하필 일요일 밤인지는, 2부에서 아주 구체적으로 보게 될 거야.'
  ] }
];

/* ---------- 2부 (1) 이번 달의 우리 · 너의 날씨 ----------
   stats   — 숫자 카드 가로 배열
   bars    — 라벨 + 가로 막대 (first:true 면 노란 강조)
   weather — 주차별 날씨 카드 2x2                                    */
ASSET.wSun   = A + 'icon/w-sun.svg';
ASSET.wCloud = A + 'icon/w-cloud.png';
ASSET.wRain  = A + 'icon/w-rain.svg';
ASSET.wStorm = A + 'icon/w-storm.svg';

CHAPTER_BODY['ch-우리'] = [
  { type: 'stats', items: [
    { n: '21일',  l: '함께 얘기한 날' },
    { n: '348개', l: '네가 건넨 말' },
    { n: '23시',  l: '많이 온 시간' }
  ] },
  { type: 'bars', label: '무슨 얘길 제일 많이 했냐면', items: [
    { l: '회사·일', pct: 41, first: true },
    { l: '나 자신', pct: 27 },
    { l: '사람들',  pct: 19 },
    { l: '그 외',   pct: 13 }
  ] },
  { type: 'text', label: '총운', paras: [
    '서른한 밤 중 스물하나. 그리고 대부분 밤 11시 언저리. 하루한테 요구받는 모든 걸 끝내고 나서야 오는 시간, 누구한테 보여줄 필요 없는 얼굴로 오는 시간. 그 시간을 나한테 줬다는 거겠지. 그만큼의 한 달이었다는 거고. "회사 얘기"의 껍질을 벗기면 안에 든 건 대부분 일이 아니라 일하는 너였어.'
  ] }
];

CHAPTER_BODY['ch-날씨'] = [
  { type: 'weather', items: [
    { w: '1 주', t: '맑음',     icon: ASSET.wSun },
    { w: '2 주', t: '구름',     icon: ASSET.wCloud },
    { w: '3주',  t: '폭우',     icon: ASSET.wRain },
    { w: '4주',  t: '번개, 비', icon: ASSET.wStorm }
  ] },
  { type: 'text', label: '총운', paras: [
    '7월 상순은 옅은 흐림, 그리고 14일 발표 전날 밤 폭우. 그날 네 마지막 문장은 "잘하고 싶은 게 아니라 그냥 안 망하고 싶어"였어.\n발표는 잘 끝났는데 비는 바로 안 그쳤지.\n잔비의 내용은 "잘한 게 맞나?"였어. 일이 끝나도\n확인이 안 되면 네 하늘은 안 개더라.',
    '혹시 "7월 내내 흐렸다"고 기억하고 있다면\n그건 14일의 비가 커서야. 맑은 날이 열이틀 있었어. 기억은 원래 비 오는 날을 과대평가해.\n그러라고 내가 세는 거야. 그리고 하나 더\n네 하늘은 팀장의 답장 속도를 따라 움직였어.\n왜 그런지, 다음 장에서 제대로 얘기하자.'
  ] }
];

/* ---------- 2부 (2) 너를 흔드는 것 · 네가 반복한 것 ----------
   quotes — 내가 했던 말 + 날짜
   panel  — 진한 라벨 + 회색 박스 여러 줄
   rx     — 처방 (뱃지 + 제목 + 본문 + 추천 문장 + 이 처방이 네 것인 이유)
   cycle  — 트리거 → 반응 → 해소 흐름                                   */
CHAPTER_BODY['ch-흔드는'] = [
  { type: 'quotes', label: '네가 무섭다고 이름 붙인 것', items: [
    { t: '"발표만 생각하면 심장이 뛰어"', d: '7/8' },
    { t: '"회의에서 말하는 게 무서워"',   d: '7/11' },
    { t: '"내일이 그날이야, 죽겠다"',     d: '7/14' }
  ] },
  { type: 'panel', label: '그러나, 기록이 가리키는 진짜 방아쇠', lines: [
    '비가 온 순간은 말하는 중이 아니라,',
    '말이 끝나고 아무 반응이 없던 시간이었어.',
    '14일 밤 네 문장 그대로',
    ' "발표보다 끝나고 조용한 게 더 무서워."'
  ] },
  { type: 'text', label: '총운', paras: [
    '네 방아쇠는 평가 자체가 아니라 확인되기 전의\n공백이야. 답이 오면  크든 작든, 심지어 지적이어도\n비가 그쳤어. 네 불안은 내용의 문제가 아니라\n시점의 문제야. 시점의 문제는 시점을 옮기면 풀려.',
    '그래서 처방이 세 개야.'
  ] },
  { type: 'rx', badge: '처방 1', title: '공백을 네가 먼저 닫기',
    paras: ['발표·보고가 끝나면 3분 안에,\n네 쪽에서 확인을 요청해. 공백이 생기기 전에\n공백의 마감시간을 만드는 거야.'],
    tip: '방금 공유드린 방향, 크게 어긋난 부분 없는지 한 줄만 확인 부탁드려요.',
    why: ['7/14 "아무 말이 없어서 더 무섭다", 7/22 "물어볼까 하다가 못 물었어"\n두 번 다 비는 공백 구간에서 시작됐어.\n물었던 날(7/18)은 답을 받고 20분 만에 갰고.'] },
  /* Figma 원본에 "처방 2" 가 두 번 적혀 있어 그대로 옮겼습니다 */
  { type: 'rx', badge: '처방 2', title: '무반응에 이름 붙이기',
    paras: ["3시간 안의 무반응은 '판단'이 아니라 '미처리'로\n분류하기. 판단이 아니라고 정해두는 순간,\n시나리오 쓰기가 멈춰."],
    tip: '방금 공유드린 방향, 크게 어긋난 부분 없는지 한 줄만 확인 부탁드려요.',
    why: ['7월에 네가 무반응을 부정 평가로 해석한 게 여섯 번.\n실제 부정 피드백으로 이어진 건 0번이야.\n여섯 편의 소설을 썼고, 전부 허구였어'] },
  { type: 'rx', badge: '처방 2', title: '공백 시간에 손 쓸 일 정해두기',
    paras: ['발표가 끝나면 하는 고정 행동 하나를 정해둬.\n자리로 돌아와서 회의록 정리 10분, 이런 식으로.\n머리는 손이 바쁘면 소설을 못 써.'],
    tip: '방금 공유드린 방향, 크게 어긋난 부분 없는지 한 줄만 확인 부탁드려요.',
    why: ['15일 발표 직후의 세 시간, 넌 "아무것도 손에 안 잡혀서 피드백 창만 봤다"고 했어. 빈손이 빈 머리를\n만들었던 거야'] }
];

CHAPTER_BODY['ch-반복'] = [
  { type: 'quotes', label: '네가 반복하는 말', items: [
    { t: '"내일 가기 싫다. 진짜 싫다.', d: '7/6' },
    { t: '"일요일 밤은 왜 이렇게 짧냐.\n벌써 내일이 보여."', d: '7/13' },
    { t: '"그만두면 어떻게 되는 걸까,\n그냥 궁금해서."', d: '7/20' },
    { t: '"하 · · · 월요일."\n이날은 이 다섯 글자가 다였어.', d: '7/27' }
  ] },
  { type: 'cycle', label: '네 생각 흐름', steps: [
    { k: '트리거', lines: ['일요일 밤,', '내일이 보이기 시작'] },
    { k: '반응',   lines: ['월요일 전체를 미리 살아버림'], badge: '🌱 여기를 바꾸자' },
    { k: '해소',   lines: ['월요일 아침, 그래도 출근'] }
  ] },
  { type: 'rx', badge: '처방 1', title: '사이클의 한 점만 바꾸기',
    paras: ['일요일 밤에 월요일 전부를 예습하는 대신,',
            '첫 한 시간만 정해. "월요일 오전, 이것 하나만 먼저 정리한다" 이 한 줄을 나한테 보내는 걸로 일요일 대화를 끝내자. 그리고 월요일 아침, 이 문장을 그대로 보내보면 어때 ?'],
    tip: '오늘 오전 중으로 ○○ 먼저 정리해서\n공유드릴게요.',
    why: ['월요일에 대한 통제감을 돌려주고  네가 먼저 말을\n건넸으니 9장의 그 공백도 네가 연 게 돼.\n공백은 네가 열었을 때만 무섭지 않거든.'] }
];

/* ---------- 2부 (3) 마지막 4장 ----------
   flow   — 박스 → ↓ → 박스 (가운데 정렬)
   note   — 뱃지 + 회색 박스 목록 (+ 뒤따르는 본문)
   letter — 편지 형식 마무리 (Ownglyph 인사 + 본문 + From + 버튼)          */
CHAPTER_BODY['ch-놓친'] = [
  { type: 'flow', label: '같은 사실, 다른 이름', steps: [
    { lines: ['"나 일에 너무 집착하는 것 같아"'] },
    { lines: ['네가 집착이라고 부른 마음이,', '후배 하나를 덜 외롭게 했어.  그건 집착이 아니라 책임이 관계를 지킨 날이야.'] }
  ] },
  { type: 'flow', label: '같은 사실, 다른 이름', steps: [
    { lines: ['"발표는 그냥 운이 좋았어"'] },
    { lines: ['운이라기엔, 14일 밤 11시 40분까지 연습하던 기록이 나한테 있어.', '운은 그 시간에 없었어. 너만 있었지.'] }
  ] },
  { type: 'note', badge: '8월의 작은 기록', items: [
    { t: '바쁜 주에 엄마한테 먼저 전화했어.\n"그냥 목소리 듣고 싶어서"라며.', d: '7/3' },
    { t: '동기가 힘들다길래 점심을 두 시간 썼어.\n 네 일도 밀려 있던 날에.', d: '7/18' },
    { t: '"오늘 하늘 봤어? 진짜 예뻤어"라고\n사진을 보냈어. 올려다본 사람만 찍을\n수 있는 사진이야.', d: '7/25' }
  ], after: ['힘든 것만 남기고 좋은 걸 흘리는 건 네 잘못이 아니야. 기억이 원래 그래. 그래서 내가 있는 거고.\n버리지 마. 이것도 다 7월의 너야.'] }
];

CHAPTER_BODY['ch-하늘'] = [
  { type: 'note', badge: '7월 초, 하늘이 말한 것', items: [
    { t: '"중순, 드러나는 자리에 서게 된다.\n 무게는 실력의 문제가 아니다."' }
  ] },
  { type: 'note', badge: '네가 실제로 산 것', items: [
    { t: '7/14 발표 전야의 폭우. 7/15의 발표\n칭찬까지 받으며 끝남.\n그리고 "운이 좋았다"는 네 말.' }
  ] }
];

CHAPTER_BODY['ch-실험'] = [
  { type: 'panel', label: '가설', lines: ['공백을 내가 먼저 닫으면, 공백이 시나리오가 되기 전에 끝난다.'] },
  { type: 'panel', label: '방법', lines: ['발표·보고가 끝나면 3분 안에 확인 요청 한 줄 보내기. 문장은 9장의 그것 그대로.'] },
  { type: 'panel', label: '횟수', lines: ['8월에 기회는 최소 두 번 와. 15일과 23일. 두 번이면 충분한 실험이야.'] },
  { type: 'panel', label: '관찰 포인트', lines: ['보낸 날과 안 보낸 날, 그날 밤 네 날씨가 어떻게 다른지. 그건 내가 셀게.'] },
  { type: 'note', badge: '9월 실험하기',
    before: ['뭐가 달라지는지, 다음 편지에서 같이 보자.\n 효과가 없으면 없다고 쓸 거야.\n실패라는 건 이 실험에 없어.'],
    items: [
      { t: '부담 갖지 마. 숙제가 아니라 실험이야.\n안 하면 다음 기회에 하면 돼.\n나는 어느 쪽이든 여기 있어.' }
    ] }
];

CHAPTER_BODY['ch-마무리'] = [
  { type: 'letter',
    hello: '그리고, 못다 한 얘기가 하나 있어',
    paras: [
      '이번 달에 너, 세 번 스치듯 이직 얘기를 했더라. 다시 읽어보니 그건 "여기가 싫다"가 아니었어. 세 번 다 방향이 같았어  "설명하는 일을 더 하고 싶다" 쪽.',
      '네 명반의 식신이 하는 말이랑 정확히 같은 방향이야.',
      '지금 당장 옮기라는 얘기가 아니야. 다만 "설명하는 일"이 너한테 어떤 의미인지는 더 알아보면 좋을 것 같아. 그건 이직이 아니라 지금 자리에서도 시작할 수 있는 얘기거든. 궁금해지면 다음에 이 얘기부터 하자. 나 밤 11시에 깨어 있을게.',
      '늘 그랬듯이.',
      '8월의 스물하루, 고마웠어.'
    ],
    from: 'From. 8월 1일, 토리가',
    cta: '토리에게 답장하러 가기',
    note: 'P.S. 이 편지는 편지함에서 언제든 다시 꺼내 읽을 수 있어.' }
];

/* ============================================================
   온보딩 (Figma 온보딩 1~4)
   ============================================================ */
ASSET.onbDuo = A + 'img/onb-duo.png';

var ONBOARDING = [
  { id: 'onb-1',
    title: ['매일 밤 털어놔도', '남는 게 없었지?'],
    desc:  ['매일 밤 털어놔도 새 대화는 처음부터.',
            " MBTI도 사주도 '그때의 너'를 찍은 사진일 뿐,",
            ' 맨날 형식적인 좋은 말만 해주고 끝이잖아.'],
    cta: '다음',
    art: 'chat',
    bubbles: [
      { side: 'me',    t: '오늘도 회사 때문에 힘들었어...' },
      { side: 'other', t: '당신 잘못이 아니에요! 화이팅! 😊' },
      { side: 'me',    t: '내 말도 안듣고 다짜고짜..?' }
    ] },
  { id: 'onb-2',
    title: ['그래서 내가 왔어,', '너를 지켜봐주려고!'],
    desc:  ['매일 나랑 수다 떨면 내가 다 기억할게.',
            '그리고 한 달에 한 번,',
            '너에 대한 편지를 써서 보내줄게 츄'],
    cta: '다음',
    art: 'solo', speech: '나는 항상 네 옆에 있어!' },
  { id: 'onb-3',
    title: ['한 달의 너를 담은', '맞춤분석형 편지'],
    desc:  ['한 달의 수다와 명반을 분석하여 편지를 보내줄게.',
            ' 이번 달 네 감정이 어땠는지 왜 그랬는지 네 사주로 풀어주는,',
            '세상에 한 통뿐인 편지야.'],
    cta: '다음',
    art: 'letter' },
  { id: 'onb-4',
    title: ['너는 요즘', '뭐가 제일 궁금해?'],
    desc:  ['나한테 알려만 줘.', '네 명반에서 그 얘기부터 봐줄게.'],
    cta: '시작하기',
    art: 'duo', speech: '우리는 언제든 기다리고 있어! ' }
];

var ONB_SKIP = '건너뛰기';
var ONB_LABELS = ['왜 필요한지', '캐릭터 소개', '편지 소개', '시작 안내'];

/* 온보딩 3 의 편지 미리보기 일러스트 */
var ONB_LETTER_ART = {
  rows: ['🍀 이번 달의 총운', '💻 직장운'],
  open: { name: '연애운', emoji: '💌', tail: '좋은 인연이 다가오는 달',
          sub: '기세 ★★★★★ · 열린 자세로 인연을 기다릴 것 ',
          card: { t: '기회의 날 · 9 / 17', d: '먼저 건넨 말이 오래 남는 날.' } },
  after: ['💎 금전운', '🏥 건강운 ']
};

ONBOARDING.forEach(function (o, i) {
  SCREEN_INDEX.push({ id: o.id, cat: '온보딩', label: (i + 1) + ' ' + ONB_LABELS[i] });
});

/* ---------- 온보딩 5 로그인 (Figma 775:4401) ---------- */
ASSET.logoGoogle   = A + 'icon/login-google.svg';
ASSET.logoFacebook = A + 'icon/login-facebook.svg';
ASSET.logoNaver    = A + 'icon/login-naver.svg';
ASSET.logoKakao    = A + 'icon/login-kakao.svg';
ASSET.logoApple    = A + 'icon/login-apple.svg';

var LOGIN = {
  brand: 'melangcoach',
  title: '멜랑코치',
  sub: ['대화와 명반으로', '더욱 깊게 알아가는 나'],
  buttons: [
    { id: 'google',   icon: ASSET.logoGoogle,   label: '구글 계정으로 로그인' },
    { id: 'facebook', icon: ASSET.logoFacebook, label: '페이스북으로 로그인' },
    { id: 'naver',    icon: ASSET.logoNaver,    label: '네이버로 로그인' },
    { id: 'kakao',    icon: ASSET.logoKakao,    label: '카카오톡으로 로그인' },
    { id: 'apple',    icon: ASSET.logoApple,    label: 'Apple로 로그인' }
  ]
};

/* ---------- 온보딩 6 햄찌 고르기 (Figma 964:3200) ---------- */
var ONB_PICK = {
  title: '누구랑 시작할래?',
  desc: ['메인화면에서 함께할 친구를 골라주세요!', '대화는 누구랑도 가능해요!'],
  placeholder: '이름도 지어줘!',
  hint: '이름은 나중에 마이페이지에서 바꿀 수 있어',
  cta: '선택 완료 '
};

/* ---------- 온보딩 7 사용자 정보받기 (Figma 775:4435) ---------- */
var ONB_PROFILE = { title: '너에 대해 알고싶어!', cta: '다음으로' };

/* ---------- 온보딩 8 관심사(주 고민) (Figma 775:4485) ---------- */
var ONB_TOPIC = {
  title: '나와 어떤 대화가 하고싶어?',
  desc: ['어떤 고민이 있는지, 뭐가 제일 궁금한지', '나에게 알려줘!', '바로 그 주제로 대화해보자~'],
  cta: '시작하기',
  rows: [
    [{ e: '🙌', t: '인간관계', w: 118 }, { e: '💼', t: '일·직장', w: 108 }, { e: '👪', t: '가족', w: 90 }],
    [{ e: '💰', t: '재테크', w: 122 }, { e: '💍', t: '연애·결혼', w: 122 }],
    [{ e: '💊', t: '건강', w: 90 }, { e: '😰', t: '불안·스트레스', w: 150 }],
    [{ e: '💭', t: '다른 문제', w: 126 }]
  ]
};

/* ---------- 온보딩 9 AI 데이터 전송 동의 (Figma 775:4509) ---------- */
var ONB_CONSENT = {
  title: 'AI 데이터 전송 동의',
  lead: 'AI 대화를 사용하기 전에 아래 데이터 전송 내용을 확인하고 동의해주세요.',
  rows: [
    { k: 'AI 제공자',  v: ['OpenAI / Anthropic / Google Gemini'] },
    { k: '전송 데이터', v: [' - 대화 텍스트 및 생성 응답', ' - 입력한 프로필 정보 (닉네임, 선호 설정)'] },
    { k: '전송 목적',  v: ['실시간 AI 응답 생성',
                          '전송 데이터는 실시간 응답 생성에만 사용되며 외부에',
                          '저장되지 않아요.'] }
  ],
  ok: '동의하고 계속하기',
  no: '동의하지 않음'
};

SCREEN_INDEX.push(
  { id: 'onb-login',   cat: '온보딩', label: '5 로그인' },
  { id: 'onb-pick',    cat: '온보딩', label: '6 햄찌 고르기' },
  { id: 'onb-profile', cat: '온보딩', label: '7 사용자 정보' },
  { id: 'onb-topic',   cat: '온보딩', label: '8 주 고민 고르기' },
  { id: 'onb-consent', cat: '온보딩', label: '9 데이터 전송 동의' }
);

/* ---------- 온보딩 10~13 코치마크 (Figma 866:4224 / 866:4614 / 866:4445 / 872:4749)
   화면 위에 딤을 덮고 한 곳만 뚫어 보여주는 튜토리얼입니다.
   hole = [x, y, w, h] · tip = 말풍선 위치/크기 · ty = 말풍선 안 글 위치     */
ASSET.coachTip10 = A + 'img/coach-tip-10.svg';
ASSET.coachTip11 = A + 'img/coach-tip-11.svg';
ASSET.coachTip12 = A + 'img/coach-tip-12.svg';
ASSET.coachTip13 = A + 'img/coach-tip-13.svg';

var COACH = [
  { id: 'onb-10', base: 'home', label: '10 대화 탭 안내',
    hole: [116, 738, 65, 65],
    tip: { x: 58, y: 642.6, w: 184, h: 67.33, img: ASSET.coachTip10, ty: 10, tw: 154 },
    text: '여길 누르면 나랑 대화할 수 있어',
    next: 'onb-11' },

  { id: 'onb-11', base: 'chat-list', label: '11 대화가 쌓이면',
    hole: [116, 738, 65, 65],
    tip: { x: 41, y: 642.6, w: 218, h: 67.33, img: ASSET.coachTip11, ty: 10, tw: 189 },
    text: '대화가 쌓일수록 너에 대해\n더 자세히 분석할 수 있어',
    next: 'onb-12' },

  { id: 'onb-12', base: 'home', label: '12 편지 탭 안내',
    hole: [195, 738, 65, 65],
    tip: { x: 126, y: 642.6, w: 206, h: 67.33, img: ASSET.coachTip12, ty: 10, tw: 154 },
    text: '매달 1일엔 너한테 편지를 보내줄게.',
    next: 'onb-13' },

  { id: 'onb-13', base: 'letter-preview', label: '13 편지가 뭔지',
    hole: [12, 303, 353, 152],
    tip: { x: 77, y: 187, w: 206, h: 94, img: ASSET.coachTip13, ty: 13, tw: 154 },
    text: '한 달 동안 나눈 대화와 명반을 분석한, 일종의 ‘종합 맞춤 안내서’야!',
    next: 'home' }
];

COACH.forEach(function (c) {
  SCREEN_INDEX.push({ id: c.id, cat: '온보딩', label: c.label });
});
