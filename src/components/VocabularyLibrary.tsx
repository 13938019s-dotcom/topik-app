import type { SavedVocabulary, TopikLevel, PartOfSpeech } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import { useLibrary } from '../hooks/useLibrary';
import { LevelBadge } from './LevelBadge';
import { useState } from 'react';

const LEVEL_FILTERS: { value: TopikLevel | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: '1-2', label: 'Lv.1-2' },
  { value: '3-4', label: 'Lv.3-4' },
  { value: '5-6', label: 'Lv.5-6' },
];

const POS_STYLE: Record<PartOfSpeech, string> = {
  '名詞': 'bg-sky-50 text-sky-600 border-sky-200',
  '動詞': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  '形容詞': 'bg-amber-50 text-amber-600 border-amber-200',
  '副詞': 'bg-violet-50 text-violet-600 border-violet-200',
};

function PosBadge({ pos }: { pos: PartOfSpeech }) {
  return (
    <span className={`inline-block text-xs font-bold px-1.5 py-0.5 rounded border ${POS_STYLE[pos]}`}>
      {pos}
    </span>
  );
}

function VocabCard({ item, onRemove }: { item: SavedVocabulary; onRemove: () => void }) {
  const { speak } = useSpeech();
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <LevelBadge level={item.level} />
            <span className="text-xs text-gray-400">{item.articleTitle}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl font-black text-gray-900">{item.korean}</span>
            <button
              onClick={() => speak(item.korean)}
              className="w-6 h-6 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-400 hover:text-blue-500 flex items-center justify-center text-xs transition-colors"
            >
              🔊
            </button>
            <span className="text-sm text-gray-400">[{item.romanization}]</span>
            {item.partOfSpeech && <PosBadge pos={item.partOfSpeech} />}
          </div>
          <span className="inline-block mt-1 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg px-2 py-0.5">
            {item.meaning}
          </span>
        </div>
        <button
          onClick={onRemove}
          title="移除"
          className="shrink-0 w-7 h-7 rounded-full bg-gray-100 text-gray-300 hover:bg-red-100 hover:text-red-400 flex items-center justify-center text-sm transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="mt-3 bg-gray-50 rounded-xl p-3">
        <div className="flex items-start gap-2">
          <button
            onClick={() => speak(item.example)}
            className="w-6 h-6 shrink-0 rounded-full bg-white text-gray-400 hover:text-blue-500 flex items-center justify-center text-xs transition-colors shadow-sm"
          >
            🔊
          </button>
          <div>
            <p className="text-sm text-gray-700 font-medium">{item.example}</p>
            <p className="text-xs text-gray-400 mt-0.5">{item.exampleTranslation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VocabularyLibrary() {
  const { savedVocab, removeVocab } = useLibrary();
  const [filter, setFilter] = useState<TopikLevel | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = savedVocab.filter(v => {
    const matchLevel = filter === 'all' || v.level === filter;
    const matchSearch =
      !search ||
      v.korean.includes(search) ||
      v.meaning.includes(search) ||
      v.romanization.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h2 className="text-lg font-black text-gray-900 mb-1">單字記錄庫</h2>
        <p className="text-sm text-gray-400">已儲存 {savedVocab.length} 個單字</p>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="搜尋韓文、羅馬拼音或中文意思…"
        className="w-full mb-3 px-4 py-2.5 rounded-xl ring-1 ring-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-300"
      />

      {/* Level filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {LEVEL_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-300">
          <div className="text-5xl mb-3">📖</div>
          <p className="font-bold">
            {savedVocab.length === 0 ? '還沒有儲存任何單字' : '沒有符合條件的單字'}
          </p>
          <p className="text-sm mt-1">
            {savedVocab.length === 0 && '閱讀文章時，點擊 ☆ 可以收藏單字'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <VocabCard key={item.id} item={item} onRemove={() => removeVocab(item.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
