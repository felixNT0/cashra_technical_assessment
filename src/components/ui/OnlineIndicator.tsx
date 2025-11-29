import { memo } from "react";
import type { Availability } from "@/types/dashboard";

type OnlineIndicatorProps = {
  status: Availability;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
};

const SIZE_STYLES = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5 sm:h-3 sm:w-3",
  lg: "h-3 w-3 sm:h-4 sm:w-4",
};

/**
 * Online indicator component - shows pulsing dot for online members
 */
export const OnlineIndicator = memo(function OnlineIndicator({
  status,
  size = "md",
  showLabel = false,
}: OnlineIndicatorProps) {
  const isOnline = status === "available" || status === "busy";
  const colorClass = status === "available" ? "bg-brand" : status === "busy" ? "bg-busy" : "bg-offline";

  if (!isOnline) return null;

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`${SIZE_STYLES[size]} ${colorClass} rounded-full shadow-lg animate-pulse`}
        aria-label={status === "available" ? "Available" : "Busy"}
      />
      {showLabel && (
        <span className="text-[9px] font-semibold text-slate-600 sm:text-[10px]">
          {status === "available" ? "Online" : "Busy"}
        </span>
      )}
    </div>
  );
});

