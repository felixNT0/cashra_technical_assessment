import type { Filter, TeamMember } from "@/types/dashboard";
import { loadFromStorage, saveToStorage } from "@/utils/storage";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";

type UseDashboardStorageProps = {
  members: TeamMember[];
  filter: Filter;
  setMembers: Dispatch<SetStateAction<TeamMember[]>>;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

/**
 * Custom hook for localStorage persistence
 */
export function useDashboardStorage({
  members,
  filter,
  setMembers,
  setFilter,
}: UseDashboardStorageProps) {
  const hasHydrated = useRef(false);

  // Hydrate from localStorage once (SSR-safe)
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored?.members && stored?.filter) {
      setMembers(stored.members);
      setFilter(stored.filter);
    }
    hasHydrated.current = true;
  }, [setMembers, setFilter]);

  // Persist changes after hydration (debounced)
  useEffect(() => {
    if (!hasHydrated.current) return;
    saveToStorage({ members, filter });
  }, [members, filter]);
}

