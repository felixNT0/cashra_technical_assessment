import type { Filter, Summary, TeamMember } from "@/types/dashboard";
import { useMemo } from "react";

type UseDashboardFiltersProps = {
  members: TeamMember[];
  filter: Filter;
  searchQuery: string;
};

/**
 * Custom hook for computed filter values (does not manage filter state)
 */
export function useDashboardFilters({
  members,
  filter,
  searchQuery,
}: UseDashboardFiltersProps) {
  const summary = useMemo<Summary>(() => {
    return members.reduce(
      (acc, member) => {
        acc[member.status] += 1;
        return acc;
      },
      { available: 0, busy: 0, offline: 0 }
    );
  }, [members]);

  const filteredMembers = useMemo(() => {
    let result = members;

    // Apply status filter
    if (filter !== "all") {
      result = result.filter((member) => member.status === filter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.role.toLowerCase().includes(query)
      );
    }

    return result;
  }, [members, filter, searchQuery]);

  return {
    summary,
    filteredMembers,
  };
}

