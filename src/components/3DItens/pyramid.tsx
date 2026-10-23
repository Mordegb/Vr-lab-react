import { useRef, useState } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { ConeGeometry, Mesh, Quaternion, Vector3 } from "three";
import type { Vector3Tuple } from "three";

const SIDE = 0.2;
const HEIGHT = 0.2;
const UP = new Vector3(0, 1, 0);
const spin = new Quaternion();

const geometry = new ConeGeometry(SIDE / Math.SQRT2, HEIGHT, 4);
geometry.rotateY(Math.PI / 4);

export function Pyramid({
  scale = 1,
  position = [0, 0, 0],
  orientation,
}: {
  scale?: number;
  position?: Vector3Tuple;
  orientation?: RefObject<Quaternion>;
}) {
  const ref = useRef<Mesh>(null!);
  const own = useRef(new Quaternion());
  const q = orientation ?? own;
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_, delta) => {
    if (active) q.current.premultiply(spin.setFromAxisAngle(UP, delta));
    ref.current.quaternion.copy(q.current);
  });

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      position={position}
      scale={scale}
      onClick={() => setActive((a) => !a)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial color={hover ? "#17d395" : "#d3cd17"} />
    </mesh>
  );
}
