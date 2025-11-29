import type { Availability, TeamMember } from "@/types/dashboard";
import { useState } from "react";

type UseMemberFormProps = {
  isOpen: boolean;
  initialData?: TeamMember;
};

type FormState = {
  name: string;
  role: string;
  status: Availability;
  memberId?: string; // Track which member this form is for
};

/**
 * Custom hook for member form state management
 * Form state syncs when initialData changes (for edit modal)
 */
export function useMemberForm({ isOpen, initialData }: UseMemberFormProps) {
  // Initialize state from initialData, including member ID to track changes
  const [formState, setFormState] = useState<FormState>(() => ({
    name: initialData?.name ?? "",
    role: initialData?.role ?? "",
    status: initialData?.status ?? "available",
    memberId: initialData?.id,
  }));

  // Sync form state when member changes (different member selected for editing)
  if (isOpen && initialData && formState.memberId !== initialData.id) {
    setFormState({
      name: initialData.name,
      role: initialData.role,
      status: initialData.status,
      memberId: initialData.id,
    });
  } else if (!isOpen && formState.memberId !== undefined) {
    // Modal closed - reset form
    setFormState({ name: "", role: "", status: "available", memberId: undefined });
  }

  const setName = (name: string) => setFormState((prev) => ({ ...prev, name }));
  const setRole = (role: string) => setFormState((prev) => ({ ...prev, role }));
  const setStatus = (status: Availability) =>
    setFormState((prev) => ({ ...prev, status }));

  const validate = (): boolean =>
    !!formState.name.trim() && !!formState.role.trim();

  const getFormData = (): Omit<TeamMember, "id"> => ({
    name: formState.name.trim(),
    role: formState.role.trim(),
    status: formState.status,
    tasksCompleted: initialData?.tasksCompleted ?? 0,
    returnTime: initialData?.returnTime ?? null,
  });

  return {
    name: formState.name,
    role: formState.role,
    status: formState.status,
    setName,
    setRole,
    setStatus,
    validate,
    getFormData,
  };
}
