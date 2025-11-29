import type { Availability, Filter, TeamMember } from "@/types/dashboard";

export const STORAGE_KEY = "team-dashboard-state";

export const TEAM_BASELINE: TeamMember[] = [
  {
    id: "1",
    name: "Elena Ortiz",
    role: "Product Manager",
    status: "available",
    tasksCompleted: 4,
  },
  {
    id: "2",
    name: "Marcus Lee",
    role: "Frontend Engineer",
    status: "busy",
    tasksCompleted: 6,
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Backend Engineer",
    status: "offline",
    tasksCompleted: 5,
  },
  {
    id: "4",
    name: "Jonas Meyer",
    role: "Designer",
    status: "available",
    tasksCompleted: 3,
  },
  {
    id: "5",
    name: "Maya Chen",
    role: "QA Analyst",
    status: "busy",
    tasksCompleted: 7,
  },
  {
    id: "6",
    name: "Noah Wright",
    role: "Solutions Architect",
    status: "offline",
    tasksCompleted: 2,
  },
];

export const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "offline", label: "Offline" },
];

export const STATUS_OPTIONS: { value: Availability; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
  { value: "offline", label: "Offline" },
];

/**
 * Status cycle: available → busy → available → offline → available
 * - available → busy: Start working
 * - busy → available: Complete task (increments task counter) - Rule b
 * - available → offline: Go offline (after completing task)
 * - offline → available: Return (stores return time) - Rule a
 *
 * Note: The cycle allows going to offline by clicking toggle when status is "available"
 * Full cycle: available → busy → available → offline → available
 */
export const NEXT_STATUS: Record<Availability, Availability> = {
  available: "busy", // available → busy: start working
  busy: "available", // busy → available: complete task (increments tasks) - Rule b
  offline: "available", // offline → available: return (stores return time) - Rule a
};
