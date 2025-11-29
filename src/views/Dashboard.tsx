"use client";

import { DashboardBackground } from "@/components/DashboardBackground";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardMain } from "@/components/DashboardMain";
import { DashboardModals } from "@/components/DashboardModals";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { useMemberModals } from "@/hooks/useMemberModals";
import { useTeamDashboardState } from "@/hooks/useTeamDashboardState";
import { useToast } from "@/hooks/useToast";
import { useCallback } from "react";

// Single-screen dashboard optimized for desktop (no scrolling) with full responsiveness
export function Dashboard() {
  const { toasts, showSuccess, removeToast } = useToast();

  const {
    members,
    filteredMembers,
    filter,
    summary,
    setFilter,
    searchQuery,
    setSearchQuery,
    setStatus,
    addMember,
    updateMember,
    removeMember,
  } = useTeamDashboardState();

  const {
    createModalOpen,
    editModalOpen,
    deleteModalOpen,
    selectedMember,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    handleCreateSubmit,
    handleEditSubmit,
    handleDeleteConfirm,
  } = useMemberModals();

  // Wrapped handlers with toast notifications
  const handleStatusChangeWithToast = useCallback(
    (id: string, status: string) => {
      const member = members.find((m) => m.id === id);
      if (member) {
        setStatus(id, status as "available" | "busy" | "offline");
        showSuccess(`Updated ${member.name}'s status to ${status}`);
      }
    },
    [members, setStatus, showSuccess]
  );

  const handleCreateSubmitMemo = useCallback(
    (data: Parameters<typeof handleCreateSubmit>[0]) => {
      handleCreateSubmit(data, addMember);
      showSuccess(`Added ${data.name} to the team`);
    },
    [handleCreateSubmit, addMember, showSuccess]
  );

  const handleEditSubmitMemo = useCallback(
    (data: Parameters<typeof handleEditSubmit>[0]) => {
      if (selectedMember) {
        handleEditSubmit(data, updateMember);
        showSuccess(`Updated ${data.name}'s information`);
      }
    },
    [handleEditSubmit, updateMember, selectedMember, showSuccess]
  );

  const handleDeleteConfirmMemo = useCallback(() => {
    if (selectedMember) {
      const memberName = selectedMember.name;
      handleDeleteConfirm(removeMember);
      showSuccess(`Removed ${memberName} from the team`);
    }
  }, [handleDeleteConfirm, removeMember, selectedMember, showSuccess]);

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-sky-50 via-indigo-50 to-purple-50 text-slate-900 lg:h-screen lg:overflow-hidden lg:max-h-screen">
      <DashboardBackground />
      <DashboardHeader summary={summary} onAddClick={openCreateModal} />
      <DashboardMain
        members={members}
        filteredMembers={filteredMembers}
        filter={filter}
        searchQuery={searchQuery}
        onFilterChange={setFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={handleStatusChangeWithToast}
        onEdit={openEditModal}
        onRemove={openDeleteModal}
      />
      <DashboardModals
        createModalOpen={createModalOpen}
        editModalOpen={editModalOpen}
        deleteModalOpen={deleteModalOpen}
        selectedMember={selectedMember}
        onCloseCreate={closeCreateModal}
        onCloseEdit={closeEditModal}
        onCloseDelete={closeDeleteModal}
        onCreateSubmit={handleCreateSubmitMemo}
        onEditSubmit={handleEditSubmitMemo}
        onDeleteConfirm={handleDeleteConfirmMemo}
      />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
