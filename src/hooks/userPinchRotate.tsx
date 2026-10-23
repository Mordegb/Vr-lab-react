import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";

const SENSIBILIDADE = 0.01; // radianos por pixel arrastado

const UP = new Vector3(0, 1, 0);
const RIGHT = new Vector3(1, 0, 0);
const camQ = new Quaternion();
const qUp = new Quaternion();
const qRight = new Quaternion();
const axisUp = new Vector3();
const axisRight = new Vector3();

type Point = { x: number; y: number };

export function usePinchRotate(min = 0.3, max = 4) {
  const camera = useThree((s) => s.camera);

  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const orientation = useRef(new Quaternion());

  const pointers = useRef(new Map<number, Point>());
  const start = useRef<{ dist: number; scale: number } | null>(null);
  const lastCenter = useRef<Point | null>(null);

  const measure = () => {
    const [a, b] = [...pointers.current.values()];
    return {
      dist: Math.hypot(a.x - b.x, a.y - b.y),
      center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    };
  };

  const end = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    start.current = null;
    lastCenter.current = null;
  };

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.current.size === 2) {
        const m = measure();
        start.current = { dist: m.dist, scale: scaleRef.current };
        lastCenter.current = m.center;
      }
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.current.size !== 2 || !start.current || !lastCenter.current) return;

      const m = measure();

      const next = start.current.scale * (m.dist / start.current.dist);
      const clamped = Math.min(max, Math.max(min, next));
      scaleRef.current = clamped;
      setScale(clamped);

      const dx = m.center.x - lastCenter.current.x;
      const dy = m.center.y - lastCenter.current.y;
      lastCenter.current = m.center;


      camera.getWorldQuaternion(camQ);
      axisUp.copy(UP).applyQuaternion(camQ);
      axisRight.copy(RIGHT).applyQuaternion(camQ);
      qUp.setFromAxisAngle(axisUp, dx * SENSIBILIDADE);
      qRight.setFromAxisAngle(axisRight, dy * SENSIBILIDADE);
      orientation.current.premultiply(qUp).premultiply(qRight);
    },
    onPointerUp: end,
    onPointerCancel: end,
  };

  return [scale, orientation, handlers] as const;
}