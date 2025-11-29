const FALLBACK_PREFIX = "member";

export const newMemberId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${FALLBACK_PREFIX}-${Date.now()}-${Math.round(Math.random() * 1e5)}`;
};

