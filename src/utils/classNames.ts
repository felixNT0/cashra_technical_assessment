/**
 * Simple utility to merge class names
 * Replaces tailwind-merge without external dependency
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

