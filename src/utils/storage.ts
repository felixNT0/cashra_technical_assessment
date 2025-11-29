import type { DashboardState } from "@/types/dashboard";
import { logError } from "./errors";
import { encryptedStorage } from "./encryptedStorage";

const STORAGE_KEY = "team-dashboard-state";
const DEBOUNCE_DELAY = 300; // ms

let saveTimeout: NodeJS.Timeout | null = null;

/**
 * Validates dashboard state structure
 */
const isValidDashboardState = (data: unknown): data is DashboardState => {
  if (!data || typeof data !== "object") return false;
  const state = data as Record<string, unknown>;
  return (
    Array.isArray(state.members) &&
    typeof state.filter === "string" &&
    ["all", "available", "busy", "offline"].includes(state.filter)
  );
};

/**
 * Debounced encrypted localStorage write to prevent excessive writes
 */
export const saveToStorage = (state: DashboardState): void => {
  if (typeof window === "undefined") return;

  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(() => {
    try {
      encryptedStorage.setItem(STORAGE_KEY, state);
    } catch (error) {
      logError(error, {
        action: "saveToStorage",
        component: "storage",
      });
    } finally {
      saveTimeout = null;
    }
  }, DEBOUNCE_DELAY);
};

/**
 * Synchronous read from encrypted localStorage with validation
 */
export const loadFromStorage = (): DashboardState | null => {
  if (typeof window === "undefined") return null;

  try {
    const parsed = encryptedStorage.getItem(STORAGE_KEY);
    if (!parsed) return null;

    if (!isValidDashboardState(parsed)) {
      logError(new Error("Invalid dashboard state structure"), {
        action: "loadFromStorage",
        component: "storage",
      });
      return null;
    }

    return parsed;
  } catch (error) {
    logError(error, {
      action: "loadFromStorage",
      component: "storage",
    });
    return null;
  }
};

