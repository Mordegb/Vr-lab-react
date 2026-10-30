import { useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Box3, Group, Vector3 } from "three";

const MODEL_URL = "/models/pod_anakin/anakins_pod_racer.glb";
const ALTURA_REAL = 0.5;

export function PodAnakin({ scale = 1 }: { scale?: number }) {
  const { scene } = useGLTF(MODEL_URL);
  const ref = useRef<Group>(null!);
  const [active, setActive] = useState(false);

  const { object, fit } = useMemo(() => {
    const object = scene.clone(true);
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    object.position.set(-center.x, -box.min.y, -center.z);
    return { object, fit: ALTURA_REAL / size.y };
  }, [scene]);

  useFrame((_, delta) => {
    if (active) ref.current.rotation.y += delta;
  });

  return (
    <group ref={ref} scale={scale * fit} onClick={() => setActive((a) => !a)}>
      <primitive object={object} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);