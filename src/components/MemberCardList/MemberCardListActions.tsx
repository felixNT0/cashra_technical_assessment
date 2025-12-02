import { memo, useCallback } from "react";
import type { Availability, TeamMember } from "@/types/dashboard";
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
  const handleSetStatus = useCallback(
    (status: Availability) => {
      onStatusChange(status);
    },
    [onStatusChange]
  );

  return (
    <div className="flex flex-col items-end gap-1.5 min-w-[140px] sm:min-w-[170px]">
      {/* Edit / Remove actions */}
      <div className="flex gap-0.5 rounded-full bg-slate-50/80 px-1 py-0.5 shadow-sm opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 sm:gap-1">
        <Button
          variant="icon"
          size="sm"
          onClick={onEdit}
          aria-label={`Edit ${member.name}`}
        >
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
      {/* Segmented status control for list view */}
      <div className="flex w-full gap-1 rounded-xl bg-slate-50/90 p-1 shadow-sm">
        {(["available", "busy", "offline"] as Availability[]).map((status) => {
          const isActive = member.status === status;
          const label =
            status === "available"
              ? "Avail."
              : status === "busy"
              ? "Busy"
              : "Off";

          return (
            <Button
              key={status}
              type="button"
              size="sm"
              variant={isActive ? "primary" : "secondary"}
              className={`flex-1 min-w-[40px] px-2 text-[10px] sm:text-[11px] ${
                isActive ? "font-semibold" : "font-medium text-slate-500"
              }`}
              onClick={() => handleSetStatus(status)}
              aria-pressed={isActive}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
});

