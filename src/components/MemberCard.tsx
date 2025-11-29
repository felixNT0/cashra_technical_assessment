import { memo, useCallback } from "react";
import type { Availability, TeamMember } from "@/types/dashboard";
import { STATUS_BAR_STYLES } from "@/utils/constants";
import { getNextStatus } from "@/utils/status";
import { displayReturnTime, hasReturnHistory } from "@/utils/time";
import { Button } from "./ui/Button";
import { OnlineIndicator } from "./ui/OnlineIndicator";
import { StatusBadge } from "./ui/StatusBadge";

type MemberCardProps = {
  member: TeamMember;
  onStatusChange: (id: string, status: Availability) => void;
  onEdit: (member: TeamMember) => void;
  onRemove: (member: TeamMember) => void;
};

// Memoized component to prevent unnecessary re-renders
export const MemberCard = memo(function MemberCard({
  member,
  onStatusChange,
  onEdit,
  onRemove,
}: MemberCardProps) {
  const seenReturn = hasReturnHistory(member.returnTime);

  // Memoized handlers to prevent prop changes
  const handleToggle = useCallback(() => {
    const nextStatus = getNextStatus(member.status);
    onStatusChange(member.id, nextStatus);
  }, [member.id, member.status, onStatusChange]);
  const handleEdit = useCallback(() => onEdit(member), [member, onEdit]);
  const handleRemove = useCallback(() => onRemove(member), [member, onRemove]);

  const nextStatus = getNextStatus(member.status);

  return (
    <article className="group relative flex h-full flex-col gap-2 rounded-xl border border-white/60 bg-linear-to-br from-white/95 to-white/80 p-3 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/20 active:scale-[0.99] touch-manipulation sm:gap-2.5 sm:rounded-2xl sm:p-3.5 md:gap-3 md:p-4">
      {/* Status indicator bar */}
      <div
        className={`absolute left-0 top-0 h-0.5 w-full rounded-t-xl sm:h-1 sm:rounded-t-2xl ${STATUS_BAR_STYLES[member.status]}`}
      />

      <header className="flex flex-col gap-2 pt-0.5 sm:gap-2.5 sm:pt-1 relative z-10">
        {/* Top row: Status badge, online indicator, and action buttons */}
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <StatusBadge status={member.status} size="sm" />
            <OnlineIndicator status={member.status} size="sm" />
          </div>
          <div className="flex gap-0.5 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 sm:gap-1">
            <Button variant="icon" size="sm" onClick={handleEdit} aria-label={`Edit ${member.name}`}>
              ✎
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleRemove}
              aria-label={`Remove ${member.name}`}
            >
              ×
            </Button>
          </div>
        </div>
        {/* Name row - moved down */}
        <h3 
          className="text-xs font-bold text-slate-900 leading-tight sm:text-sm lg:text-base truncate w-full"
          title={member.name}
        >
          {member.name}
        </h3>
        {/* Role row */}
        <p 
          className="text-[10px] font-medium text-slate-500 leading-tight truncate sm:text-xs w-full"
          title={member.role}
        >
          {member.role}
        </p>
      </header>

      <dl className="space-y-1.5 text-[10px] sm:space-y-2 sm:text-xs">
        <div className="flex items-center justify-between rounded-lg bg-slate-50/50 px-2 py-1 sm:px-2.5 sm:py-1.5">
          <dt className="font-medium text-slate-600">Tasks</dt>
          <dd className="font-bold text-slate-900">{member.tasksCompleted}</dd>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-50/50 px-2 py-1 sm:px-2.5 sm:py-1.5">
          <dt className="font-medium text-slate-600">Return</dt>
          <dd className="font-bold text-slate-900">
            {seenReturn ? displayReturnTime(member.returnTime) : "—"}
          </dd>
        </div>
      </dl>

      <Button variant="primary" size="md" onClick={handleToggle} className="mt-auto">
        <span>→</span>
        <span className="hidden sm:inline">
          Mark as {nextStatus}
        </span>
        <span className="sm:hidden">
          {nextStatus}
        </span>
      </Button>
    </article>
  );
});

