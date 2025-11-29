import type { Availability, TeamMember } from "@/types/dashboard";
import { memo } from "react";
import { MemberCardList } from "../MemberCardList";

type MemberCardsListProps = {
  members: TeamMember[];
  onStatusChange: (id: string, status: Availability) => void;
  onEdit: (member: TeamMember) => void;
  onRemove: (member: TeamMember) => void;
};

/**
 * List view for member cards
 */
export const MemberCardsList = memo(function MemberCardsList({
  members,
  onStatusChange,
  onEdit,
  onRemove,
}: MemberCardsListProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-2.5">
      {members.map((member) => (
        <MemberCardList
          key={member.id}
          member={member}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
});
