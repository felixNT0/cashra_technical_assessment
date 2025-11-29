import type { TeamMember } from "@/types/dashboard";
import { useCallback, useReducer } from "react";

type ModalState = {
  type: "create" | "edit" | "delete" | null;
  selectedMember: TeamMember | null;
};

type ModalAction =
  | { type: "OPEN_CREATE" }
  | { type: "OPEN_EDIT"; member: TeamMember }
  | { type: "OPEN_DELETE"; member: TeamMember }
  | { type: "CLOSE" };

/**
 * Optimized modal state using reducer (single state instead of 4)
 */
function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "OPEN_CREATE":
      return { type: "create", selectedMember: null };
    case "OPEN_EDIT":
      return { type: "edit", selectedMember: action.member };
    case "OPEN_DELETE":
      return { type: "delete", selectedMember: action.member };
    case "CLOSE":
      return { type: null, selectedMember: null };
    default:
      return state;
  }
}

/**
 * Custom hook for modal state management
 * Optimized: Single reducer instead of multiple useState
 */
export function useModalState() {
  const [state, dispatch] = useReducer(modalReducer, {
    type: null,
    selectedMember: null,
  });

  const openCreateModal = useCallback(() => dispatch({ type: "OPEN_CREATE" }), []);
  const openEditModal = useCallback(
    (member: TeamMember) => dispatch({ type: "OPEN_EDIT", member }),
    []
  );
  const openDeleteModal = useCallback(
    (member: TeamMember) => dispatch({ type: "OPEN_DELETE", member }),
    []
  );
  const closeModal = useCallback(() => dispatch({ type: "CLOSE" }), []);

  return {
    createModalOpen: state.type === "create",
    editModalOpen: state.type === "edit",
    deleteModalOpen: state.type === "delete",
    selectedMember: state.selectedMember,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeCreateModal: closeModal,
    closeEditModal: closeModal,
    closeDeleteModal: closeModal,
  };
}

