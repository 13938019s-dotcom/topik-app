import type { TopikLevel } from '../types';

interface LevelInfo {
  level: TopikLevel;
  name: string;
  desc: string;
  color: string;
  ring: string;
  bg: string;
  accent: string;
}

const LEVELS: LevelInfo[] = [
  { level: '1-2', name: 'TOPIK I', desc: '入門・初級', color: 'text-emerald-700', ring: 'ring-emerald-400', bg: 'bg-emerald-50', accent: 'bg-emerald-500' },
  { level: '3-4', name: 'TOPIK II', desc: '中級', color: 'text-blue-700', ring: 'ring-blue-400', bg: 'bg-blue-50', accent: 'bg-blue-500' },
  { level: '5-6', name: 'TOPIK II', desc: '高級', color: 'text-purple-700', ring: 'ring-purple-400', bg: 'bg-purple-50', accent: 'bg-purple-500' },
];

interface Props {
  selected: TopikLevel;
  onChange: (level: TopikLevel) => void;
  completedCounts: Record<TopikLevel, { completed: number; total: number }>;
}

export function LevelSelector({ selected, onChange, completedCounts }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {LEVELS.map(({ level, name, desc, color, ring, bg, accent }) => {
        const { completed, total } = completedCounts[level];
        const isSelected = selected === level;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        return (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`relative rounded-2xl p-4 text-left transition-all ${
              isSelected
                ? `${bg} ring-2 ${ring} shadow-md`
                : 'bg-white ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-sm'
            }`}
          >
            <div className={`text-lg font-black ${color}`}>Lv.{level}</div>
            <div className={`text-sm font-bold ${color}`}>{name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{completed}/{total}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${accent} rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
