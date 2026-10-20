import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import type { Vector3Tuple } from "three";

export function Square({ scale = 1, position = [0, 0, 0] }: { scale?: number; position?: Vector3Tuple }){
  const ref = useRef<Mesh>(null!);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_, delta) => {
    if (active) ref.current.rotation.y += delta;
  });

  return (
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      onClick={() => setActive((a) => !a)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color={active ? "blue" : hover ? "pink" : "red"} />
    </mesh>
  );
}
