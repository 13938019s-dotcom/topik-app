import { useState, useMemo, useRef, useEffect } from 'react';
import { koreanWords } from '../data/korean-words';
import {
  conjugateKorean,
  FORMS,
  getIrregularLabel,
  getIrregularRule,
  randomFormKey,
  type KoreanWord,
  type IrregularType,
  type WordType,
  type FormKey,
} from '../utils/conjugate-korean';

type View = 'list' | 'detail' | 'quiz' | 'guide';

// ── Color maps ────────────────────────────────────────────────────────────────

const IRREGULAR_COLORS: Record<IrregularType, { bg: string; text: string; border: string; dot: string }> = {
  regular: { bg: 'bg-gray-100',    text: 'text-gray-600',    border: 'border-gray-300',    dot: 'bg-gray-400' },
  'ㅂ':    { bg: 'bg-rose-100',    text: 'text-rose-700',    border: 'border-rose-300',    dot: 'bg-rose-500' },
  'ㄷ':    { bg: 'bg-orange-100',  text: 'text-orange-700',  border: 'border-orange-300',  dot: 'bg-orange-500' },
  'ㄹ':    { bg: 'bg-blue-100',    text: 'text-blue-700',    border: 'border-blue-300',    dot: 'bg-blue-500' },
  'ㅡ':    { bg: 'bg-violet-100',  text: 'text-violet-700',  border: 'border-violet-300',  dot: 'bg-violet-500' },
  '르':    { bg: 'bg-purple-100',  text: 'text-purple-700',  border: 'border-purple-300',  dot: 'bg-purple-500' },
  'ㅅ':    { bg: 'bg-amber-100',   text: 'text-amber-700',   border: 'border-amber-300',   dot: 'bg-amber-500' },
  'ㅎ':    { bg: 'bg-pink-100',    text: 'text-pink-700',    border: 'border-pink-300',    dot: 'bg-pink-500' },
  hada:    { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', dot: 'bg-emerald-500' },
};

const TYPE_COLORS: Record<WordType, { bg: string; text: string }> = {
  verb:      { bg: 'bg-sky-100',  text: 'text-sky-700' },
  adjective: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700' },
};

// ── Badges ────────────────────────────────────────────────────────────────────

function IrregularBadge({ type }: { type: IrregularType }) {
  const c = IRREGULAR_COLORS[type];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {getIrregularLabel(type)}
    </span>
  );
}

function TypeBadge({ type }: { type: WordType }) {
  const c = TYPE_COLORS[type];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${c.bg} ${c.text}`}>
      {type === 'verb' ? '動詞' : '形容詞'}
    </span>
  );
}

// ── Conjugation Table ─────────────────────────────────────────────────────────

function ConjugationTable({ word }: { word: KoreanWord }) {
  const result = conjugateKorean(word);
  return (
    <div className="mt-4 rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs">
            <th className="text-left px-4 py-2 font-semibold w-24">形式</th>
            <th className="text-left px-4 py-2 font-semibold">變化形</th>
            <th className="text-left px-4 py-2 font-semibold hidden sm:table-cell">用法</th>
          </tr>
        </thead>
        <tbody>
          {FORMS.map((f, i) => (
            <tr key={f.key} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
              <td className="px-4 py-3">
                <span className={`font-bold text-sm ${f.color}`}>{f.label}</span>
                <div className="text-xs text-gray-400">{f.sublabel}</div>
              </td>
              <td className="px-4 py-3">
                <span className="font-bold text-base text-gray-800">{result[f.key]}</span>
              </td>
              <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">{f.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Detail View ───────────────────────────────────────────────────────────────

function DetailView({ word, onBack, onQuiz }: { word: KoreanWord; onBack: () => void; onQuiz: () => void }) {
  const ic = IRREGULAR_COLORS[word.irregular];
  return (
    <div>
      <button onClick={onBack} className="text-gray-400 hover:text-gray-700 flex items-center gap-1 text-sm transition-colors mb-6">
        ← 返回列表
      </button>

      <div className={`rounded-2xl border-2 ${ic.border} ${ic.bg} p-5 mb-2`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-4xl font-black text-gray-900">{word.korean}</div>
            <div className="text-lg font-medium text-gray-600 mt-1">{word.meaning}</div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <TypeBadge type={word.type} />
            <IrregularBadge type={word.irregular} />
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600 bg-white/60 rounded-xl px-3 py-2">
          <span className="font-semibold">變化規則：</span>{getIrregularRule(word.irregular)}
        </div>
      </div>

      <ConjugationTable word={word} />

      <button
        onClick={onQuiz}
        className="mt-4 w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-sm"
      >
        用這個單字練習測驗
      </button>
    </div>
  );
}

// ── Quiz View ─────────────────────────────────────────────────────────────────

function QuizView({ quizWords, onBack }: { quizWords: KoreanWord[]; onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [formKey, setFormKey] = useState<FormKey>(() => randomFormKey());
  const [answer, setAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, [index, formKey]);

  const word = quizWords[index % quizWords.length];
  const result = conjugateKorean(word);
  const correct = result[formKey];
  const formInfo = FORMS.find(f => f.key === formKey)!;

  const handleSubmit = () => {
    if (revealed) return;
    const ok = answer.trim() === correct;
    setIsCorrect(ok);
    setRevealed(true);
    setScore(s => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
  };

  const handleNext = () => {
    setIndex(i => i + 1);
    setFormKey(randomFormKey());
    setAnswer('');
    setRevealed(false);
    setIsCorrect(null);
  };

  const accuracy = score.total > 0 ? Math.round((score.right / score.total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-700 text-sm transition-colors">
          ← 返回
        </button>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">正確 <span className="font-bold text-emerald-600">{score.right}</span> / {score.total}</span>
          {score.total > 0 && (
            <span className={`font-bold ${accuracy >= 70 ? 'text-emerald-600' : 'text-rose-500'}`}>{accuracy}%</span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/50 p-6 mb-5">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
          第 {score.total + 1} 題
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl font-black text-gray-900">{word.korean}</span>
          <div>
            <div className="text-gray-600 text-sm">{word.meaning}</div>
            <div className="flex gap-1 mt-1">
              <TypeBadge type={word.type} />
              <IrregularBadge type={word.irregular} />
            </div>
          </div>
        </div>
        <div className={`mt-2 text-base font-bold ${formInfo.color}`}>
          「{word.korean}」的 <span className="underline decoration-2">{formInfo.label}（{formInfo.sublabel}）</span> 是？
        </div>
      </div>

      {!revealed ? (
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && answer && handleSubmit()}
            placeholder="輸入韓文活用形…"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg font-medium"
          />
          <button
            onClick={handleSubmit}
            disabled={!answer}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors"
          >
            確認
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`rounded-xl p-4 border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'}`}>
            {isCorrect ? (
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-lg">
                <span>✓</span><span>正確！{correct}</span>
              </div>
            ) : (
              <div>
                <div className="text-rose-600 font-bold mb-1">✗ 不正確</div>
                <div className="text-gray-700">你的答案：<span className="line-through text-gray-400">{answer}</span></div>
                <div className="text-gray-900 font-bold mt-1">正解：<span className="text-rose-700 text-lg">{correct}</span></div>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
            <div className="text-xs font-semibold text-gray-400 mb-2">全部活用形</div>
            <div className="grid grid-cols-2 gap-1.5">
              {FORMS.map(f => (
                <div key={f.key} className={`rounded-lg px-2 py-1.5 border text-xs ${f.key === formKey ? f.bgColor : 'bg-white border-gray-100'}`}>
                  <div className={`font-bold ${f.key === formKey ? f.color : 'text-gray-500'}`}>{f.label}</div>
                  <div className={`font-medium ${f.key === formKey ? 'text-gray-900' : 'text-gray-600'}`}>{result[f.key]}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            下一題 →
          </button>
        </div>
      )}
    </div>
  );
}

// ── Irregular Guide ───────────────────────────────────────────────────────────

const IRREGULAR_GUIDE: {
  type: IrregularType;
  rule: string;
  examples: { word: string; meaning: string; before: string; after: string }[];
}[] = [
  {
    type: 'ㅂ',
    rule: '母音語尾前 ㅂ → 우（돕다 等少數 → 오）',
    examples: [
      { word: '춥다', meaning: '冷', before: '춥 + 어요', after: '추워요' },
      { word: '맵다', meaning: '辣', before: '맵 + 어요', after: '매워요' },
      { word: '어렵다', meaning: '難', before: '어렵 + 어요', after: '어려워요' },
      { word: '쉽다', meaning: '容易', before: '쉽 + 어요', after: '쉬워요' },
      { word: '돕다', meaning: '幫助', before: '돕 + 아요', after: '도와요' },
    ],
  },
  {
    type: 'ㄷ',
    rule: '母音語尾前 ㄷ → ㄹ',
    examples: [
      { word: '듣다', meaning: '聽', before: '듣 + 어요', after: '들어요' },
      { word: '걷다', meaning: '走路', before: '걷 + 어요', after: '걸어요' },
      { word: '묻다', meaning: '問', before: '묻 + 어요', after: '물어요' },
    ],
  },
  {
    type: 'ㄹ',
    rule: '語尾以 ㄴ/ㅂ/ㅅ 開頭時，ㄹ 脫落',
    examples: [
      { word: '살다', meaning: '住', before: '살 + ㅂ니다', after: '삽니다' },
      { word: '알다', meaning: '知道', before: '알 + ㄴ', after: '아는' },
      { word: '만들다', meaning: '做', before: '만들 + ㅂ니다', after: '만듭니다' },
    ],
  },
  {
    type: 'ㅡ',
    rule: '母音語尾前 ㅡ 脫落，由前音節母音決定接 아/어',
    examples: [
      { word: '쓰다', meaning: '寫', before: '쓰 + 어요', after: '써요' },
      { word: '크다', meaning: '大', before: '크 + 어요', after: '커요' },
      { word: '예쁘다', meaning: '漂亮', before: '예쁘 + 어요', after: '예뻐요' },
      { word: '바쁘다', meaning: '忙', before: '바쁘 + 어요', after: '바빠요' },
    ],
  },
  {
    type: '르',
    rule: 'ㅡ 脫落 + 前音節補 ㄹ 收音，再接 라/러',
    examples: [
      { word: '모르다', meaning: '不知道', before: '모르 + 아요', after: '몰라요' },
      { word: '부르다', meaning: '唱/叫', before: '부르 + 어요', after: '불러요' },
      { word: '다르다', meaning: '不同', before: '다르 + 아요', after: '달라요' },
    ],
  },
  {
    type: 'ㅅ',
    rule: '母音語尾前 ㅅ 脫落',
    examples: [
      { word: '짓다', meaning: '蓋/做', before: '짓 + 어요', after: '지어요' },
      { word: '낫다', meaning: '痊癒', before: '낫 + 아요', after: '나아요' },
    ],
  },
  {
    type: 'ㅎ',
    rule: '母音語尾前 ㅎ 脫落，母音縮合（ㅏ→ㅐ等）',
    examples: [
      { word: '파랗다', meaning: '藍', before: '파랗 + 아요', after: '파래요' },
      { word: '노랗다', meaning: '黃', before: '노랗 + 아요', after: '노래요' },
      { word: '빨갛다', meaning: '紅', before: '빨갛 + 아요', after: '빨개요' },
    ],
  },
];

function IrregularGuide() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
        <h3 className="font-black text-blue-800 text-base mb-1">不規則變化觸發條件</h3>
        <p className="text-blue-700 text-sm">大多數不規則變化都在遇到「<strong>母音開頭的語尾</strong>」（如 아요/어요、았/었어요）時才會觸發。</p>
      </div>

      {IRREGULAR_GUIDE.map(g => {
        const c = IRREGULAR_COLORS[g.type];
        return (
          <div key={g.type} className={`rounded-2xl border-2 ${c.border} overflow-hidden`}>
            <div className={`${c.bg} px-4 py-3 flex items-center gap-2`}>
              <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
              <span className={`font-black text-base ${c.text}`}>{getIrregularLabel(g.type)}</span>
            </div>
            <div className="px-4 py-3 bg-white">
              <p className="text-sm text-gray-600 mb-3">{g.rule}</p>
              <div className="space-y-2">
                {g.examples.map(ex => (
                  <div key={ex.word} className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="font-bold text-gray-800 w-16 shrink-0">{ex.word}</span>
                    <span className="text-gray-400 text-xs">{ex.meaning}</span>
                    <span className="text-gray-400 ml-auto text-xs">{ex.before}</span>
                    <span className="text-gray-400">→</span>
                    <span className={`font-bold ${c.text}`}>{ex.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* 동사 vs 형용사 modifier table */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3">
          <h3 className="font-black text-gray-800 text-base">動詞 vs 形容詞 修飾名詞對比</h3>
          <p className="text-gray-500 text-xs mt-0.5">搞清楚「-는」和「-(으)ㄴ」的區別</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs border-t border-gray-100">
                <th className="px-4 py-2 text-left font-semibold">時態</th>
                <th className="px-4 py-2 text-left font-semibold text-sky-600">動詞</th>
                <th className="px-4 py-2 text-left font-semibold text-fuchsia-600">形容詞</th>
                <th className="px-4 py-2 text-left font-semibold hidden sm:table-cell">範例</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tense: '現在', verb: '-는', adj: '-(으)ㄴ', ex: '먹는 사람 / 좋은 사람' },
                { tense: '過去', verb: '-(으)ㄴ', adj: '-던 / -았던', ex: '먹은 음식 / 좋던 날' },
                { tense: '未來', verb: '-(으)ㄹ', adj: '-(으)ㄹ', ex: '먹을 것 / 좋을 것' },
              ].map((row, i) => (
                <tr key={row.tense} className={`border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-3 font-bold text-gray-700">{row.tense}</td>
                  <td className="px-4 py-3 font-bold text-sky-600">{row.verb}</td>
                  <td className="px-4 py-3 font-bold text-fuchsia-600">{row.adj}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">{row.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Word List ─────────────────────────────────────────────────────────────────

function WordList({ onSelect }: { onSelect: (w: KoreanWord) => void }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | WordType>('all');
  const [irregularFilter, setIrregularFilter] = useState<'all' | IrregularType>('all');

  const filtered = useMemo(() => koreanWords.filter(w => {
    if (typeFilter !== 'all' && w.type !== typeFilter) return false;
    if (irregularFilter !== 'all' && w.irregular !== irregularFilter) return false;
    if (search) {
      const s = search.trim();
      return w.korean.includes(s) || w.meaning.includes(s);
    }
    return true;
  }), [search, typeFilter, irregularFilter]);

  const irregularOptions: { value: 'all' | IrregularType; label: string }[] = [
    { value: 'all',     label: '全部' },
    { value: 'regular', label: '規則' },
    { value: 'hada',    label: '하다' },
    { value: 'ㅂ',      label: 'ㅂ' },
    { value: 'ㄷ',      label: 'ㄷ' },
    { value: 'ㄹ',      label: 'ㄹ' },
    { value: 'ㅡ',      label: 'ㅡ' },
    { value: '르',      label: '르' },
    { value: 'ㅅ',      label: 'ㅅ' },
    { value: 'ㅎ',      label: 'ㅎ' },
  ];

  return (
    <div>
      <div className="relative mb-3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜尋單字或中文意思"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:outline-none text-sm"
        />
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {(['all', 'verb', 'adjective'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              typeFilter === t
                ? t === 'all' ? 'bg-gray-800 text-white border-gray-800'
                  : t === 'verb' ? 'bg-sky-100 text-sky-700 border-sky-300'
                  : 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {t === 'all' ? '全部詞性' : t === 'verb' ? '動詞' : '形容詞'}
          </button>
        ))}
      </div>

      {/* Irregular filter */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {irregularOptions.map(o => {
          const c = o.value !== 'all' ? IRREGULAR_COLORS[o.value] : null;
          return (
            <button
              key={o.value}
              onClick={() => setIrregularFilter(o.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                irregularFilter === o.value
                  ? c ? `${c.bg} ${c.text} ${c.border}` : 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 mb-3">{filtered.length} 個單字</div>

      <div className="space-y-2">
        {filtered.map(word => {
          const ic = IRREGULAR_COLORS[word.irregular];
          return (
            <button
              key={word.id}
              onClick={() => onSelect(word)}
              className="w-full text-left bg-white rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all px-4 py-3 flex items-center gap-3"
            >
              <div className={`w-1 self-stretch rounded-full ${ic.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">{word.korean}</span>
                  <span className="text-sm text-gray-500">{word.meaning}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <TypeBadge type={word.type} />
                <IrregularBadge type={word.irregular} />
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">找不到符合的單字</div>
        )}
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export function KoreanConjugationPage() {
  const [view, setView] = useState<View>('list');
  const [selectedWord, setSelectedWord] = useState<KoreanWord | null>(null);
  const [quizWords, setQuizWords] = useState<KoreanWord[]>([]);

  const startQuiz = (pool?: KoreanWord[]) => {
    const words = pool ?? koreanWords;
    setQuizWords([...words].sort(() => Math.random() - 0.5));
    setView('quiz');
  };

  if (view === 'detail' && selectedWord) {
    return (
      <DetailView
        word={selectedWord}
        onBack={() => setView('list')}
        onQuiz={() => startQuiz([selectedWord])}
      />
    );
  }

  if (view === 'quiz') {
    return <QuizView quizWords={quizWords} onBack={() => setView('list')} />;
  }

  if (view === 'guide') {
    return (
      <div>
        <button onClick={() => setView('list')} className="text-gray-400 hover:text-gray-700 flex items-center gap-1 text-sm transition-colors mb-6">
          ← 返回列表
        </button>
        <h2 className="text-xl font-black text-gray-900 mb-1">不規則變化指南</h2>
        <p className="text-sm text-gray-400 mb-5">7 種常見不規則 + 動詞形容詞修飾對比</p>
        <IrregularGuide />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-gray-900">動詞・形容詞活用</h2>
          <p className="text-sm text-gray-400 mt-0.5">現在・過去・未來・修飾形・不規則變化</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('guide')}
            className="px-3 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors text-xs"
          >
            不規則指南
          </button>
          <button
            onClick={() => startQuiz()}
            className="px-3 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-xs shadow-sm"
          >
            全單字測驗
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
        {(['regular', 'hada', 'ㅂ', 'ㄷ', 'ㄹ', 'ㅡ', '르', 'ㅅ', 'ㅎ'] as IrregularType[]).map(t => {
          const c = IRREGULAR_COLORS[t];
          return (
            <div key={t} className="flex items-center gap-1 text-xs text-gray-600">
              <span className={`w-2 h-2 rounded-full ${c.dot}`} />
              {getIrregularLabel(t)}
            </div>
          );
        })}
      </div>

      <WordList onSelect={w => { setSelectedWord(w); setView('detail'); }} />
    </div>
  );
}
