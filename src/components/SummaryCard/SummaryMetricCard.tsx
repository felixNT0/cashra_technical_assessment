import type { MetricConfig } from "./metricConfig";

type SummaryMetricCardProps = {
  metric: MetricConfig;
  value: number;
};

/**
 * Individual metric card component
 */
export function SummaryMetricCard({ metric, value }: SummaryMetricCardProps) {
  return (
    <div
      className={`group relative flex-1 min-w-0 rounded-lg border bg-linear-to-br p-2 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 touch-manipulation sm:rounded-xl sm:p-2.5 md:rounded-2xl md:p-3 ${metric.bgGradient} ${metric.borderColor} ${metric.shadowColor}`}
    >
      {/* Animated gradient overlay on hover */}
      <div
        className={`absolute inset-0 rounded-lg bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 sm:rounded-xl md:rounded-2xl ${metric.gradient}`}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-start justify-between gap-1 sm:gap-1.5">
        {/* Top: Icon + Label */}
        <div className="flex w-full items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md bg-linear-to-br text-[10px] font-bold text-white shadow-md sm:h-6 sm:w-6 sm:rounded-lg sm:text-xs md:h-7 md:w-7 md:rounded-xl ${metric.gradient}`}
            >
              {metric.icon}
            </div>
            <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[9px] md:text-[10px]">
              {metric.label}
            </span>
          </div>
          {/* Pulse indicator */}
          <div
            className={`h-1 w-1 rounded-full bg-linear-to-br animate-pulse sm:h-1.5 sm:w-1.5 ${metric.gradient}`}
          />
        </div>

        {/* Bottom: Value */}
        <div className="flex w-full items-baseline justify-between gap-1.5 sm:gap-2">
          <span
            className={`text-xl font-black leading-none sm:text-2xl md:text-3xl lg:text-4xl bg-linear-to-r bg-clip-text text-transparent ${metric.gradient}`}
          >
            {value}
          </span>
          <span className="text-[7px] font-medium text-slate-400 sm:text-[8px] md:text-[9px]">
            {value === 1 ? "member" : "members"}
          </span>
        </div>
      </div>
    </div>
  );
}

