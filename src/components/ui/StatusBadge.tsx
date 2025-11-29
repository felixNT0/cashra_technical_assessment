import { memo } from "react";
import type { Availability } from "@/types/dashboard";
import { STATUS_BADGE_STYLES } from "@/utils/constants";

type StatusBadgeProps = {
  status: Availability;
  size?: "sm" | "md" | "lg";
};

const SIZE_STYLES = {
  sm: "px-2 py-0.5 text-[9px] sm:px-2.5 sm:py-1 sm:text-[10px]",
  md: "px-3 py-1 text-[10px]",
  lg: "px-4 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm",
};

/**
 * Reusable status badge component
 */
export const StatusBadge = memo(function StatusBadge({
  status,
  size = "sm",
}: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full font-bold uppercase tracking-wider ${STATUS_BADGE_STYLES[status]} ${SIZE_STYLES[size]}`}
    >
      {status}
    </span>
  );
});

