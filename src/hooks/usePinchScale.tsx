import { useRef, useState } from "react";

export function usePinchScale(min = 0.3, max = 4) {
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const start = useRef<{ dist: number; scale: number } | null>(null);

  const dist = () => {
    const [a, b] = [...pointers.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const end = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    start.current = null;
  };

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.current.size === 2) {
        start.current = { dist: dist(), scale: scaleRef.current };
      }
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.current.size === 2 && start.current) {
        const next = start.current.scale * (dist() / start.current.dist);
        const clamped = Math.min(max, Math.max(min, next));
        scaleRef.current = clamped;
        setScale(clamped);
      }
    },
    onPointerUp: end,
    onPointerCancel: end,
  };

  return [scale, handlers] as const;
}
