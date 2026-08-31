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
