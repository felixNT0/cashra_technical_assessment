import type { Filter, TeamMember } from "@/types/dashboard";
import { memo, useState } from "react";
import { ControlsSection } from "./DashboardMain/ControlsSection";
import { MemberCardsGrid } from "./DashboardMain/MemberCardsGrid";
import { MemberCardsList } from "./DashboardMain/MemberCardsList";
import { EmptyState } from "./EmptyState";
import { HighlightsPanel } from "./HighlightsPanel";

type DashboardMainProps = {
  members: TeamMember[];
  filteredMembers: TeamMember[];
  filter: Filter;
  searchQuery: string;
  onFilterChange: (value: Filter) => void;
  onSearchChange: (value: string) => void;
  onToggle: (id: string) => void;
  onEdit: (member: TeamMember) => void;
  onRemove: (member: TeamMember) => void;
};

type ViewMode = "grid" | "list";
const VIEW_STORAGE_KEY = "dashboard-view-mode";

// Memoized main content component
export const DashboardMain = memo(function DashboardMain({
  members,
  filteredMembers,
  filter,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onToggle,
  onEdit,
  onRemove,
}: DashboardMainProps) {
  // Lazy initialization from localStorage
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "grid";
    const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
    return (stored === "list" ? "list" : "grid") as ViewMode;
  });

  // Persist view mode to localStorage
  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(VIEW_STORAGE_KEY, mode);
    }
  };

  return (
    <main className="relative z-10 flex flex-1 flex-col overflow-hidden">
      {/* Top section: Highlights + Controls - Fixed on desktop */}
      <div className="flex flex-col border-b border-white/30 bg-white/50 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-4 shrink-0">
        <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-4">
          {/* Stats/Highlights Section */}
          <div>
            <HighlightsPanel members={members} />
          </div>

          {/* Controls: Search + View Toggle + Filter */}
          <ControlsSection
            searchQuery={searchQuery}
            filter={filter}
            viewMode={viewMode}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onViewChange={handleViewChange}
          />
        </div>
      </div>

      {/* Scrollable member cards - grid or list view */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5 lg:px-8">
        <div className="mx-auto w-full max-w-7xl pb-6 lg:pb-4">
          {filteredMembers.length === 0 ? (
            <EmptyState filter={filter} />
          ) : viewMode === "grid" ? (
            <MemberCardsGrid
              members={filteredMembers}
              onToggle={onToggle}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ) : (
            <MemberCardsList
              members={filteredMembers}
              onToggle={onToggle}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          )}
        </div>
      </div>
    </main>
  );
});
