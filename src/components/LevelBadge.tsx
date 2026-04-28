import type { TopikLevel } from '../types';

const config: Record<TopikLevel, { label: string; bg: string; text: string }> = {
  '1-2': { label: 'TOPIK I', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  '3-4': { label: 'TOPIK II', bg: 'bg-blue-100', text: 'text-blue-700' },
  '5-6': { label: 'TOPIK II', bg: 'bg-purple-100', text: 'text-purple-700' },
};

export function LevelBadge({ level, size = 'sm' }: { level: TopikLevel; size?: 'sm' | 'lg' }) {
  const { label, bg, text } = config[level];
  const sizeClass = size === 'lg' ? 'text-sm px-3 py-1' : 'text-xs px-2 py-0.5';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-bold ${bg} ${text} ${sizeClass}`}>
      {label}
      <span className="opacity-70">Lv.{level}</span>
    </span>
  );
}
