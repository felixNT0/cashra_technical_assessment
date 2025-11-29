import type { TeamMember } from "@/types/dashboard";
import { useModalHandlers } from "./useModalHandlers";
import { useModalState } from "./useModalState";

type UseMemberModalsReturn = {
  createModalOpen: boolean;
  editModalOpen: boolean;
  deleteModalOpen: boolean;
  selectedMember: TeamMember | null;
  openCreateModal: () => void;
  openEditModal: (member: TeamMember) => void;
  openDeleteModal: (member: TeamMember) => void;
  closeCreateModal: () => void;
  closeEditModal: () => void;
  closeDeleteModal: () => void;
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
 * Main hook for member modal management
 * Combines modal state and handlers
 */
export function useMemberModals(): UseMemberModalsReturn {
  const modalState = useModalState();
  const handlers = useModalHandlers({
    selectedMember: modalState.selectedMember,
    closeCreateModal: modalState.closeCreateModal,
    closeEditModal: modalState.closeEditModal,
    closeDeleteModal: modalState.closeDeleteModal,
  });

  return {
    ...modalState,
    ...handlers,
  };
}
