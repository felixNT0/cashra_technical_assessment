import { memo } from "react";
import type { TeamMember } from "@/types/dashboard";
import { MemberCardList } from "../MemberCardList";

type MemberCardsListProps = {
  members: TeamMember[];
  onToggle: (id: string) => void;
  onEdit: (member: TeamMember) => void;
  onRemove: (member: TeamMember) => void;
};

/**
 * List view for member cards
 */
export const MemberCardsList = memo(function MemberCardsList({
  members,
  onToggle,
  onEdit,
  onRemove,
}: MemberCardsListProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-2.5">
      {members.map((member) => (
        <MemberCardList
          key={member.id}
          member={member}
          onToggle={onToggle}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
});

