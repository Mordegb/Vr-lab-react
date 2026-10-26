import { Suspense, useRef, useState } from "react";
import { Group, Matrix4 } from "three";
import { XRDomOverlay, useXRHitTest } from "@react-three/xr";
import { CopyMachine } from "../components/3DItens/copyMachine";
import { usePinchScale } from "../hooks/usePinchScale";
import { ArFixedButton } from "../components/arFixedButton/arFixedButton";
const matrix = new Matrix4();

export function CopyMachineView() {
  const [scale, handlers] = usePinchScale();
  const [fixed, setFixed] = useState(false);
  const group = useRef<Group>(null!);
  const posicion = useRef(true);

  useXRHitTest((results, getWorldMatrix) => {
    if (!posicion.current || results.length === 0) return;
    getWorldMatrix(matrix, results[0]);
    group.current.position.setFromMatrixPosition(matrix);
    group.current.visible = true;
  }, "viewer");

  const altern = () => {
    posicion.current = !posicion.current;
    setFixed(!posicion.current);
  };

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[1, 2, 1]} />

      <group ref={group} visible={false}>
        {!fixed && (
          <mesh rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.12, 0.15, 32]} />
            <meshBasicMaterial color={"#00ff5e"} />
          </mesh>
        )}
        <Suspense fallback={null}>
          <CopyMachine scale={scale} />
        </Suspense>
      </group>

      <XRDomOverlay style={{ width: "100%", height: "100%" }}>
        <div
          {...handlers}
          style={{ position: "absolute", inset: 0, touchAction: "none" }}
        />
        <ArFixedButton alternState={altern} fixedState={fixed}></ArFixedButton>
      </XRDomOverlay>
    </>
  );
}
