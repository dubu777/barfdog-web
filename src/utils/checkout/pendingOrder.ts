import { OrderType } from "@/types";

const PREFIX = "pending";

const keyOf = (orderType: OrderType, id: number) =>
  `${PREFIX}:${orderType}:${id}`;

export function setPendingOrder(orderType: OrderType, id: number) {
  try {
    const value = JSON.stringify({
      status: "pending",
      orderType,
      id,
      createdAt: Date.now(),
    });
    sessionStorage.setItem(keyOf(orderType, id), value);
    console.debug("[pending:set]", keyOf(orderType, id), value);
  } catch {}
}

export function clearPendingOrder(orderType: OrderType, id: number) {
  try {
    sessionStorage.removeItem(keyOf(orderType, id));
    console.debug("[pending:clear]", keyOf(orderType, id));
  } catch {}
}

export function listPendingOrder(orderType: OrderType): number[] {
  try {
    const ids: number[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i)!;
      const prefix = `${PREFIX}:${orderType}:`;
      if (k.startsWith(prefix)) {
        const id = Number(k.slice(prefix.length));
        if (Number.isFinite(id)) ids.push(id);
      }
    }
    return ids;
  } catch {
    return [];
  }
}

export function cancelBeacon(url: string) {
  try {
    const body = new Blob([JSON.stringify({ reason: "page_unload" })], {
      type: "application/json",
    });
    if (navigator.sendBeacon?.(url, body)) return;
    // fallback (iOS/Safari 등)
    fetch(url, { method: "POST", body, keepalive: true }).catch(() => {});
  } catch {}
}
