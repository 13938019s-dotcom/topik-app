import { useState } from 'react';
import type { SavedGrammar, TopikLevel } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import { useLibrary } from '../hooks/useLibrary';
import { LevelBadge } from './LevelBadge';

const LEVEL_FILTERS: { value: TopikLevel | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: '1-2', label: 'Lv.1-2' },
  { value: '3-4', label: 'Lv.3-4' },
  { value: '5-6', label: 'Lv.5-6' },
];

function GrammarCard({ item, onRemove }: { item: SavedGrammar; onRemove: () => void }) {
  const { speak } = useSpeech();
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <LevelBadge level={item.level} />
            <span className="text-xs text-gray-400">{item.articleTitle}</span>
          </div>
          <span className="text-base font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl inline-block">
            {item.pattern}
          </span>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.explanation}</p>
        </div>
        <button
          onClick={onRemove}
          title="移除"
          className="shrink-0 w-7 h-7 rounded-full bg-gray-100 text-gray-300 hover:bg-red-100 hover:text-red-400 flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="mt-3 bg-indigo-50 rounded-xl p-3">
        <div className="flex items-start gap-2">
          <button
            onClick={() => speak(item.example)}
            className="w-6 h-6 shrink-0 rounded-full bg-white text-indigo-400 hover:text-indigo-600 flex items-center justify-center text-xs transition-colors shadow-sm"
          >
            🔊
          </button>
          <div>
            <p className="text-sm font-medium text-indigo-800">{item.example}</p>
            <p className="text-xs text-indigo-400 mt-0.5">{item.exampleTranslation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GrammarLibrary() {
  const { savedGrammar, removeGrammar } = useLibrary();
  const [filter, setFilter] = useState<TopikLevel | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = savedGrammar.filter(g => {
    const matchLevel = filter === 'all' || g.level === filter;
    const matchSearch =
      !search ||
      g.pattern.includes(search) ||
      g.explanation.includes(search) ||
      g.example.includes(search);
    return matchLevel && matchSearch;
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h2 className="text-lg font-black text-gray-900 mb-1">文法記錄庫</h2>
        <p className="text-sm text-gray-400">已儲存 {savedGrammar.length} 個文法</p>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="搜尋文法句型或說明…"
        className="w-full mb-3 px-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
      />

      {/* Level filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {LEVEL_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === value
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-300">
          <div className="text-5xl mb-3">📝</div>
          <p className="font-bold">
            {savedGrammar.length === 0 ? '還沒有儲存任何文法' : '沒有符合條件的文法'}
          </p>
          <p className="text-sm mt-1">
            {savedGrammar.length === 0 && '閱讀文章時，點擊 ☆ 可以收藏文法'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(item => (
            <GrammarCard key={item.id} item={item} onRemove={() => removeGrammar(item.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
