import { memo } from "react";
import type { Summary } from "@/types/dashboard";

type SummaryCardCompactProps = {
  summary: Summary;
};

// Compact version for header - horizontal layout
const METRIC_CONFIG: ReadonlyArray<{
  key: keyof Summary;
  label: string;
  gradient: string;
  dot: string;
}> = [
  { key: "available", label: "Available", gradient: "from-brand to-sky-500", dot: "bg-brand" },
  { key: "busy", label: "Busy", gradient: "from-busy to-amber-500", dot: "bg-busy" },
  { key: "offline", label: "Offline", gradient: "from-offline to-red-500", dot: "bg-offline" },
] as const;

// Compact summary card for header
export const SummaryCardCompact = memo(function SummaryCardCompact({
  summary,
}: SummaryCardCompactProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-white/90 px-2 py-1 shadow-md ring-1 ring-slate-200/60 backdrop-blur-sm sm:gap-2 sm:rounded-xl sm:px-2.5 sm:py-1.5 md:gap-2.5 md:px-3">
      {METRIC_CONFIG.map((metric, index) => {
        const value = summary[metric.key];
        return (
          <div
            key={metric.key}
            className={`flex items-center gap-1.5 ${
              index < METRIC_CONFIG.length - 1 ? "border-r border-slate-200 pr-1.5 sm:pr-2 md:pr-2.5" : ""
            }`}
          >
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${metric.dot} animate-pulse sm:h-2 sm:w-2`}
              />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[10px] md:text-xs">
                {metric.label}
              </span>
            </div>
            <span
              className={`text-sm font-black leading-none sm:text-base md:text-lg bg-linear-to-r bg-clip-text text-transparent ${metric.gradient}`}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
});

