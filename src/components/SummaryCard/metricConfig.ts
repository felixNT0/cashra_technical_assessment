import type { Summary } from "@/types/dashboard";

export type MetricConfig = {
  key: keyof Summary;
  label: string;
  icon: string;
  gradient: string;
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
};

/**
 * Configuration for summary card metrics
 */
export const METRIC_CONFIG: ReadonlyArray<MetricConfig> = [
  {
    key: "available",
    label: "Available",
    icon: "✓",
    gradient: "from-brand to-sky-500",
    bgGradient: "from-brand/10 via-brand/5 to-transparent",
    borderColor: "border-brand/30",
    shadowColor: "shadow-brand/20",
  },
  {
    key: "busy",
    label: "Busy",
    icon: "●",
    gradient: "from-busy to-amber-500",
    bgGradient: "from-busy/10 via-busy/5 to-transparent",
    borderColor: "border-busy/30",
    shadowColor: "shadow-busy/20",
  },
  {
    key: "offline",
    label: "Offline",
    icon: "○",
    gradient: "from-offline to-red-500",
    bgGradient: "from-offline/10 via-offline/5 to-transparent",
    borderColor: "border-offline/30",
    shadowColor: "shadow-offline/20",
  },
] as const;

