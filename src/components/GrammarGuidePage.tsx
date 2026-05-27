import { useState } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import {
  grammarGuide,
  GRAMMAR_LEVELS,
  getGrammarByLevel,
  type GrammarLevel,
  type GrammarGuideItem,
} from '../data/grammar-guide';

// ── Level color config ────────────────────────────────────────────────────────
const LEVEL_COLORS: Record<GrammarLevel, {
  tab: string; tabActive: string; badge: string; accent: string; exBg: string; exText: string; exSub: string;
}> = {
  'TOPIK 1급': {
    tab: 'text-sky-500 border-sky-500',
    tabActive: 'bg-sky-500 text-white',
    badge: 'bg-sky-100 text-sky-700',
    accent: 'bg-sky-400',
    exBg: 'bg-sky-50',
    exText: 'text-sky-800',
    exSub: 'text-sky-400',
  },
  'TOPIK 2급': {
    tab: 'text-blue-500 border-blue-500',
    tabActive: 'bg-blue-500 text-white',
    badge: 'bg-blue-100 text-blue-700',
    accent: 'bg-blue-400',
    exBg: 'bg-blue-50',
    exText: 'text-blue-800',
    exSub: 'text-blue-400',
  },
  'TOPIK 3급': {
    tab: 'text-emerald-500 border-emerald-500',
    tabActive: 'bg-emerald-500 text-white',
    badge: 'bg-emerald-100 text-emerald-700',
    accent: 'bg-emerald-400',
    exBg: 'bg-emerald-50',
    exText: 'text-emerald-800',
    exSub: 'text-emerald-400',
  },
  'TOPIK 4급': {
    tab: 'text-amber-500 border-amber-500',
    tabActive: 'bg-amber-500 text-white',
    badge: 'bg-amber-100 text-amber-700',
    accent: 'bg-amber-400',
    exBg: 'bg-amber-50',
    exText: 'text-amber-800',
    exSub: 'text-amber-400',
  },
  'TOPIK 5급': {
    tab: 'text-orange-500 border-orange-500',
    tabActive: 'bg-orange-500 text-white',
    badge: 'bg-orange-100 text-orange-700',
    accent: 'bg-orange-400',
    exBg: 'bg-orange-50',
    exText: 'text-orange-800',
    exSub: 'text-orange-400',
  },
  'TOPIK 6급': {
    tab: 'text-rose-500 border-rose-500',
    tabActive: 'bg-rose-500 text-white',
    badge: 'bg-rose-100 text-rose-700',
    accent: 'bg-rose-400',
    exBg: 'bg-rose-50',
    exText: 'text-rose-800',
    exSub: 'text-rose-400',
  },
};

const LEVEL_LABELS: Record<GrammarLevel, string> = {
  'TOPIK 1급': 'TOPIK I',
  'TOPIK 2급': 'TOPIK I',
  'TOPIK 3급': 'TOPIK II',
  'TOPIK 4급': 'TOPIK II',
  'TOPIK 5급': 'TOPIK II',
  'TOPIK 6급': 'TOPIK II',
};

// ── Grammar Card ──────────────────────────────────────────────────────────────
function GrammarCard({ item, colors }: { item: GrammarGuideItem; colors: typeof LEVEL_COLORS[GrammarLevel] }) {
  const { speak } = useSpeech();

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
      <div className="flex items-stretch">
        {/* Colored left accent bar */}
        <div className={`w-1 shrink-0 ${colors.accent}`} />

        <div className="flex-1 p-4">
          {/* Pattern + badge row */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-base font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl">
              {item.pattern}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
              {item.topikLevel}
            </span>
          </div>

          {/* Explanation */}
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.explanation}</p>

          {/* Example sentence */}
          <div className={`${colors.exBg} rounded-xl p-3`}>
            <div className="flex items-start gap-2">
              <button
                onClick={() => speak(item.example)}
                className="w-6 h-6 shrink-0 rounded-full bg-white flex items-center justify-center text-xs shadow-sm hover:scale-110 transition-transform"
                title="朗讀例句"
              >
                🔊
              </button>
              <div>
                <p className={`text-sm font-medium ${colors.exText}`}>{item.example}</p>
                <p className={`text-xs mt-0.5 ${colors.exSub}`}>{item.exampleTranslation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function GrammarGuidePage() {
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel>('TOPIK 1급');
  const [search, setSearch] = useState('');

  const items = search.trim()
    ? grammarGuide.filter(g =>
        g.pattern.includes(search) ||
        g.explanation.includes(search) ||
        g.example.includes(search)
      )
    : getGrammarByLevel(selectedLevel);

  const colors = LEVEL_COLORS[selectedLevel];
  const isSearching = search.trim().length > 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-black text-gray-900">TOPIK 文法指南</h2>
        <p className="text-sm text-gray-400 mt-0.5">1급 ~ 6급・共 {grammarGuide.length} 個文法點・附例句</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜尋文法型（如 으면）或中文說明…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-400 focus:outline-none text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Level tabs — hidden when searching */}
      {!isSearching && (
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {GRAMMAR_LEVELS.map(level => {
            const c = LEVEL_COLORS[level];
            const count = getGrammarByLevel(level).length;
            const isActive = selectedLevel === level;
            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                  isActive
                    ? `${c.tabActive} border-transparent shadow-sm`
                    : `bg-white ${c.tab} hover:opacity-80`
                }`}
              >
                {level.replace('TOPIK ', '')}
                <span className={`ml-1.5 text-xs font-normal ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Level info banner — hidden when searching */}
      {!isSearching && (
        <div className={`${colors.exBg} rounded-xl px-4 py-3 mb-4 flex items-center gap-3`}>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
            {LEVEL_LABELS[selectedLevel]}
          </span>
          <span className={`text-sm font-semibold ${colors.exText}`}>{selectedLevel}</span>
          <span className={`text-xs ml-auto ${colors.exSub}`}>{items.length} 個文法</span>
        </div>
      )}

      {/* Search result header */}
      {isSearching && (
        <div className="text-xs text-gray-400 mb-3">
          找到 <span className="font-bold text-gray-700">{items.length}</span> 個文法
        </div>
      )}

      {/* Grammar list */}
      <div className="space-y-3">
        {items.map((item, i) => {
          const c = isSearching ? LEVEL_COLORS[item.topikLevel as GrammarLevel] : colors;
          return (
            <div key={i}>
              {/* When searching, show level badge above each group transition */}
              {isSearching && (i === 0 || items[i - 1].topikLevel !== item.topikLevel) && (
                <div className={`text-xs font-bold mb-2 mt-4 px-1 ${c.exText}`}>
                  {item.topikLevel}
                </div>
              )}
              <GrammarCard item={item} colors={c} />
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-sm">找不到符合的文法</div>
          </div>
        )}
      </div>
    </div>
  );
}
