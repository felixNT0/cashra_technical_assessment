import { TEAM_BASELINE } from "@/constants/team";
import type { Filter } from "@/types/dashboard";
import { loadFromStorage } from "@/utils/storage";
import { useCallback, useState } from "react";
import { useDashboardFilters } from "./useDashboardFilters";
import { useDashboardStorage } from "./useDashboardStorage";
import { useDebounce } from "./useDebounce";
import { useMemberMutations } from "./useMemberMutations";

/**
 * Main hook for team dashboard state management
 * Optimized: Combined state, lazy initialization, minimal hooks
 */
export function useTeamDashboardState() {
  // Lazy initialization from localStorage or baseline
  const [members, setMembers] = useState<typeof TEAM_BASELINE>(() => {
    const stored = loadFromStorage();
    return stored?.members && stored.members.length > 0
      ? stored.members
      : TEAM_BASELINE;
  });

  // Combined filter state (single state object)
  const [filters, setFilters] = useState<{
    filter: Filter;
    searchQuery: string;
  }>(() => {
    const stored = loadFromStorage();
    return {
      filter: stored?.filter ?? "all",
      searchQuery: "",
    };
  });

  // Memoized setters to avoid recreating functions
  const setFilter = useCallback((filter: Filter) => {
    setFilters((prev) => ({ ...prev, filter }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  }, []);

  // Wrapper for storage hook that expects Dispatch<SetStateAction<Filter>>
  const setFilterForStorage = useCallback(
    (value: Filter | ((prev: Filter) => Filter)) => {
      setFilters((prev) => ({
        ...prev,
        filter: typeof value === "function" ? value(prev.filter) : value,
      }));
    },
    []
  );

  const { toggleStatus, addMember, updateMember, removeMember } =
    useMemberMutations(members, setMembers);
  useDashboardStorage({
    members,
    filter: filters.filter,
    setMembers,
    setFilter: setFilterForStorage,
  });

  // Debounce search query to reduce filtering computations
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);

  // Computed values
  const { summary, filteredMembers } = useDashboardFilters({
    members,
    filter: filters.filter,
    searchQuery: debouncedSearchQuery,
  });

  return {
    members,
    filteredMembers,
    filter: filters.filter,
    summary,
    setFilter,
    searchQuery: filters.searchQuery,
    setSearchQuery,
    toggleStatus,
    addMember,
    updateMember,
    removeMember,
  };
}
