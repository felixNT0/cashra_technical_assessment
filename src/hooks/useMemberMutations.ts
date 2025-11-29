import type { Availability, TeamMember } from "@/types/dashboard";
import { newMemberId } from "@/utils/id";
import { getNextStatus } from "@/utils/status";
import { stampReturnTime } from "@/utils/time";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";

/**
 * Custom hook for member mutations (CRUD operations)
 * Optimized: No internal state, uses passed state and setter
 */
export function useMemberMutations(
  members: TeamMember[],
  setMembers: Dispatch<SetStateAction<TeamMember[]>>
) {
  const toggleStatus = useCallback(
    (id: string) => {
      setMembers((prev) =>
        prev.map((member) => {
          if (member.id !== id) return member;
          const currentStatus = member.status;

          // Determine next status based on current status
          // Cycle: available → busy → available → offline → available
          let nextStatus: Availability;
          if (currentStatus === "available") {
            // From available: check if member has returnTime (recently came back)
            // If they have returnTime, they can go offline; otherwise go to busy
            nextStatus = member.returnTime ? "offline" : "busy";
          } else {
            // Use the standard cycle for busy and offline
            nextStatus = getNextStatus(currentStatus);
          }

          // Rule b: Increment tasks when transitioning from busy to available
          const shouldIncrementTasks =
            currentStatus === "busy" && nextStatus === "available";

          // Rule a: Store return time when transitioning from offline to available
          const shouldSetReturnTime =
            currentStatus === "offline" && nextStatus === "available";

          return {
            ...member,
            status: nextStatus,
            tasksCompleted: shouldIncrementTasks
              ? member.tasksCompleted + 1
              : member.tasksCompleted,
            returnTime: shouldSetReturnTime
              ? stampReturnTime()
              : member.returnTime ?? null,
          };
        })
      );
    },
    [setMembers]
  );

  /**
   * Set status directly (allows selecting any status)
   * Still applies business rules when transitioning
   */
  const setStatus = useCallback(
    (id: string, newStatus: Availability) => {
      setMembers((prev) =>
        prev.map((member) => {
          if (member.id !== id) return member;
          const currentStatus = member.status;

          // If status hasn't changed, no update needed
          if (currentStatus === newStatus) return member;

          // Rule b: Increment tasks when transitioning from busy to available
          const shouldIncrementTasks =
            currentStatus === "busy" && newStatus === "available";

          // Rule a: Store return time when transitioning from offline to available
          const shouldSetReturnTime =
            currentStatus === "offline" && newStatus === "available";

          return {
            ...member,
            status: newStatus,
            tasksCompleted: shouldIncrementTasks
              ? member.tasksCompleted + 1
              : member.tasksCompleted,
            returnTime: shouldSetReturnTime
              ? stampReturnTime()
              : member.returnTime ?? null,
          };
        })
      );
    },
    [setMembers]
  );

  const addMember = useCallback(
    (data: Omit<TeamMember, "id">) => {
      const trimmedName = data.name?.trim() ?? "";
      const trimmedRole = data.role?.trim() ?? "";
      if (!trimmedName || !trimmedRole) return;

      setMembers((prev) => [
        ...prev,
        {
          id: newMemberId(),
          name: trimmedName,
          role: trimmedRole,
          status: data.status,
          tasksCompleted: data.tasksCompleted ?? 0,
          returnTime: data.status === "available" ? stampReturnTime() : null,
        },
      ]);
    },
    [setMembers]
  );

  const updateMember = useCallback(
    (id: string, payload: Partial<Omit<TeamMember, "id">>) => {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === id ? { ...member, ...payload } : member
        )
      );
    },
    [setMembers]
  );

  const removeMember = useCallback(
    (id: string) => {
      setMembers((prev) => prev.filter((member) => member.id !== id));
    },
    [setMembers]
  );

  return { toggleStatus, setStatus, addMember, updateMember, removeMember };
}
