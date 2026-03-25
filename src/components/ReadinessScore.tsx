import { CheckCircle2 } from 'lucide-react';

interface ReadinessScoreProps {
  score: number;
}

export function ReadinessScore({ score }: ReadinessScoreProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/20"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-emerald-400 transition-all duration-500"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{score}%</span>
          <span className="text-sm text-white/80">Ready</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-white">
        {score === 100 ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-medium">Ready to Land!</span>
          </>
        ) : (
          <span className="text-sm text-white/80">
            {score >= 67 ? 'Almost there!' : 'Complete checklist to continue'}
          </span>
        )}
      </div>
    </div>
  );
}
