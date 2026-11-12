export type PublicEvent = "page_view" | "demo_interaction" | "route_download" | "form_view";
export function track(event: PublicEvent) {
  try {
    const key = `stylist-event:${event}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    void fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event }), keepalive: true }).catch(() => {});
  } catch { /* Browsing and forms also work when storage is unavailable. */ }
}
