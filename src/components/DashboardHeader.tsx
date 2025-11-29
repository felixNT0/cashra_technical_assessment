import { memo } from "react";
import type { Summary } from "@/types/dashboard";
import { SummaryCard } from "./SummaryCard";
import { SummaryCardCompact } from "./SummaryCardCompact";
import { Button } from "./ui/Button";

type DashboardHeaderProps = {
  summary: Summary;
  onAddClick: () => void;
};

// Memoized header component
export const DashboardHeader = memo(function DashboardHeader({
  summary,
  onAddClick,
}: DashboardHeaderProps) {
  return (
    <>
      {/* Sticky header on mobile/tablet, normal on desktop */}
      <header className="sticky top-0 z-[100] shrink-0 border-b border-white/30 bg-white/95 backdrop-blur-xl shadow-lg shadow-white/40 lg:relative lg:z-10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5 md:gap-4 md:px-6 md:py-3 lg:py-3.5 lg:px-8">
          {/* Left section: Logo + Title (Title hidden on mobile) */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-4">
            <div className="relative shrink-0 h-8 w-8 rounded-lg bg-linear-to-br from-brand to-sky-500 p-1.5 shadow-lg shadow-brand/30 sm:h-9 sm:w-9 sm:rounded-xl md:h-10 md:w-10 md:p-2">
              <span className="absolute inset-0 h-2 w-2 m-auto rounded-full bg-brand animate-ping opacity-75 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" />
              <span className="relative block h-2 w-2 m-auto rounded-full bg-white sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" />
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-brand leading-tight sm:text-[10px] sm:tracking-[0.35em] md:text-xs">
                Ops Control
              </p>
              <h1 className="text-sm font-black text-slate-900 leading-tight sm:text-base md:text-lg lg:text-xl">
                Team Availability
              </h1>
            </div>
          </div>

          {/* Center section: Live sync badge (hidden on mobile) */}
          <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50/80 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 shadow-inner sm:flex sm:px-2.5 sm:py-1 sm:text-[10px]">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse sm:h-1.5 sm:w-1.5" />
            Live sync
          </div>

          {/* Right section: Compact Summary + Add button (Summary hidden on mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
            <div className="hidden lg:block">
              <SummaryCardCompact summary={summary} />
            </div>
            <Button
              type="button"
              onClick={onAddClick}
              variant="primary"
              size="md"
              className="whitespace-nowrap bg-size-[200%_auto] hover:scale-105 hover:bg-position-[100%] sm:rounded-xl md:px-4 md:py-2.5"
            >
              <span className="text-xs leading-none sm:text-sm md:text-base">+</span>
              <span className="hidden sm:inline">Add Member</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet summary - shown on small and medium screens, below sticky header */}
      <div className="sticky top-14 z-[90] shrink-0 border-b border-white/20 bg-white/80 backdrop-blur-sm px-3 py-2 sm:px-4 md:top-16 lg:hidden">
        <div className="mx-auto max-w-7xl">
          <SummaryCard summary={summary} />
        </div>
      </div>
    </>
  );
});

