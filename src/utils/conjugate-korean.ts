// Korean conjugation engine
// Supports: 아요/어요 (present), 았/었어요 (past), -(으)ㄹ 거예요 (future)
// Irregular types: ㅂ, ㄷ, ㄹ, ㅡ, 르, ㅅ, ㅎ

export type WordType = 'verb' | 'adjective';
export type IrregularType = 'regular' | 'ㅂ' | 'ㄷ' | 'ㄹ' | 'ㅡ' | '르' | 'ㅅ' | 'ㅎ' | 'hada';

export interface KoreanWord {
  id: string;
  korean: string;       // 原形 e.g. 먹다
  meaning: string;      // 中文意思
  type: WordType;
  irregular: IrregularType;
  level: 'TOPIK1' | 'TOPIK2' | 'TOPIK3';
}

export interface ConjugationResult {
  presentPolite: string;    // 아요/어요체 現在式
  presentFormal: string;    // ㅂ니다/습니다 正式
  pastPolite: string;       // 았/었어요 過去式
  futurePolite: string;     // -(으)ㄹ 거예요 未來式
  modifierPresent: string;  // 修飾名詞現在 (-는 / -(으)ㄴ)
  modifierPast: string;     // 修飾名詞過去 (-(으)ㄴ / -던)
  modifierFuture: string;   // 修飾名詞未來 (-(으)ㄹ)
  stem: string;             // 去掉 다 的詞幹
}

// ── Hangul utilities ──────────────────────────────────────────────────────────

const ONSET  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const VOWEL  = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const CODA   = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function decompose(ch: string): [string, string, string] | null {
  const code = ch.charCodeAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return null;
  const coda  = code % 28;
  const vowel = ((code - coda) / 28) % 21;
  const onset = Math.floor((code - coda) / 28 / 21);
  return [ONSET[onset], VOWEL[vowel], CODA[coda]];
}

function compose(onset: string, vowel: string, coda: string): string {
  const o = ONSET.indexOf(onset);
  const v = VOWEL.indexOf(vowel);
  const c = CODA.indexOf(coda);
  if (o < 0 || v < 0 || c < 0) return onset + vowel + coda;
  return String.fromCharCode(0xAC00 + o * 21 * 28 + v * 28 + c);
}

/** Returns the last syllable's coda (받침). '' means no coda. */
function getCoda(word: string): string {
  const last = word[word.length - 1];
  const d = decompose(last);
  return d ? d[2] : '';
}

/** Returns the last syllable's vowel */
function getLastVowel(word: string): string {
  const last = word[word.length - 1];
  const d = decompose(last);
  return d ? d[1] : '';
}

/** Replace last syllable's coda */
function setCoda(word: string, newCoda: string): string {
  const chars = [...word];
  const last = chars[chars.length - 1];
  const d = decompose(last);
  if (!d) return word;
  chars[chars.length - 1] = compose(d[0], d[1], newCoda);
  return chars.join('');
}

/** Add a coda to the last syllable (only if currently no coda) */
function addCoda(word: string, coda: string): string {
  return setCoda(word, coda);
}

// ── Vowel harmony helper ──────────────────────────────────────────────────────

const BRIGHT_VOWELS = new Set(['ㅏ', 'ㅗ', 'ㅘ']);

function isBright(vowel: string): boolean {
  return BRIGHT_VOWELS.has(vowel);
}

/** Pick 아 or 어 based on last vowel of stem */
function aOrEo(stem: string): '아' | '어' {
  const v = getLastVowel(stem);
  return isBright(v) ? '아' : '어';
}

// ── Contraction helpers ───────────────────────────────────────────────────────

/** 가 + 아요 → 가요 (same vowel contraction) */
function contractPresent(stem: string, suffix: '아요' | '어요'): string {
  const lastVowel = getLastVowel(stem);
  const coda = getCoda(stem);
  if (coda !== '') return stem + suffix; // has coda, no contraction

  // ㅏ stem + 아요 → stem + 요  (e.g. 가 + 아요 = 가요)
  if (lastVowel === 'ㅏ' && suffix === '아요') return stem + '요';
  // ㅗ + 아요 → 와요 (e.g. 오다 → 와요)
  if (lastVowel === 'ㅗ' && suffix === '아요') {
    const chars = [...stem];
    const d = decompose(chars[chars.length - 1])!;
    chars[chars.length - 1] = compose(d[0], 'ㅘ', '');
    return chars.join('') + '요';
  }
  // ㅜ + 어요 → 워요 (e.g. 배우다 → 배워요)
  if (lastVowel === 'ㅜ' && suffix === '어요') {
    const chars = [...stem];
    const d = decompose(chars[chars.length - 1])!;
    chars[chars.length - 1] = compose(d[0], 'ㅝ', '');
    return chars.join('') + '요';
  }
  // ㅣ + 어요 → 여요 → often contracted (마시다 → 마셔요)
  if (lastVowel === 'ㅣ' && suffix === '어요') {
    const chars = [...stem];
    const d = decompose(chars[chars.length - 1])!;
    chars[chars.length - 1] = compose(d[0], 'ㅕ', '');
    return chars.join('') + '요';
  }
  // ㅓ + 어요 → eo contraction (서다 → 서요)
  if ((lastVowel === 'ㅓ' || lastVowel === 'ㅔ') && suffix === '어요') return stem + '요';
  // 되다 → 돼요
  if (lastVowel === 'ㅚ' && suffix === '어요') {
    const chars = [...stem];
    const d = decompose(chars[chars.length - 1])!;
    chars[chars.length - 1] = compose(d[0], 'ㅘ', '');
    return chars.join('') + '요'; // 돼요
  }

  return stem + suffix;
}

/** Same contraction for past tense suffix 았/었어요 */
function contractPast(stem: string, suffix: '았어요' | '었어요'): string {
  const lastVowel = getLastVowel(stem);
  const coda = getCoda(stem);

  if (coda !== '') return stem + suffix;

  if (lastVowel === 'ㅏ' && suffix === '았어요') return stem + '쓰어요' === stem ? stem + suffix : setCoda(stem, 'ㅆ') + '어요';
  // 가 + 았어요 → 갔어요
  if (lastVowel === 'ㅏ' && suffix === '았어요') return setCoda(stem, 'ㅆ') + '어요';
  if (lastVowel === 'ㅗ' && suffix === '았어요') {
    // 오 + 았 → 왔
    const chars = [...stem];
    const d = decompose(chars[chars.length - 1])!;
    chars[chars.length - 1] = compose(d[0], 'ㅘ', 'ㅆ');
    return chars.join('') + '어요';
  }
  if (lastVowel === 'ㅜ' && suffix === '었어요') {
    const chars = [...stem];
    const d = decompose(chars[chars.length - 1])!;
    chars[chars.length - 1] = compose(d[0], 'ㅝ', 'ㅆ');
    return chars.join('') + '어요';
  }
  if (lastVowel === 'ㅣ' && suffix === '었어요') {
    const chars = [...stem];
    const d = decompose(chars[chars.length - 1])!;
    chars[chars.length - 1] = compose(d[0], 'ㅕ', 'ㅆ');
    return chars.join('') + '어요';
  }
  if ((lastVowel === 'ㅓ' || lastVowel === 'ㅔ') && suffix === '었어요') return setCoda(stem, 'ㅆ') + '어요';

  return stem + suffix;
}

// ── Main conjugation function ─────────────────────────────────────────────────

export function conjugateKorean(word: KoreanWord): ConjugationResult {
  const stem = word.korean.slice(0, -1); // remove 다
  const coda = getCoda(stem);
  const hasCoda = coda !== '';
  const ae = aOrEo(stem);

  // ── 하다 verbs ──
  if (word.irregular === 'hada') {
    const base = stem.slice(0, -2); // remove 하다, keep prefix e.g. 공부
    return {
      stem,
      presentPolite:   base + '해요',
      presentFormal:   base + '합니다',
      pastPolite:      base + '했어요',
      futurePolite:    base + '할 거예요',
      modifierPresent: base + (word.type === 'adjective' ? '한' : '하는'),
      modifierPast:    base + '한',
      modifierFuture:  base + '할',
    };
  }

  // ── ㄹ irregular: ㄹ drops before ㄴ, ㅂ, ㅅ ──
  if (word.irregular === 'ㄹ') {
    // stem for ㄹ verbs ends with ㄹ coda e.g. 살다 → stem = 살
    // drop ㄹ for formal: 삽니다
    const stemDropL = setCoda(stem, ''); // 살 → 사
    const presentV = contractPresent(stem, ae === '아' ? '아요' : '어요');
    const pastV = contractPast(stem, ae === '아' ? '았어요' : '었어요');
    return {
      stem,
      presentPolite:   presentV,
      presentFormal:   stemDropL + '습니다', // 사 + ㅂ니다 — actually 삽니다
      pastPolite:      pastV,
      futurePolite:    stem + ' 거예요', // 살 + ㄹ → 살 거예요
      modifierPresent: word.type === 'adjective' ? stem.slice(0,-1) + setCoda(stem[stem.length-1], 'ㄴ') + '' : stem + '는',
      modifierPast:    stem + '았던', // simplified
      modifierFuture:  stem + '',
    };
  }

  // ── ㅂ irregular ──
  if (word.irregular === 'ㅂ') {
    // Remove ㅂ coda from stem → add 우
    const stemNoB = setCoda(stem, '');
    const withU = stemNoB + '우';
    // vowel harmony: 돕다 → 도와요 (ㅗ→와), others → 워요
    const lastV = getLastVowel(stemNoB);
    const presentP = isBright(lastV) && lastV === 'ㅗ'
      ? stemNoB.slice(0, -1) + compose(decompose(stemNoB[stemNoB.length-1])![0], 'ㅘ', '') + '요'
      : withU + '어요';
    const pastP = isBright(lastV) && lastV === 'ㅗ'
      ? stemNoB.slice(0, -1) + compose(decompose(stemNoB[stemNoB.length-1])![0], 'ㅘ', 'ㅆ') + '어요'
      : setCoda(withU, 'ㅆ') + '어요';
    const adjModifier = stemNoB + compose('ㅇ', 'ㅜ', 'ㄴ'); // 추운
    return {
      stem,
      presentPolite:   presentP,
      presentFormal:   stem.slice(0,-1) + compose(decompose(stem[stem.length-1])![0], decompose(stem[stem.length-1])![1], '') + '습니다',
      pastPolite:      pastP,
      futurePolite:    withU + 'ㄹ 거예요',
      modifierPresent: word.type === 'adjective' ? adjModifier : withU + '는',
      modifierPast:    withU + '었던',
      modifierFuture:  withU + 'ㄹ',
    };
  }

  // ── ㄷ irregular ──
  if (word.irregular === 'ㄷ') {
    // ㄷ → ㄹ before vowel
    const stemL = setCoda(stem, 'ㄹ'); // 듣 → 들
    const presentP = contractPresent(stemL, '어요');
    const pastP    = contractPast(stemL, '었어요');
    return {
      stem,
      presentPolite:   presentP,
      presentFormal:   stem + '습니다',
      pastPolite:      pastP,
      futurePolite:    stemL + '을 거예요',
      modifierPresent: word.type === 'adjective' ? stemL + '은' : stemL + '는',
      modifierPast:    stemL + '은',
      modifierFuture:  stemL + '을',
    };
  }

  // ── ㅡ irregular ──
  if (word.irregular === 'ㅡ') {
    const withoutEu = stem.slice(0, -1);
    const chars = [...stem];
    const lastChar = chars[chars.length - 1];
    const lastD = decompose(lastChar);
    // lastD vowel should be ㅡ
    // If single char (쓰) withoutEu is empty, new syllable = compose with 아/어
    let newStem: string;
    if (withoutEu === '') {
      // 으 only, look at nothing → use 어 (default)
      newStem = compose(lastD![0], 'ㅓ', '');
    } else {
      const prevVowel = getLastVowel(withoutEu);
      const pick = isBright(prevVowel) ? 'ㅏ' : 'ㅓ';
      newStem = withoutEu + compose(lastD![0], pick, '');
    }
    return {
      stem,
      presentPolite:   newStem + '요',
      presentFormal:   stem + '습니다', // 쓰다 → 씁니다 (drop ㅡ before ㅂ)
      pastPolite:      setCoda(newStem, 'ㅆ') + '어요',
      futurePolite:    stem + 'ㄹ 거예요',
      modifierPresent: word.type === 'adjective' ? setCoda(newStem, 'ㄴ') : stem + '는',
      modifierPast:    setCoda(newStem, 'ㄴ'),
      modifierFuture:  stem + 'ㄹ',
    };
  }

  // ── 르 irregular ──
  if (word.irregular === '르') {
    // 르: 모르다 → 몰라요. Remove 르, add ㄹ to prev syllable, then 라/러요
    const withoutReu = stem.slice(0, -1); // 모르→모, 부르→부르... 모르: chars=[모,르], slice(-1)=모
    // add ㄹ coda to prev syllable
    const prevStemWithL = addCoda(withoutReu, 'ㄹ'); // 모→몰
    const prevV = getLastVowel(withoutReu);
    const ending = isBright(prevV) ? '라' : '러';
    const presentP = prevStemWithL + ending + '요';
    const pastPCorrect = setCoda(prevStemWithL + ending, 'ㅆ') + '어요';
    return {
      stem,
      presentPolite:   presentP,
      presentFormal:   stem + '습니다',
      pastPolite:      pastPCorrect,
      futurePolite:    stem.slice(0,-1) + setCoda(stem[stem.length-1], '') + 'ㄹ 거예요',
      modifierPresent: word.type === 'adjective' ? prevStemWithL + ending.replace('라','란').replace('러','런') : stem + '는',
      modifierPast:    prevStemWithL + ending + 'ㄴ',
      modifierFuture:  stem.slice(0,-1) + setCoda(stem[stem.length-1],'') + 'ㄹ',
    };
  }

  // ── ㅅ irregular ──
  if (word.irregular === 'ㅅ') {
    // ㅅ drops before vowel: 짓다 → 지 + 어요 → 지어요
    const stemNoS = setCoda(stem, ''); // 짓→지
    const presentP = contractPresent(stemNoS, ae === '아' ? '아요' : '어요');
    const pastP    = contractPast(stemNoS, ae === '아' ? '았어요' : '었어요');
    return {
      stem,
      presentPolite:   presentP,
      presentFormal:   stem + '습니다',
      pastPolite:      pastP,
      futurePolite:    stemNoS + '을 거예요',
      modifierPresent: word.type === 'adjective' ? stemNoS + '은' : stemNoS + '는',
      modifierPast:    stemNoS + '은',
      modifierFuture:  stemNoS + '을',
    };
  }

  // ── ㅎ irregular (color adjectives) ──
  if (word.irregular === 'ㅎ') {
    // 파랗다 → 파래요. ㅎ drops, and vowel changes:
    // -(으)ㄴ: 파란 (ㅎ drops, no special ending)
    // 아요/어요: ㅎ drops + contraction → 하얗다→하여요→해요? Actually:
    // 파랗 + 아요 → 파라 + 아요 → 파래요 (ㅏ+ㅏ → ㅐ)
    // 노랗 + 아요 → 노라 + 아요 → 노래요
    // 빨갛 + 아요 → 빨가 + 아요 → 빨개요
    const stemNoH = setCoda(stem, ''); // 파랗→파라
    // merge last vowel + 아 → ㅐ
    const chars = [...stemNoH];
    const last = chars[chars.length - 1];
    const d = decompose(last);
    let presentBase: string;
    if (d) {
      // ㅏ → ㅐ, ㅗ → 봐... for ㅎ irr, typically ㅏ→ㅐ
      const newVowel = d[1] === 'ㅏ' ? 'ㅐ' : d[1] === 'ㅗ' ? 'ㅚ' : 'ㅔ';
      chars[chars.length - 1] = compose(d[0], newVowel, d[2]);
      presentBase = chars.join('');
    } else {
      presentBase = stemNoH;
    }
    return {
      stem,
      presentPolite:   presentBase + '요',
      presentFormal:   stem + '습니다',
      pastPolite:      setCoda(presentBase, 'ㅆ') + '어요',
      futurePolite:    stemNoH + 'ㄹ 거예요',
      modifierPresent: stemNoH + 'ㄴ', // 파란
      modifierPast:    stemNoH + 'ㄴ',
      modifierFuture:  stemNoH + 'ㄹ',
    };
  }

  // ── Regular conjugation ────────────────────────────────────────────────────
  // Present polite
  const suffix  = ae === '아' ? '아요' : '어요';
  const pSuffix = ae === '아' ? '았어요' : '었어요';
  const presentPolite = contractPresent(stem, suffix);
  const pastPolite    = contractPast(stem, pSuffix);

  // Formal present: no coda → ㅂ니다, has coda → 습니다
  const presentFormal = hasCoda ? stem + '습니다' : addCoda(stem, 'ㅂ') + '니다';

  // Future: no coda → ㄹ 거예요, has coda → 을 거예요
  const futurePolite = hasCoda ? stem + '을 거예요' : addCoda(stem, 'ㄹ') + ' 거예요';

  // Modifier forms
  let modifierPresent: string;
  let modifierPast: string;
  let modifierFuture: string;

  if (word.type === 'adjective') {
    // Adj present modifier: -(으)ㄴ
    modifierPresent = hasCoda ? stem + '은' : addCoda(stem, 'ㄴ');
    modifierPast    = hasCoda ? stem + '았던' : setCoda(stem, 'ㅆ') + '던';  // simplified
    modifierFuture  = hasCoda ? stem + '을' : addCoda(stem, 'ㄹ');
  } else {
    // Verb present modifier: -는
    modifierPresent = stem + '는';
    // Verb past modifier: -(으)ㄴ
    modifierPast    = hasCoda ? stem + '은' : addCoda(stem, 'ㄴ');
    modifierFuture  = hasCoda ? stem + '을' : addCoda(stem, 'ㄹ');
  }

  return { stem, presentPolite, presentFormal, pastPolite, futurePolite, modifierPresent, modifierPast, modifierFuture };
}

// ── Form display metadata ─────────────────────────────────────────────────────

export type FormKey = keyof Omit<ConjugationResult, 'stem'>;

export interface FormInfo {
  key: FormKey;
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
  usage: string;
}

export const FORMS: FormInfo[] = [
  { key: 'presentPolite',   label: '現在式',  sublabel: '아요/어요체', color: 'text-blue-600',   bgColor: 'bg-blue-50 border-blue-200',   usage: '日常尊敬語・最通用' },
  { key: 'presentFormal',   label: '正式體',  sublabel: 'ㅂ니다/습니다', color: 'text-indigo-600', bgColor: 'bg-indigo-50 border-indigo-200', usage: '新聞・正式場合' },
  { key: 'pastPolite',      label: '過去式',  sublabel: '았/었어요',   color: 'text-violet-600', bgColor: 'bg-violet-50 border-violet-200', usage: '已完成的動作' },
  { key: 'futurePolite',    label: '未來式',  sublabel: '(으)ㄹ 거예요', color: 'text-emerald-600',bgColor: 'bg-emerald-50 border-emerald-200',usage: '打算・推測' },
  { key: 'modifierPresent', label: '修飾現在',sublabel: '-는/-(으)ㄴ', color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-200', usage: '修飾名詞（現在/習慣）' },
  { key: 'modifierPast',    label: '修飾過去',sublabel: '-(으)ㄴ/-던', color: 'text-rose-600',   bgColor: 'bg-rose-50 border-rose-200',   usage: '修飾名詞（已完成）' },
  { key: 'modifierFuture',  label: '修飾未來',sublabel: '-(으)ㄹ',    color: 'text-cyan-600',   bgColor: 'bg-cyan-50 border-cyan-200',   usage: '修飾名詞（將要）' },
];

export function getIrregularLabel(t: IrregularType): string {
  const map: Record<IrregularType, string> = {
    regular: '規則變化',
    'ㅂ': 'ㅂ 不規則',
    'ㄷ': 'ㄷ 不規則',
    'ㄹ': 'ㄹ 不規則',
    'ㅡ': 'ㅡ 不規則',
    '르': '르 不規則',
    'ㅅ': 'ㅅ 不規則',
    'ㅎ': 'ㅎ 不規則',
    hada: '하다 動詞',
  };
  return map[t];
}

export function getIrregularRule(t: IrregularType): string {
  const map: Record<IrregularType, string> = {
    regular: '依照標準規則變化',
    'ㅂ': '母音語尾前 ㅂ → 우（偶爾→오）',
    'ㄷ': '母音語尾前 ㄷ → ㄹ',
    'ㄹ': '遇 ㄴ/ㅂ/ㅅ 語尾時 ㄹ 脫落',
    'ㅡ': '母音語尾前 ㅡ 脫落，依前音節母音決定아/어',
    '르': 'ㅡ 脫落 + 前音節加 ㄹ 收音，再接 라/러',
    'ㅅ': '母音語尾前 ㅅ 脫落',
    'ㅎ': '母音語尾前 ㅎ 脫落，母音發生縮合變化',
    hada: '하다 → 해요（현재）/ 했어요（과거）',
  };
  return map[t];
}

export function randomFormKey(): FormKey {
  const keys: FormKey[] = ['presentPolite','presentFormal','pastPolite','futurePolite','modifierPresent','modifierPast','modifierFuture'];
  return keys[Math.floor(Math.random() * keys.length)];
}
