import { useRef, useState } from "react";
import { Group, Matrix4 } from "three";
import { XRDomOverlay, useXRHitTest } from "@react-three/xr";
import { Pyramid } from "../components/3DItens/pyramid";
import { usePinchRotate } from "../hooks/userPinchRotate";
import { ArFixedButton } from "../components/arFixedButton/arFixedButton";
const matrix = new Matrix4();

export function PyramidView() {
  const [fixed, setFixed] = useState(false);
  const [scale, orientation, handlers] = usePinchRotate();
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
            <meshBasicMaterial color="white" />
          </mesh>
        )}
        <Pyramid
          scale={scale}
          orientation={orientation}
          position={[0, 0.1 * scale, 0]}
        />
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
