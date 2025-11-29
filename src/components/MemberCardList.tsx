import { memo, useCallback } from "react";
// import { STATUS_BAR_STYLES } from "@/utils/constants";
import type { Availability, TeamMember } from "@/types/dashboard";
import { MemberCardListActions } from "./MemberCardList/MemberCardListActions";
import { MemberCardListStats } from "./MemberCardList/MemberCardListStats";
import { OnlineIndicator } from "./ui/OnlineIndicator";
import { StatusBadge } from "./ui/StatusBadge";

type MemberCardListProps = {
  member: TeamMember;
  onStatusChange: (id: string, status: Availability) => void;
  onEdit: (member: TeamMember) => void;
  onRemove: (member: TeamMember) => void;
};

/**
 * List view variant of member card
 */
export const MemberCardList = memo(function MemberCardList({
  member,
  onStatusChange,
  onEdit,
  onRemove,
}: MemberCardListProps) {
  const handleStatusChange = useCallback(
    (status: Availability) => onStatusChange(member.id, status),
    [member.id, onStatusChange]
  );
  const handleEdit = useCallback(() => onEdit(member), [member, onEdit]);
  const handleRemove = useCallback(() => onRemove(member), [member, onRemove]);

  return (
    <article className="group relative flex items-center gap-4 rounded-xl border border-white/60 bg-linear-to-br from-white/95 to-white/80 p-4 shadow-md shadow-slate-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-brand/20 active:scale-[0.99] touch-manipulation">
      {/* <div className={`h-full w-1 rounded-l-xl ${STATUS_BAR_STYLES[member.status]}`} /> */}
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1 min-w-0 overflow-hidden relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 min-w-0 w-full">
              <h3
                className="text-sm font-bold text-slate-900 leading-tight truncate flex-1 min-w-0 sm:text-base"
                title={member.name}
              >
                {member.name}
              </h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <OnlineIndicator status={member.status} size="md" />
                <StatusBadge status={member.status} size="md" />
              </div>
            </div>
            <p
              className="text-[11px] font-medium text-slate-500 leading-tight truncate sm:text-xs w-full"
              title={member.role}
            >
              {member.role}
            </p>
          </div>
        </div>
        <MemberCardListStats member={member} />
        <MemberCardListActions
          member={member}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      </div>
    </article>
  );
});
