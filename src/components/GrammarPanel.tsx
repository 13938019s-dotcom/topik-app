import type { GrammarPoint, TopikLevel } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import { useLibrary } from '../hooks/useLibrary';

interface Props {
  grammar: GrammarPoint[];
  articleTitle: string;
  level: TopikLevel;
}

export function GrammarPanel({ grammar, articleTitle, level }: Props) {
  const { speak } = useSpeech();
  const { saveGrammar, removeGrammar, isGrammarSaved } = useLibrary();

  return (
    <div className="space-y-4">
      {grammar.map((g, i) => {
        const saved = isGrammarSaved(g.pattern, articleTitle);
        return (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-black text-gray-900 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl">
                    {g.pattern}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{g.explanation}</p>
              </div>
              <button
                onClick={() =>
                  saved
                    ? removeGrammar(`${g.pattern}::${articleTitle}`)
                    : saveGrammar(g, articleTitle, level)
                }
                title={saved ? '取消儲存' : '加入文法庫'}
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  saved
                    ? 'bg-amber-100 text-amber-500 hover:bg-red-100 hover:text-red-400'
                    : 'bg-gray-100 text-gray-300 hover:bg-amber-100 hover:text-amber-500'
                }`}
              >
                {saved ? '★' : '☆'}
              </button>
            </div>
            <div className="mt-3 bg-indigo-50 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <button
                  onClick={() => speak(g.example)}
                  className="w-6 h-6 shrink-0 rounded-full bg-white text-indigo-400 hover:text-indigo-600 flex items-center justify-center text-xs transition-colors shadow-sm"
                >
                  🔊
                </button>
                <div>
                  <p className="text-sm font-medium text-indigo-800">{g.example}</p>
                  <p className="text-xs text-indigo-400 mt-0.5">{g.exampleTranslation}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
