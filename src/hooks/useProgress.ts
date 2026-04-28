import { useState, useEffect, useCallback } from 'react';
import type { TopikLevel, Progress } from '../types';

const STORAGE_KEY = 'topik_progress';

const defaultProgress = (): Progress => ({
  '1-2': { completedArticleIds: [] },
  '3-4': { completedArticleIds: [] },
  '5-6': { completedArticleIds: [] },
});

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProgress(), ...JSON.parse(raw) } : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markCompleted = useCallback((articleId: string, level: TopikLevel) => {
    setProgress(prev => {
      const ids = prev[level].completedArticleIds;
      if (ids.includes(articleId)) return prev;
      return { ...prev, [level]: { completedArticleIds: [...ids, articleId] } };
    });
  }, []);

  const isCompleted = useCallback(
    (articleId: string, level: TopikLevel) =>
      progress[level].completedArticleIds.includes(articleId),
    [progress]
  );

  const getCompletedCount = useCallback(
    (level: TopikLevel, total: number) => ({
      completed: progress[level].completedArticleIds.length,
      total,
    }),
    [progress]
  );

  return { progress, markCompleted, isCompleted, getCompletedCount };
}
