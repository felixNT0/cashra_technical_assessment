import { memo } from "react";
import type { TeamMember } from "@/types/dashboard";
import { MemberCard } from "../MemberCard";

type MemberCardsGridProps = {
  members: TeamMember[];
  onToggle: (id: string) => void;
  onEdit: (member: TeamMember) => void;
  onRemove: (member: TeamMember) => void;
};

/**
 * Grid view for member cards
 */
export const MemberCardsGrid = memo(function MemberCardsGrid({
  members,
  onToggle,
  onEdit,
  onRemove,
}: MemberCardsGridProps) {
  return (
    <div className="grid auto-rows-max gap-2.5 sm:gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {members.map((member) => (
        <MemberCard
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

