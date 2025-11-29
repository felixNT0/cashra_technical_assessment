import { memo } from "react";

// Memoized background component
export const DashboardBackground = memo(function DashboardBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-linear-to-br from-brand/20 to-sky-200/10 blur-3xl animate-pulse" />
      <div className="absolute -right-1/4 -bottom-1/4 h-96 w-96 rounded-full bg-linear-to-br from-purple-300/30 to-indigo-200/10 blur-3xl animate-pulse delay-1000" />
    </div>
  );
});

