import { FILTER_OPTIONS } from "@/constants/team";
import type { Filter } from "@/types/dashboard";
import { memo } from "react";
import { FilterBar } from "../FilterBar";
import { SearchBar } from "../SearchBar";
import { ViewToggle } from "../ViewToggle";

type ViewMode = "grid" | "list";

type ControlsSectionProps = {
  searchQuery: string;
  filter: Filter;
  viewMode: ViewMode;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: Filter) => void;
  onViewChange: (view: ViewMode) => void;
};

/**
 * Combined controls section: Search, View Toggle, and Filters
 * Desktop: All in one line | Mobile/Tablet: Stacked
 */
export const ControlsSection = memo(function ControlsSection({
  searchQuery,
  filter,
  viewMode,
  onSearchChange,
  onFilterChange,
  onViewChange,
}: ControlsSectionProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:gap-4 lg:gap-x-6">
      {/* Mobile/Tablet: Stacked layout */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:hidden">
        <div className="flex-1 min-w-0">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
      <div className="flex gap-3 items-end justify-between sm:gap-4 sm:hidden">
        <div className="border-t border-white/40 pt-3 sm:pt-4">
          <FilterBar
            filter={filter}
            options={FILTER_OPTIONS}
            onChange={onFilterChange}
            title="Status"
          />
        </div>
        <div className="flex-shrink-0 max-sm:w-fit">
          <ViewToggle view={viewMode} onChange={onViewChange} />
        </div>
      </div>

      {/* Desktop: All in one line, centered */}
      <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-4 lg:w-full">
        <div className="flex-shrink-0">
          <FilterBar
            filter={filter}
            options={FILTER_OPTIONS}
            onChange={onFilterChange}
            title="Status"
          />
        </div>
        <div className="flex-shrink-0 min-w-0 max-w-md">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
        <div className="flex-shrink-0 ">
          <ViewToggle view={viewMode} onChange={onViewChange} />
        </div>
      </div>
    </div>
  );
});
