import { memo } from "react";
import type { Summary } from "@/types/dashboard";
import { METRIC_CONFIG } from "./SummaryCard/metricConfig";
import { SummaryMetricCard } from "./SummaryCard/SummaryMetricCard";

type SummaryCardProps = {
  summary: Summary;
};

/**
 * Memoized component to prevent unnecessary re-renders
 */
export const SummaryCard = memo(function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="flex items-stretch gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
      {METRIC_CONFIG.map((metric) => (
        <SummaryMetricCard key={metric.key} metric={metric} value={summary[metric.key]} />
      ))}
    </div>
  );
});

