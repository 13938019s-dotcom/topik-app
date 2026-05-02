import type { KoreanWord } from '../utils/conjugate-korean';

export const koreanWords: KoreanWord[] = [
  // ── 規則動詞 ──────────────────────────────────────────────────────────────
  { id: 'gada',    korean: '가다',    meaning: '去',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'meoknda', korean: '먹다',    meaning: '吃',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'ikda',    korean: '읽다',    meaning: '讀',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'oda',     korean: '오다',    meaning: '來',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'boda',    korean: '보다',    meaning: '看',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'masida',  korean: '마시다',  meaning: '喝',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'manada',  korean: '만나다',  meaning: '見面',     type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'salda',   korean: '사다',    meaning: '買',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'jada',    korean: '자다',    meaning: '睡覺',     type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'anda',    korean: '앉다',    meaning: '坐',       type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'ilda',    korean: '일다',    meaning: '起',       type: 'verb',      irregular: 'regular', level: 'TOPIK2' },
  { id: 'batda',   korean: '받다',    meaning: '接收',     type: 'verb',      irregular: 'regular', level: 'TOPIK1' },
  { id: 'nolda',   korean: '놀다',    meaning: '玩',       type: 'verb',      irregular: 'ㄹ',      level: 'TOPIK1' },
  { id: 'mandulda',korean: '만들다',  meaning: '製作',     type: 'verb',      irregular: 'ㄹ',      level: 'TOPIK1' },
  { id: 'saldal',  korean: '살다',    meaning: '住・生活', type: 'verb',      irregular: 'ㄹ',      level: 'TOPIK1' },
  { id: 'aldo',    korean: '알다',    meaning: '知道',     type: 'verb',      irregular: 'ㄹ',      level: 'TOPIK1' },
  { id: 'yeolda',  korean: '열다',    meaning: '打開',     type: 'verb',      irregular: 'ㄹ',      level: 'TOPIK1' },

  // ── ㄷ 不規則動詞 ──────────────────────────────────────────────────────────
  { id: 'deudda',  korean: '듣다',    meaning: '聽',       type: 'verb',      irregular: 'ㄷ',      level: 'TOPIK1' },
  { id: 'mudda',   korean: '묻다',    meaning: '問',       type: 'verb',      irregular: 'ㄷ',      level: 'TOPIK2' },
  { id: 'geodda',  korean: '걷다',    meaning: '走路',     type: 'verb',      irregular: 'ㄷ',      level: 'TOPIK2' },

  // ── ㅂ 不規則動詞 ──────────────────────────────────────────────────────────
  { id: 'dopda',   korean: '돕다',    meaning: '幫助',     type: 'verb',      irregular: 'ㅂ',      level: 'TOPIK2' },

  // ── ㅅ 不規則動詞 ──────────────────────────────────────────────────────────
  { id: 'jitda',   korean: '짓다',    meaning: '蓋・做',   type: 'verb',      irregular: 'ㅅ',      level: 'TOPIK2' },
  { id: 'natda',   korean: '낫다',    meaning: '痊癒・好', type: 'verb',      irregular: 'ㅅ',      level: 'TOPIK2' },

  // ── 르 不規則動詞 ──────────────────────────────────────────────────────────
  { id: 'moreuda', korean: '모르다',  meaning: '不知道',   type: 'verb',      irregular: '르',      level: 'TOPIK1' },
  { id: 'bureuda', korean: '부르다',  meaning: '唱・叫',   type: 'verb',      irregular: '르',      level: 'TOPIK1' },
  { id: 'dareuda', korean: '다르다',  meaning: '不同',     type: 'adjective', irregular: '르',      level: 'TOPIK1' },

  // ── ㅡ 不規則動詞 ──────────────────────────────────────────────────────────
  { id: 'sseuda',  korean: '쓰다',    meaning: '寫・用',   type: 'verb',      irregular: 'ㅡ',      level: 'TOPIK1' },
  { id: 'kkeuda',  korean: '끄다',    meaning: '關掉',     type: 'verb',      irregular: 'ㅡ',      level: 'TOPIK1' },

  // ── 하다 動詞 ──────────────────────────────────────────────────────────────
  { id: 'gongbuhada', korean: '공부하다', meaning: '學習',   type: 'verb',    irregular: 'hada',    level: 'TOPIK1' },
  { id: 'iltaehada',  korean: '일하다',  meaning: '工作',   type: 'verb',    irregular: 'hada',    level: 'TOPIK1' },
  { id: 'undonghada', korean: '운동하다', meaning: '運動',   type: 'verb',    irregular: 'hada',    level: 'TOPIK1' },
  { id: 'yorishada',  korean: '요리하다', meaning: '做料理', type: 'verb',    irregular: 'hada',    level: 'TOPIK1' },
  { id: 'saranghada', korean: '사랑하다', meaning: '愛',     type: 'verb',    irregular: 'hada',    level: 'TOPIK1' },

  // ── 規則形容詞 ─────────────────────────────────────────────────────────────
  { id: 'johda',   korean: '좋다',    meaning: '好',       type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'keukhda', korean: '크다',    meaning: '大',       type: 'adjective', irregular: 'ㅡ',      level: 'TOPIK1' },
  { id: 'jageuda', korean: '작다',    meaning: '小',       type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'bissada', korean: '비싸다',  meaning: '貴',       type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'ssada',   korean: '싸다',    meaning: '便宜',     type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'manta',   korean: '많다',    meaning: '多',       type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'jeokta',  korean: '적다',    meaning: '少',       type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'gilta',   korean: '길다',    meaning: '長',       type: 'adjective', irregular: 'ㄹ',      level: 'TOPIK1' },
  { id: 'jalta',   korean: '짧다',    meaning: '短',       type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'ppareuda',korean: '빠르다',  meaning: '快',       type: 'adjective', irregular: '르',      level: 'TOPIK1' },
  { id: 'neuridda',korean: '느리다',  meaning: '慢',       type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'yeppeuda',korean: '예쁘다',  meaning: '漂亮',     type: 'adjective', irregular: 'ㅡ',      level: 'TOPIK1' },
  { id: 'isshda',  korean: '있다',    meaning: '有・在',   type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'eopda',   korean: '없다',    meaning: '沒有',     type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'massda',  korean: '맛있다',  meaning: '好吃',     type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'jamiissda',korean: '재미있다',meaning: '有趣',    type: 'adjective', irregular: 'regular', level: 'TOPIK1' },
  { id: 'himdulda',korean: '힘들다',  meaning: '辛苦',     type: 'adjective', irregular: 'ㄹ',      level: 'TOPIK1' },
  { id: 'bappda',  korean: '바쁘다',  meaning: '忙',       type: 'adjective', irregular: 'ㅡ',      level: 'TOPIK1' },

  // ── ㅂ 不規則形容詞 ────────────────────────────────────────────────────────
  { id: 'chupda',  korean: '춥다',    meaning: '冷',       type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK1' },
  { id: 'deopda',  korean: '덥다',    meaning: '熱',       type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK1' },
  { id: 'mapda',   korean: '맵다',    meaning: '辣',       type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK1' },
  { id: 'eoryeopda',korean:'어렵다',  meaning: '難',       type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK1' },
  { id: 'swipda',  korean: '쉽다',    meaning: '容易',     type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK1' },
  { id: 'gapkapda',korean: '가깝다',  meaning: '近',       type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK2' },
  { id: 'meollda', korean: '멀다',    meaning: '遠',       type: 'adjective', irregular: 'ㄹ',      level: 'TOPIK1' },
  { id: 'mugeupda',korean: '무겁다',  meaning: '重',       type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK2' },
  { id: 'gapyeobda',korean:'가볍다',  meaning: '輕',       type: 'adjective', irregular: 'ㅂ',      level: 'TOPIK2' },

  // ── ㅎ 不規則形容詞（顏色詞）──────────────────────────────────────────────
  { id: 'pararota', korean: '파랗다', meaning: '藍',       type: 'adjective', irregular: 'ㅎ',      level: 'TOPIK2' },
  { id: 'norata',   korean: '노랗다', meaning: '黃',       type: 'adjective', irregular: 'ㅎ',      level: 'TOPIK2' },
  { id: 'ppalkata', korean: '빨갛다', meaning: '紅',       type: 'adjective', irregular: 'ㅎ',      level: 'TOPIK2' },
  { id: 'hayata',   korean: '하얗다', meaning: '白',       type: 'adjective', irregular: 'ㅎ',      level: 'TOPIK2' },
  { id: 'geomata',  korean: '까맣다', meaning: '黑',       type: 'adjective', irregular: 'ㅎ',      level: 'TOPIK2' },
];
