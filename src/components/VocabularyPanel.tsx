import type { Vocabulary, TopikLevel } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import { useLibrary } from '../hooks/useLibrary';

interface Props {
  vocabulary: Vocabulary[];
  articleTitle: string;
  level: TopikLevel;
}

function SpeakButton({ text, small = false }: { text: string; small?: boolean }) {
  const { speak, speaking } = useSpeech();
  return (
    <button
      onClick={() => speak(text)}
      title="朗讀"
      className={`rounded-full flex items-center justify-center transition-colors ${
        small
          ? 'w-6 h-6 text-xs bg-gray-100 hover:bg-blue-100 text-gray-400 hover:text-blue-500'
          : 'w-8 h-8 text-sm bg-gray-100 hover:bg-blue-100 text-gray-400 hover:text-blue-500'
      } ${speaking ? 'bg-blue-100 text-blue-500' : ''}`}
    >
      🔊
    </button>
  );
}

export function VocabularyPanel({ vocabulary, articleTitle, level }: Props) {
  const { saveVocab, removeVocab, isVocabSaved } = useLibrary();

  return (
    <div className="space-y-3">
      {vocabulary.map((v, i) => {
        const saved = isVocabSaved(v.korean, articleTitle);
        return (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-gray-900">{v.korean}</span>
                  <SpeakButton text={v.korean} />
                  <span className="text-sm text-gray-400">[{v.romanization}]</span>
                </div>
                <span className="inline-block mt-1 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg px-2 py-0.5">
                  {v.meaning}
                </span>
              </div>
              <button
                onClick={() =>
                  saved ? removeVocab(`${v.korean}::${articleTitle}`) : saveVocab(v, articleTitle, level)
                }
                title={saved ? '取消儲存' : '加入單字庫'}
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  saved
                    ? 'bg-amber-100 text-amber-500 hover:bg-red-100 hover:text-red-400'
                    : 'bg-gray-100 text-gray-300 hover:bg-amber-100 hover:text-amber-500'
                }`}
              >
                {saved ? '★' : '☆'}
              </button>
            </div>
            <div className="mt-3 bg-gray-50 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <SpeakButton text={v.example} small />
                <div>
                  <p className="text-sm text-gray-700 font-medium">{v.example}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{v.exampleTranslation}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
