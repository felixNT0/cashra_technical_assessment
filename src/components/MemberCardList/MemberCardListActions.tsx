import { memo, useCallback } from "react";
import type { Availability, TeamMember } from "@/types/dashboard";
import { getNextStatus } from "@/utils/status";
import { Button } from "../ui/Button";

type MemberCardListActionsProps = {
  member: TeamMember;
  onStatusChange: (status: Availability) => void;
  onEdit: () => void;
  onRemove: () => void;
};

/**
 * Action buttons for list view member card
 */
export const MemberCardListActions = memo(function MemberCardListActions({
  member,
  onStatusChange,
  onEdit,
  onRemove,
}: MemberCardListActionsProps) {
  const handleToggle = useCallback(() => {
    const nextStatus = getNextStatus(member.status);
    onStatusChange(nextStatus);
  }, [member.status, onStatusChange]);

  const nextStatus = getNextStatus(member.status);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
        <Button variant="icon" size="sm" onClick={onEdit} aria-label={`Edit ${member.name}`}>
          ✎
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onRemove}
          aria-label={`Remove ${member.name}`}
        >
          ×
        </Button>
      </div>
      <Button variant="primary" size="md" onClick={handleToggle} className="w-auto">
        <span>→</span>
        <span className="hidden sm:inline">
          Mark as {nextStatus}
        </span>
        <span className="sm:hidden">
          {nextStatus}
        </span>
      </Button>
    </div>
  );
});

