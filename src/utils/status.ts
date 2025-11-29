import type { Availability } from "@/types/dashboard";

/**
 * Get the next status in the cycle
 * Cycle: available → busy → offline → available (repeats)
 */
export function getNextStatus(currentStatus: Availability): Availability {
  if (currentStatus === "available") {
    return "busy"; // available → busy: start working
  } else if (currentStatus === "busy") {
    return "offline"; // busy → offline: go offline
  } else {
    return "available"; // offline → available: return (stores return time)
  }
}

/**
 * Get the status after available (for going offline)
 * This allows: available → offline
 */
export function getStatusAfterAvailable(): Availability {
  return "offline";
}

