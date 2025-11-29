// Status badge styles - memoized to prevent recreation
export const STATUS_BADGE_STYLES = {
  available: "bg-brand/10 text-brand",
  busy: "bg-busy/10 text-busy",
  offline: "bg-offline/10 text-offline",
} as const;

// Status indicator bar styles
export const STATUS_BAR_STYLES = {
  available: "bg-linear-to-r from-brand to-sky-500",
  busy: "bg-linear-to-r from-busy to-amber-500",
  offline: "bg-linear-to-r from-offline to-red-500",
} as const;

