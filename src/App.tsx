import { useState, useMemo } from 'react';
import type { TopikLevel, Article, AppView } from './types';
import { presetArticles } from './data/articles';
import { useProgress } from './hooks/useProgress';
import { useLibrary } from './hooks/useLibrary';
import { generateArticle } from './services/generateArticle';
import { LevelSelector } from './components/LevelSelector';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReader } from './components/ArticleReader';
import { VocabularyLibrary } from './components/VocabularyLibrary';
import { GrammarLibrary } from './components/GrammarLibrary';
import { WritingZone } from './components/WritingZone';
import { KoreanConjugationPage } from './components/KoreanConjugationPage';
import { GrammarGuidePage } from './components/GrammarGuidePage';

const LEVELS: TopikLevel[] = ['1-2', '3-4', '5-6'];

const LEVEL_ACCENT: Record<TopikLevel, string> = {
  '1-2': 'bg-emerald-600 hover:bg-emerald-700',
  '3-4': 'bg-blue-600 hover:bg-blue-700',
  '5-6': 'bg-purple-600 hover:bg-purple-700',
};

const LEVEL_SPINNER: Record<TopikLevel, string> = {
  '1-2': 'border-t-emerald-600',
  '3-4': 'border-t-blue-600',
  '5-6': 'border-t-purple-600',
};

export default function App() {
  const [view, setView] = useState<AppView>('reading');
  const [selectedLevel, setSelectedLevel] = useState<TopikLevel>('1-2');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [aiArticles, setAiArticles] = useState<Article[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  // Track how many AI articles have been generated per level (for grammar batch cycling)
  const [aiGenCount, setAiGenCount] = useState<Record<TopikLevel, number>>(() => {
    try {
      const raw = localStorage.getItem('topik_ai_gen_count');
      return raw ? JSON.parse(raw) : { '1-2': 0, '3-4': 0, '5-6': 0 };
    } catch {
      return { '1-2': 0, '3-4': 0, '5-6': 0 };
    }
  });

  const { progress, markCompleted, isCompleted, getCompletedCount } = useProgress();
  const { savedVocab, savedGrammar } = useLibrary();

  const articlesByLevel = useMemo(() => {
    const all = [...presetArticles, ...aiArticles];
    return LEVELS.reduce((acc, level) => {
      acc[level] = all.filter(a => a.level === level);
      return acc;
    }, {} as Record<TopikLevel, Article[]>);
  }, [aiArticles]);

  const completedCounts = useMemo(
    () =>
      LEVELS.reduce((acc, level) => {
        acc[level] = getCompletedCount(level, articlesByLevel[level].length);
        return acc;
      }, {} as Record<TopikLevel, { completed: number; total: number }>),
    [progress, articlesByLevel]
  );

  const currentArticles = articlesByLevel[selectedLevel];
  const allCompleted =
    currentArticles.length > 0 && currentArticles.every(a => isCompleted(a.id, selectedLevel));

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerateError(null);
    try {
      const count = aiGenCount[selectedLevel] ?? 0;
      const article = await generateArticle(selectedLevel, count);
      setAiArticles(prev => [...prev, article]);
      // Increment counter and persist
      const newCount = { ...aiGenCount, [selectedLevel]: count + 1 };
      setAiGenCount(newCount);
      localStorage.setItem('topik_ai_gen_count', JSON.stringify(newCount));
    } catch (e) {
      setGenerateError(e instanceof Error ? e.message : 'AI 生成失敗，請重試。');
    } finally {
      setGenerating(false);
    }
  };

  // ── Article reader full-screen ──
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <ArticleReader
          article={selectedArticle}
          isCompleted={isCompleted(selectedArticle.id, selectedArticle.level)}
          onComplete={() => markCompleted(selectedArticle.id, selectedArticle.level)}
          onBack={() => setSelectedArticle(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-black text-lg">
              K
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-900 leading-tight">TOPIK 分級閱讀</h1>
              <p className="text-xs text-gray-400">韓語能力試驗・閱讀學習</p>
            </div>
          </div>
          {/* Library badges */}
          <div className="flex gap-2 text-xs text-gray-400">
            <span className="bg-amber-50 text-amber-600 font-bold px-2 py-1 rounded-lg">
              ★ {savedVocab.length}
            </span>
            <span className="bg-indigo-50 text-indigo-600 font-bold px-2 py-1 rounded-lg">
              ✎ {savedGrammar.length}
            </span>
          </div>
        </div>

        {/* ── Nav tabs ── */}
        <div className="max-w-2xl mx-auto px-4 pb-0">
          <div className="flex border-b border-gray-100">
            {[
              { id: 'reading' as AppView, label: '📚 閱讀' },
              { id: 'vocab-library' as AppView, label: '⭐ 單字庫' },
              { id: 'grammar-library' as AppView, label: '📝 文法庫' },
              { id: 'writing' as AppView, label: '✍️ 寫作' },
              { id: 'conjugation' as AppView, label: '🔤 活用' },
              { id: 'grammar-guide' as AppView, label: '📖 文法表' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
                  view === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* ── READING VIEW ── */}
        {view === 'reading' && (
          <>
            <section className="mb-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                選擇程度
              </h2>
              <LevelSelector
                selected={selectedLevel}
                onChange={setSelectedLevel}
                completedCounts={completedCounts}
              />
            </section>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Lv.{selectedLevel} 文章
                </h2>
                <span className="text-xs text-gray-400">
                  {completedCounts[selectedLevel].completed} / {completedCounts[selectedLevel].total} 完成
                </span>
              </div>

              <div className="grid gap-3 mb-5">
                {currentArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isCompleted={isCompleted(article.id, selectedLevel)}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))}
              </div>

              {/* AI Generate */}
              <div
                className={`rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
                  allCompleted ? 'border-violet-300 bg-violet-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                {allCompleted ? (
                  <>
                    <p className="text-violet-700 font-bold mb-1">
                      已完成所有 Lv.{selectedLevel} 文章！
                    </p>
                    <p className="text-violet-500 text-sm mb-4">
                      使用 AI 生成更多 Lv.{selectedLevel} 程度的練習文章
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mb-1">完成以上文章後</p>
                    <p className="text-gray-400 text-sm mb-4">可使用 AI 生成更多練習文章</p>
                  </>
                )}

                {generateError && (
                  <p className="text-red-500 text-sm mb-3 bg-red-50 rounded-lg px-3 py-2">
                    {generateError}
                  </p>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={!allCompleted || generating}
                  className={`px-6 py-2.5 rounded-xl font-bold transition-all text-white shadow-md disabled:shadow-none disabled:opacity-50 ${
                    allCompleted
                      ? `${LEVEL_ACCENT[selectedLevel]}`
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {generating ? (
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-block w-4 h-4 border-2 border-white/40 rounded-full animate-spin ${LEVEL_SPINNER[selectedLevel]}`}
                      />
                      AI 生成中…
                    </span>
                  ) : (
                    `AI 生成 Lv.${selectedLevel} 文章`
                  )}
                </button>
              </div>
            </section>
          </>
        )}

        {/* ── VOCABULARY LIBRARY ── */}
        {view === 'vocab-library' && <VocabularyLibrary />}

        {/* ── GRAMMAR LIBRARY ── */}
        {view === 'grammar-library' && <GrammarLibrary />}

        {/* ── WRITING ZONE ── */}
        {view === 'writing' && <WritingZone />}

        {/* ── CONJUGATION ── */}
        {view === 'conjugation' && <KoreanConjugationPage />}

        {/* ── GRAMMAR GUIDE ── */}
        {view === 'grammar-guide' && <GrammarGuidePage />}
      </main>

      <footer className="text-center py-4 text-xs text-gray-300">
        Made by <span className="font-bold text-gray-400">zoenozomi</span>
      </footer>
    </div>
  );
}
