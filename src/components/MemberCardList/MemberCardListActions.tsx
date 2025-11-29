import { memo } from "react";
import type { TeamMember } from "@/types/dashboard";
import { getNextStatus } from "@/utils/status";
import { Button } from "../ui/Button";

type MemberCardListActionsProps = {
  member: TeamMember;
  onToggle: () => void;
  onEdit: () => void;
  onRemove: () => void;
};

/**
 * Action buttons for list view member card
 */
export const MemberCardListActions = memo(function MemberCardListActions({
  member,
  onToggle,
  onEdit,
  onRemove,
}: MemberCardListActionsProps) {
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
      <Button variant="primary" size="md" onClick={onToggle} className="w-auto">
        <span>→</span>
        <span className="hidden sm:inline">
          Mark as {member.status === "available" && member.returnTime ? "offline" : getNextStatus(member.status)}
        </span>
        <span className="sm:hidden">
          {member.status === "available" && member.returnTime ? "offline" : getNextStatus(member.status)}
        </span>
      </Button>
    </div>
  );
});

