import type { Filter } from "@/types/dashboard";
import { memo } from "react";
import { FilterButton } from "./ui/FilterButton";

type FilterOption = {
  value: Filter;
  label: string;
};

type FilterBarProps = {
  title?: string;
  subtitle?: string;
  filter: Filter;
  options: FilterOption[];
  onChange: (value: Filter) => void;
};

// Memoized filter bar to prevent unnecessary re-renders
export const FilterBar = memo(function FilterBar({
  title,
  filter,
  options,
  onChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 md:gap-4 lg:gap-3">
      {title && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs md:text-sm lg:text-xs lg:whitespace-nowrap">
          {title}
        </span>
      )}
      <div className="flex flex-wrap items-center gap-1 sm:gap-2.5 md:gap-3 lg:gap-2">
        {options.map((option) => (
          <FilterButton
            key={option.value}
            label={option.label}
            isActive={option.value === filter}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
});
