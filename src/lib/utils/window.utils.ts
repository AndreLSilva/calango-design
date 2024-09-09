export function safeWindow() {
  if (typeof window === "undefined") return;
  return window;
}
