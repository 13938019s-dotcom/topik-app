import { useState } from 'react';
import type { Question } from '../types';

interface Props {
  questions: Question[];
  isCompleted: boolean;
  onComplete: () => void;
}

export function QuizPanel({ questions, isCompleted, onComplete }: Props) {
  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = questions.every((q, i) => selected[i] === q.answerIndex);
    if (allCorrect) onComplete();
  };

  const handleRetry = () => {
    setSelected(Array(questions.length).fill(null));
    setSubmitted(false);
  };

  const score = submitted ? questions.filter((q, i) => selected[i] === q.answerIndex).length : 0;
  const allAnswered = selected.every(s => s !== null);

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <div key={qi} className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-100">
          <p className="font-bold text-gray-800 mb-3">
            <span className="text-blue-500 mr-1.5">Q{qi + 1}.</span>
            {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const isSelected = selected[qi] === oi;
              const isCorrect = oi === q.answerIndex;
              let cls = 'w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ';
              if (!submitted) {
                cls += isSelected
                  ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200';
              } else {
                if (isCorrect) cls += 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400';
                else if (isSelected) cls += 'bg-red-100 text-red-600 ring-2 ring-red-300';
                else cls += 'bg-gray-50 text-gray-400 ring-1 ring-gray-200';
              }
              return (
                <button
                  key={oi}
                  onClick={() => {
                    if (submitted) return;
                    const next = [...selected];
                    next[qi] = oi;
                    setSelected(next);
                  }}
                  className={cls}
                  disabled={submitted}
                >
                  <span className="mr-2 opacity-60">{['①', '②', '③', '④'][oi]}</span>
                  {opt}
                  {submitted && isCorrect && <span className="ml-2">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full py-3 rounded-2xl font-bold transition-all bg-blue-500 text-white hover:bg-blue-600 shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
        >
          提交答案
        </button>
      ) : (
        <div className={`rounded-2xl p-5 text-center ${score === questions.length ? 'bg-emerald-50' : 'bg-orange-50'}`}>
          <div className={`text-2xl font-black mb-1 ${score === questions.length ? 'text-emerald-600' : 'text-orange-500'}`}>
            {score} / {questions.length}
          </div>
          {score === questions.length ? (
            <p className="text-emerald-700 font-bold">全部答對！本篇已完成 🎉</p>
          ) : (
            <>
              <p className="text-orange-600 font-bold mb-3">還有 {questions.length - score} 題答錯，再試一次！</p>
              <button
                onClick={handleRetry}
                className="px-5 py-2 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                重新作答
              </button>
            </>
          )}
          {isCompleted && score === questions.length && (
            <p className="text-xs text-emerald-500 mt-2">進度已記錄 ✓</p>
          )}
        </div>
      )}
    </div>
  );
}
