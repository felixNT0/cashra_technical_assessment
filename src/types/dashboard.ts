export type Availability = "available" | "busy" | "offline";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  status: Availability;
  tasksCompleted: number;
  returnTime?: string | null;
};

export type Filter = "all" | Availability;

export type Summary = {
  available: number;
  busy: number;
  offline: number;
};

export type DashboardState = {
  members: TeamMember[];
  filter: Filter;
};

