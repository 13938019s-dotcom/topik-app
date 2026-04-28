import { useState } from 'react';
import type { TopikLevel, WritingPractice } from '../types';
import { questionTypes, writingPractices } from '../data/writingData';
import { useWritingHistory } from '../hooks/useWritingHistory';
import { LevelBadge } from './LevelBadge';

type Section = 'guide' | 'practice' | 'mywork';

const LEVEL_FILTERS: { value: TopikLevel | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: '1-2', label: 'Lv.1-2' },
  { value: '3-4', label: 'Lv.3-4' },
  { value: '5-6', label: 'Lv.5-6' },
];

// ── Question Type Guide ──────────────────────────────────
function GuideSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-4">
        TOPIK 寫作（쓰기）分為 TOPIK I 和 TOPIK II 兩種等級，點擊題型查看詳細說明。
      </p>
      {questionTypes.map(qt => {
        const isOpen = expanded === qt.number;
        return (
          <div key={qt.number} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
            <button
              onClick={() => setExpanded(isOpen ? null : qt.number)}
              className="w-full text-left px-5 py-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-black text-gray-900">{qt.number}</span>
                  <span className="text-sm font-bold text-indigo-600">{qt.nameZh}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{qt.topikLevel}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">{qt.points}</span>
                  {qt.charRange && (
                    <span className="text-xs bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">{qt.charRange}</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 line-clamp-1">{qt.nameKr}</p>
              </div>
              <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{qt.description}</p>

                {qt.structure && (
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">文章結構</p>
                    <div className="flex gap-1 flex-wrap">
                      {qt.structure.map((s, i) => (
                        <span key={i} className="text-xs bg-indigo-50 text-indigo-700 rounded-lg px-2 py-1 font-medium">
                          {i + 1}. {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">應試技巧</p>
                  <ul className="space-y-1.5">
                    {qt.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Practice Editor ──────────────────────────────────────
function PracticeEditor({
  practice,
  onBack,
}: {
  practice: WritingPractice;
  onBack: () => void;
}) {
  const { getWriting, saveWriting, deleteWriting } = useWritingHistory();
  const saved = getWriting(practice.id);
  const [text, setText] = useState(saved?.content ?? '');
  const [showSamples, setShowSamples] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const charCount = text.length;

  const handleSave = () => {
    saveWriting(practice.id, practice.title, text);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDelete = () => {
    deleteWriting(practice.id);
    setText('');
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors">
        ‹ 返回練習題庫
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-gray-100 mb-4">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <LevelBadge level={practice.level} />
          <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">{practice.questionType}</span>
        </div>
        <h2 className="font-black text-gray-900 text-base">{practice.title}</h2>
      </div>

      {/* Instruction */}
      <div className="bg-amber-50 rounded-2xl p-4 mb-4 ring-1 ring-amber-100">
        <p className="text-xs font-bold text-amber-600 mb-2">題目說明</p>
        <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{practice.instruction}</p>
        {practice.context && (
          <div className="mt-3 bg-white rounded-xl p-3 ring-1 ring-amber-200">
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{practice.context}</p>
          </div>
        )}
        {practice.charRange && (
          <p className="text-xs text-amber-500 font-bold mt-2">字數要求：{practice.charRange}</p>
        )}
      </div>

      {/* Writing area */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 mb-4 overflow-hidden">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="在此輸入你的答案…"
          rows={10}
          className="w-full p-4 text-sm text-gray-800 resize-none outline-none leading-relaxed"
        />
        <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
          <span className={`text-xs font-bold ${charCount > 0 ? 'text-blue-500' : 'text-gray-300'}`}>
            {charCount} 字
          </span>
          <div className="flex gap-2">
            {saved && (
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                刪除紀錄
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="px-4 py-1.5 text-xs font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
            >
              {justSaved ? '✓ 已儲存' : '儲存作答'}
            </button>
          </div>
        </div>
      </div>

      {/* Sample Answers */}
      <div className="rounded-2xl ring-1 ring-gray-200 overflow-hidden">
        <button
          onClick={() => setShowSamples(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-bold text-sm text-gray-700">
            📋 參考範文（{practice.sampleAnswers.length} 份）
          </span>
          <span className={`text-gray-400 transition-transform ${showSamples ? 'rotate-90' : ''}`}>›</span>
        </button>

        {showSamples && (
          <div className="divide-y divide-gray-100">
            {practice.sampleAnswers.map((sa, i) => (
              <div key={i} className="bg-white px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    i === 0
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {i === 0 ? '⭐' : '📝'} {sa.authorLabel}
                  </span>
                </div>
                <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{sa.content}</p>
                {sa.note && (
                  <p className="mt-2 text-xs text-indigo-500 bg-indigo-50 rounded-lg px-3 py-2 leading-relaxed">
                    💡 {sa.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Practice List ────────────────────────────────────────
function PracticeSection() {
  const [filter, setFilter] = useState<TopikLevel | 'all'>('all');
  const [selected, setSelected] = useState<WritingPractice | null>(null);
  const { getWriting } = useWritingHistory();

  if (selected) {
    return <PracticeEditor practice={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = writingPractices.filter(p => filter === 'all' || p.level === filter);

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {LEVEL_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(p => {
          const saved = getWriting(p.id);
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="w-full text-left bg-white rounded-2xl px-5 py-4 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <LevelBadge level={p.level} />
                    <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">{p.questionType}</span>
                    {saved && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">✓ 已作答</span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.instruction}</p>
                </div>
                <span className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 mt-1">›</span>
              </div>
              <div className="flex gap-3 mt-3 text-xs text-gray-400">
                {p.charRange && <span>📏 {p.charRange}</span>}
                <span>📋 {p.sampleAnswers.length} 份範文</span>
                {saved && <span>✍️ {saved.content.length} 字</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── My Work ─────────────────────────────────────────────
function MyWorkSection() {
  const { writings, deleteWriting } = useWritingHistory();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (writings.length === 0) {
    return (
      <div className="text-center py-16 text-gray-300">
        <div className="text-5xl mb-3">✍️</div>
        <p className="font-bold">還沒有作答紀錄</p>
        <p className="text-sm mt-1">前往「練習題庫」完成題目後儲存</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {writings.map(w => {
        const isOpen = expanded === w.practiceId;
        const date = new Date(w.savedAt).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return (
          <div key={w.practiceId} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
            <button
              onClick={() => setExpanded(isOpen ? null : w.practiceId)}
              className="w-full text-left px-5 py-4 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-gray-900 text-sm">{w.practiceTitle}</p>
                <div className="flex gap-3 mt-1 text-xs text-gray-400">
                  <span>✍️ {w.content.length} 字</span>
                  <span>🕐 {date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={e => { e.stopPropagation(); deleteWriting(w.practiceId); }}
                  className="text-xs text-red-300 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                >
                  刪除
                </button>
                <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-gray-100 px-5 py-4">
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{w.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main WritingZone ─────────────────────────────────────
export function WritingZone() {
  const [section, setSection] = useState<Section>('guide');
  const { writings } = useWritingHistory();

  const SECTIONS: { id: Section; label: string }[] = [
    { id: 'guide', label: '📖 題型說明' },
    { id: 'practice', label: '✍️ 練習題庫' },
    { id: 'mywork', label: `📂 我的作答${writings.length > 0 ? ` (${writings.length})` : ''}` },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h2 className="text-lg font-black text-gray-900 mb-1">寫作專區</h2>
        <p className="text-sm text-gray-400">TOPIK 쓰기 題型解析・練習・範文參考</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-5">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              section === s.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {section === 'guide' && <GuideSection />}
      {section === 'practice' && <PracticeSection />}
      {section === 'mywork' && <MyWorkSection />}
    </div>
  );
}
