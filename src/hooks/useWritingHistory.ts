import { useState, useEffect, useCallback } from 'react';
import type { UserWriting } from '../types';

const KEY = 'topik_user_writings';

function load(): UserWriting[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
  catch { return []; }
}

export function useWritingHistory() {
  const [writings, setWritings] = useState<UserWriting[]>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(writings));
  }, [writings]);

  const saveWriting = useCallback((practiceId: string, practiceTitle: string, content: string) => {
    setWritings(prev => {
      const existing = prev.findIndex(w => w.practiceId === practiceId);
      const entry: UserWriting = {
        id: `${practiceId}-${Date.now()}`,
        practiceId,
        practiceTitle,
        content,
        savedAt: new Date().toISOString(),
      };
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = entry;
        return next;
      }
      return [...prev, entry];
    });
  }, []);

  const deleteWriting = useCallback((practiceId: string) => {
    setWritings(prev => prev.filter(w => w.practiceId !== practiceId));
  }, []);

  const getWriting = useCallback(
    (practiceId: string) => writings.find(w => w.practiceId === practiceId),
    [writings]
  );

  return { writings, saveWriting, deleteWriting, getWriting };
}
