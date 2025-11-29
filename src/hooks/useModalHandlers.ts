import type { TeamMember } from "@/types/dashboard";
import { useCallback } from "react";

type UseModalHandlersProps = {
  selectedMember: TeamMember | null;
  closeCreateModal: () => void;
  closeEditModal: () => void;
  closeDeleteModal: () => void;
};

type UseModalHandlersReturn = {
  handleCreateSubmit: (
    data: Omit<TeamMember, "id">,
    onAdd: (data: Omit<TeamMember, "id">) => void
  ) => void;
  handleEditSubmit: (
    data: Omit<TeamMember, "id">,
    onUpdate: (id: string, data: Omit<TeamMember, "id">) => void
  ) => void;
  handleDeleteConfirm: (onRemove: (id: string) => void) => void;
};

/**
 * Custom hook for modal submit handlers
 */
export function useModalHandlers({
  selectedMember,
  closeCreateModal,
  closeEditModal,
  closeDeleteModal,
}: UseModalHandlersProps): UseModalHandlersReturn {
  const handleCreateSubmit = useCallback(
    (
      data: Omit<TeamMember, "id">,
      onAdd: (data: Omit<TeamMember, "id">) => void
    ) => {
      onAdd(data);
      closeCreateModal();
    },
    [closeCreateModal]
  );

  const handleEditSubmit = useCallback(
    (
      data: Omit<TeamMember, "id">,
      onUpdate: (id: string, data: Omit<TeamMember, "id">) => void
    ) => {
      if (selectedMember) {
        onUpdate(selectedMember.id, data);
        closeEditModal();
      }
    },
    [selectedMember, closeEditModal]
  );

  const handleDeleteConfirm = useCallback(
    (onRemove: (id: string) => void) => {
      if (selectedMember) {
        onRemove(selectedMember.id);
        closeDeleteModal();
      }
    },
    [selectedMember, closeDeleteModal]
  );

  return {
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteConfirm,
  };
}
