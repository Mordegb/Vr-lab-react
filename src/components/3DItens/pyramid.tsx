import { useRef, useState } from "react";
import { ConeGeometry, Mesh } from "three";
import type { Vector3Tuple } from "three";

const SIDE = 0.2;
const HEIGHT = 0.2;

const geometry = new ConeGeometry(SIDE / Math.SQRT2, HEIGHT, 4);
geometry.rotateY(Math.PI / 4);

export function Pyramid({
  scale = 1,
  position = [0, 0, 0],
}: {
  scale?: number;
  position?: Vector3Tuple;
}) {
  const ref = useRef<Mesh>(null!);
  const [hover, setHover] = useState(false);

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      position={position}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial color={hover ? "#27d317" : "#d3c017"} />
    </mesh>
  );
}
