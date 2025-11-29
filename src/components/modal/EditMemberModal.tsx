"use client";

import type { TeamMember } from "@/types/dashboard";
import { Button } from "../ui/Button";
import { BaseModal } from "./BaseModal";
import { MemberFormFields } from "./MemberFormFields";
import { useMemberForm } from "./useMemberForm";

type Props = {
  isOpen: boolean;
  member: TeamMember;
  onClose: () => void;
  onSubmit: (payload: Omit<TeamMember, "id">) => void;
};

export function EditMemberModal({ isOpen, member, onClose, onSubmit }: Props) {
  const {
    name,
    role,
    status,
    setName,
    setRole,
    setStatus,
    validate,
    getFormData,
  } = useMemberForm({ isOpen, initialData: member });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(getFormData());
    onClose();
  };

  return (
    <BaseModal
      open={isOpen}
      onClose={onClose}
      title="Edit teammate"
      footer={
        <Button
          type="submit"
          form="edit-member-form"
          variant="primary"
          size="lg"
          className="rounded-2xl"
        >
          Save changes
        </Button>
      }
    >
      <form id="edit-member-form" onSubmit={handleSubmit}>
        <MemberFormFields
          name={name}
          role={role}
          status={status}
          onNameChange={setName}
          onRoleChange={setRole}
          onStatusChange={setStatus}
          formId="edit-member-form"
        />
      </form>
    </BaseModal>
  );
}
