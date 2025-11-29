"use client";

import type { TeamMember } from "@/types/dashboard";
import { Button } from "../ui/Button";
import { BaseModal } from "./BaseModal";
import { MemberFormFields } from "./MemberFormFields";
import { useMemberForm } from "./useMemberForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: Omit<TeamMember, "id">) => void;
};

export function CreateMemberModal({ isOpen, onClose, onSubmit }: Props) {
  const {
    name,
    role,
    status,
    setName,
    setRole,
    setStatus,
    validate,
    getFormData,
  } = useMemberForm({ isOpen });

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
      title="Add teammate"
      footer={
        <Button
          type="submit"
          form="create-member-form"
          variant="primary"
          size="lg"
          className="rounded-2xl"
        >
          Save teammate
        </Button>
      }
    >
      <form id="create-member-form" onSubmit={handleSubmit}>
        <MemberFormFields
          name={name}
          role={role}
          status={status}
          onNameChange={setName}
          onRoleChange={setRole}
          onStatusChange={setStatus}
          formId="create-member-form"
        />
      </form>
    </BaseModal>
  );
}
