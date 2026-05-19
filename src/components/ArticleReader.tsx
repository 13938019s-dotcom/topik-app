import { useState } from 'react';
import type { Article } from '../types';
import { LevelBadge } from './LevelBadge';
import { VocabularyPanel } from './VocabularyPanel';
import { GrammarPanel } from './GrammarPanel';
import { QuizPanel } from './QuizPanel';
import { useSpeech } from '../hooks/useSpeech';

type Tab = 'article' | 'vocabulary' | 'grammar' | 'quiz';

interface Props {
  article: Article;
  isCompleted: boolean;
  onComplete: () => void;
  onBack: () => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'article', label: '📄 文章' },
  { id: 'vocabulary', label: '📖 單字' },
  { id: 'grammar', label: '📝 文法' },
  { id: 'quiz', label: '❓ 測驗' },
];

export function ArticleReader({ article, isCompleted, onComplete, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('article');
  const [showTranslation, setShowTranslation] = useState(false);
  const { speak, stop, speaking } = useSpeech();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors"
      >
        ‹ 返回文章列表
      </button>

      {/* Article header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-gray-100 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <LevelBadge level={article.level} size="lg" />
          {article.isAIGenerated && (
            <span className="text-xs bg-violet-100 text-violet-600 font-bold px-2 py-0.5 rounded-full">
              AI 生成
            </span>
          )}
          {isCompleted && (
            <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
              ✓ 已完成
            </span>
          )}
        </div>
        <h1 className="text-xl font-black text-gray-900">{article.title}</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-4">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              tab === t.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content — always mounted, CSS-toggled to preserve state across tab switches */}
      <div className={tab === 'article' ? '' : 'hidden'}>
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <button
              onClick={speaking ? stop : () => speak(article.content)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                speaking
                  ? 'bg-red-100 text-red-500 hover:bg-red-200'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {speaking ? '⏹ 停止朗讀' : '🔊 朗讀文章'}
            </button>
            {article.contentTranslation && (
              <button
                onClick={() => setShowTranslation(v => !v)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  showTranslation
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {showTranslation ? '🙈 隱藏翻譯' : '🌐 顯示翻譯'}
              </button>
            )}
          </div>
          <p className="text-gray-800 leading-relaxed text-base whitespace-pre-line">{article.content}</p>
          {article.contentTranslation && showTranslation && (
            <div className="mt-4 pt-4 border-t border-amber-100">
              <p className="text-xs font-bold text-amber-500 mb-2">中文翻譯</p>
              <p className="text-gray-500 leading-relaxed text-sm whitespace-pre-line">
                {article.contentTranslation}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={tab === 'vocabulary' ? '' : 'hidden'}>
        <VocabularyPanel
          vocabulary={article.vocabulary}
          articleTitle={article.title}
          level={article.level}
        />
      </div>

      <div className={tab === 'grammar' ? '' : 'hidden'}>
        <GrammarPanel
          grammar={article.grammar}
          articleTitle={article.title}
          level={article.level}
        />
      </div>

      <div className={tab === 'quiz' ? '' : 'hidden'}>
        <QuizPanel
          questions={article.questions}
          isCompleted={isCompleted}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}
