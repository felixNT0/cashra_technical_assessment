const PLACEHOLDER = "—";

// Present return timestamps consistently across the UI
export const displayReturnTime = (value?: string | null) =>
  value ?? PLACEHOLDER;

// Locale-aware stamp captured when teammates come back online
export const stampReturnTime = () =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

// Tiny helper that communicates when a teammate has never been offline
export const hasReturnHistory = (value?: string | null) =>
  Boolean(value && value !== PLACEHOLDER);
