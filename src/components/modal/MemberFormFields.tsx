import type { Availability } from "@/types/dashboard";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

const STATUS_OPTIONS: Array<{ value: Availability; label: string }> = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "offline", label: "Offline" },
];

type MemberFormFieldsProps = {
  name: string;
  role: string;
  status: Availability;
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: Availability) => void;
  formId: string;
};

/**
 * Reusable form fields for member creation/editing
 */
export function MemberFormFields({
  name,
  role,
  status,
  onNameChange,
  onRoleChange,
  onStatusChange,
}: MemberFormFieldsProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Name"
        placeholder="e.g. Julian Brooks"
        required
        minLength={1}
        maxLength={100}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        aria-required="true"
        aria-label="Team member name"
        className="rounded-2xl"
      />
      <Input
        label="Role"
        placeholder="e.g. DevOps Engineer"
        required
        minLength={1}
        maxLength={100}
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        aria-required="true"
        aria-label="Team member role"
        className="rounded-2xl"
      />
      <Select
        label="Status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value as Availability)}
        options={STATUS_OPTIONS}
        aria-label="Team member status"
        className="rounded-2xl"
      />
    </div>
  );
}

