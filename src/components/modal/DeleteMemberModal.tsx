"use client";

import type { TeamMember } from "@/types/dashboard";
import { Button } from "../ui/Button";
import { BaseModal } from "./BaseModal";

type Props = {
  isOpen: boolean;
  member: TeamMember;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteMemberModal({
  isOpen,
  member,
  onClose,
  onConfirm,
}: Props) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      open={isOpen}
      onClose={onClose}
      title="Remove teammate"
      footer={
        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            size="lg"
            className="rounded-2xl w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            variant="primary"
            size="lg"
            className="rounded-2xl w-full bg-linear-to-r from-rose-500 to-red-500 shadow-rose-400/40"
          >
            Remove
          </Button>
        </div>
      }
    >
      <p className="text-sm text-slate-600">
        This will remove{" "}
        <span className="font-semibold text-slate-900">{member.name}</span> from
        the dashboard. Their history will no longer appear in the feed.
      </p>
    </BaseModal>
  );
}
