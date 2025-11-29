import { lazy, Suspense, memo } from "react";
import type { TeamMember } from "@/types/dashboard";

// Lazy load modals for code splitting
const CreateMemberModal = lazy(() =>
  import("@/components/modal/CreateMemberModal").then((mod) => ({
    default: mod.CreateMemberModal,
  }))
);
const EditMemberModal = lazy(() =>
  import("@/components/modal/EditMemberModal").then((mod) => ({
    default: mod.EditMemberModal,
  }))
);
const DeleteMemberModal = lazy(() =>
  import("@/components/modal/DeleteMemberModal").then((mod) => ({
    default: mod.DeleteMemberModal,
  }))
);

type DashboardModalsProps = {
  createModalOpen: boolean;
  editModalOpen: boolean;
  deleteModalOpen: boolean;
  selectedMember: TeamMember | null;
  onCloseCreate: () => void;
  onCloseEdit: () => void;
  onCloseDelete: () => void;
  onCreateSubmit: (data: Omit<TeamMember, "id">) => void;
  onEditSubmit: (data: Omit<TeamMember, "id">) => void;
  onDeleteConfirm: () => void;
};

// Memoized modals container
export const DashboardModals = memo(function DashboardModals({
  createModalOpen,
  editModalOpen,
  deleteModalOpen,
  selectedMember,
  onCloseCreate,
  onCloseEdit,
  onCloseDelete,
  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm,
}: DashboardModalsProps) {
  return (
    <Suspense fallback={null}>
      {createModalOpen && (
        <CreateMemberModal
          isOpen={createModalOpen}
          onClose={onCloseCreate}
          onSubmit={onCreateSubmit}
        />
      )}
      {selectedMember && (
        <>
          {editModalOpen && (
            <EditMemberModal
              isOpen={editModalOpen}
              member={selectedMember}
              onClose={onCloseEdit}
              onSubmit={onEditSubmit}
            />
          )}
          {deleteModalOpen && (
            <DeleteMemberModal
              isOpen={deleteModalOpen}
              member={selectedMember}
              onClose={onCloseDelete}
              onConfirm={onDeleteConfirm}
            />
          )}
        </>
      )}
    </Suspense>
  );
});

