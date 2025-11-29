import { memo, useMemo } from "react";
import type { TeamMember } from "@/types/dashboard";
import { formatPercent, getTeamStats } from "@/utils/stats";

type HighlightsPanelProps = {
  members: TeamMember[];
};

const CARD_BASE =
  "rounded-xl border border-white/50 bg-linear-to-br p-3.5 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 touch-manipulation sm:p-4 md:p-4.5";

// Memoized component to prevent unnecessary re-renders
export const HighlightsPanel = memo(function HighlightsPanel({ members }: HighlightsPanelProps) {
  const stats = useMemo(() => getTeamStats(members), [members]);
  
  const highlights = useMemo(() => [
    {
      label: "Tasks cleared",
      value: stats.totalTasks,
      accent: "from-emerald-400/20 to-emerald-300/10 text-emerald-700 border-emerald-200/30",
      icon: "✓",
    },
    {
      label: "Online now",
      value: formatPercent(stats.onlineRatio),
      accent: "from-sky-400/20 to-sky-300/10 text-sky-700 border-sky-200/30",
      icon: "●",
    },
    {
      label: "Top performer",
      value: stats.topPerformer ? stats.topPerformer.name.split(" ")[0] : "—",
      accent: "from-amber-400/20 to-amber-300/10 text-amber-700 border-amber-200/30",
      icon: "★",
    },
  ], [stats]);

  return (
    <section className="flex gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
      {highlights.map((item) => (
        <article key={item.label} className={`${CARD_BASE} ${item.accent} flex-1 min-w-0`}>
          <div className="flex items-start justify-between gap-1.5 sm:gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600 opacity-80 sm:text-[10px] md:text-xs">
                {item.label}
              </p>
              <p className="mt-1 text-base font-bold leading-tight sm:mt-1.5 sm:text-lg md:text-xl lg:text-2xl">
                {item.value}
              </p>
            </div>
            <span className="text-base opacity-60 sm:text-lg md:text-xl lg:text-2xl shrink-0">
              {item.icon}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
});

