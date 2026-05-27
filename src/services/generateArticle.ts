import type { Article, TopikLevel } from '../types';

export async function generateArticle(level: TopikLevel, articleCount: number): Promise<Article> {
  const res = await fetch('/api/generate-topik-article', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ level, articleCount }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? 'AI 生成失敗，請重試。');
  }

  return res.json();
}
