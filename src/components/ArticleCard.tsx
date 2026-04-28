import type { Article } from '../types';
import { LevelBadge } from './LevelBadge';

interface Props {
  article: Article;
  isCompleted: boolean;
  onClick: () => void;
}

export function ArticleCard({ article, isCompleted, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl px-5 py-4 shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <LevelBadge level={article.level} />
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
          <h3 className="font-bold text-gray-900 text-base truncate">{article.title}</h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{article.content.slice(0, 60)}…</p>
        </div>
        <span className="text-gray-300 group-hover:text-gray-500 transition-colors mt-1 shrink-0">›</span>
      </div>
      <div className="flex gap-3 mt-3 text-xs text-gray-400">
        <span>📖 {article.vocabulary.length} 個單字</span>
        <span>📝 {article.grammar.length} 個文法</span>
        <span>❓ {article.questions.length} 題測驗</span>
      </div>
    </button>
  );
}
