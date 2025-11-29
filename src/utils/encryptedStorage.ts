import CryptoJS from "crypto-js";

// Use a more secure key derivation
// In production, this should be a strong, randomly generated key
const getSecretKey = (): string => {
  // Try to get from environment first
  const envKey = process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET;
  if (envKey && envKey.length >= 32) {
    return envKey;
  }

  // Fallback: use a combination of domain and a constant
  // This is less secure but better than a plain constant
  if (typeof window !== "undefined") {
    const domain = window.location.hostname;
    return `${domain}_TEAM_DASHBOARD_SECRET_KEY_${domain}`.substring(0, 32);
  }

  // Server-side fallback
  return "TEAM_DASHBOARD_SECRET_KEY_DEFAULT_32_CHARS";
};

const SECRET_KEY = getSecretKey();
const USE_ENCRYPTION = true; // Can be toggled for debugging

export const encryptedStorage = {
  setItem: (key: string, value: unknown) => {
    if (typeof window === "undefined") return;

    try {
      const stringified = JSON.stringify(value);

      if (USE_ENCRYPTION) {
        const encryptedData = CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
        localStorage.setItem(key, encryptedData);
        // Store a flag to indicate this is encrypted
        localStorage.setItem(`${key}_encrypted`, "true");
      } else {
        // Fallback: store without encryption
        localStorage.setItem(key, stringified);
        localStorage.removeItem(`${key}_encrypted`);
      }
    } catch (error) {
      console.error("Storage setItem error:", error);
      // Fallback: try storing without encryption
      try {
        const stringified = JSON.stringify(value);
        localStorage.setItem(key, stringified);
        localStorage.removeItem(`${key}_encrypted`);
      } catch (fallbackError) {
        console.error("Storage fallback error:", fallbackError);
      }
    }
  },

  getItem: (key: string) => {
    if (typeof window === "undefined") return null;

    const storedData = localStorage.getItem(key);
    if (!storedData) return null;

    const isEncrypted = localStorage.getItem(`${key}_encrypted`) === "true";

    try {
      if (isEncrypted && USE_ENCRYPTION) {
        const bytes = CryptoJS.AES.decrypt(storedData, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
          // Decryption failed, might be corrupted
          console.warn(`Decryption failed for key: ${key}`);
          localStorage.removeItem(key);
          localStorage.removeItem(`${key}_encrypted`);
          return null;
        }

        return JSON.parse(decryptedData);
      } else {
        // Data is not encrypted or encryption is disabled
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Storage getItem error:", error);
      // Try to parse as plain JSON (fallback)
      try {
        return JSON.parse(storedData);
      } catch (parseError) {
        // If all parsing fails, clear the corrupted data
        console.error("Storage corrupted, clearing:", parseError);
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_encrypted`);
        return null;
      }
    }
  },

  removeItem: (key: string) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_encrypted`);
    } catch (error) {
      console.error("Storage removeItem error:", error);
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  },
};

