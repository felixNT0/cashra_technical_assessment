import type { TeamMember } from "@/types/dashboard";

type TeamStats = {
  totalTasks: number;
  onlineRatio: number;
  topPerformer?: TeamMember;
};

/**
 * Calculates team statistics accurately
 */
export const getTeamStats = (members: TeamMember[]): TeamStats => {
  if (members.length === 0) {
    return { totalTasks: 0, onlineRatio: 0 };
  }

  let totalTasks = 0;
  let onlineCount = 0;
  let topPerformer: TeamMember | undefined;

  for (const member of members) {
    // Sum all tasks completed
    totalTasks += member.tasksCompleted ?? 0;

    // Count online members (available or busy)
    if (member.status === "available" || member.status === "busy") {
      onlineCount += 1;
    }

    // Find top performer (highest tasks completed)
    if (
      !topPerformer ||
      (member.tasksCompleted ?? 0) > (topPerformer.tasksCompleted ?? 0)
    ) {
      topPerformer = member;
    }
  }

  return {
    totalTasks,
    onlineRatio: members.length > 0 ? onlineCount / members.length : 0,
    topPerformer,
  };
};

/**
 * Formats decimal ratio as percentage
 */
export const formatPercent = (value: number): string => {
  const percent = Math.round(value * 100);
  return `${percent}%`;
};

