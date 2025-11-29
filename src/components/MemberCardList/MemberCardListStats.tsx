import { memo } from "react";
import type { TeamMember } from "@/types/dashboard";
import { displayReturnTime, hasReturnHistory } from "@/utils/time";

type MemberCardListStatsProps = {
  member: TeamMember;
};

/**
 * Stats section for list view member card
 */
export const MemberCardListStats = memo(function MemberCardListStats({
  member,
}: MemberCardListStatsProps) {
  const seenReturn = hasReturnHistory(member.returnTime);

  return (
    <div className="hidden items-center gap-4 sm:flex">
      <div className="text-center">
        <p className="text-[10px] font-medium text-slate-500">Tasks</p>
        <p className="text-sm font-bold text-slate-900">{member.tasksCompleted}</p>
      </div>
      <div className="text-center">
        <p className="text-[10px] font-medium text-slate-500">Return</p>
        <p className="text-sm font-bold text-slate-900">
          {seenReturn ? displayReturnTime(member.returnTime) : "—"}
        </p>
      </div>
    </div>
  );
});

