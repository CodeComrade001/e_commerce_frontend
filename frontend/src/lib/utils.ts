// src/lib/utils.ts
// A simple utility function to conditionally combine class names
export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
