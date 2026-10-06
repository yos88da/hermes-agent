// Channel id ties a chat tab's PTY child (publisher) to its sidebar
// (subscriber).  Generated once per mount so a tab refresh starts a fresh
// channel — the previous PTY child terminates with the old WS, and its
// channel auto-evicts when no subscribers remain.
// Per-tab keep-alive identity (`?attach=`): lives here so a second tab —
// including a Chrome "Duplicate tab" — gets its own PTY instead of taking
// over this one. See #115304.

export function generateChannelId(scope?: string): string {
  const prefix = scope ? "chat" : "chat-fresh";
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now().toString(
    36,
  )}`;
}
