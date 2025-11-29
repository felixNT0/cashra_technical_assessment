import { memo } from "react";

type EmptyStateProps = {
  filter: string;
};

// Memoized empty state component
export const EmptyState = memo(function EmptyState({ filter }: EmptyStateProps) {
  const message = filter === "all" ? "in the roster" : filter;

  return (
    <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300/60 bg-white/60 p-6 text-center backdrop-blur-sm sm:min-h-[350px] sm:rounded-2xl sm:p-8 md:min-h-[400px]">
      <div className="space-y-2 sm:space-y-3">
        <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center sm:h-14 sm:w-14 md:h-16 md:w-16">
          <span className="text-2xl text-slate-400 sm:text-3xl">👥</span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-700 sm:text-base md:text-lg">
            No teammates found
          </p>
          <p className="text-[10px] text-slate-500 sm:text-xs md:text-sm">
            No teammates are currently{" "}
            <span className="font-semibold text-slate-700">{message}</span>.
            Adjust the filter or add new members.
          </p>
        </div>
      </div>
    </div>
  );
});

