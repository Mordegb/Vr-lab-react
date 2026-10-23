import { useRef, useState } from "react";
import { Group, Matrix4 } from "three";
import { XRDomOverlay, useXRHitTest } from "@react-three/xr";
import { Square } from "../components/3DItens/square";
import { usePinchScale } from "../hooks/usePinchScale";
import { XRHitTest } from "@react-three/xr";
const matrix = new Matrix4();

export function SquareView() {
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
            <meshBasicMaterial color="lime" />
          </mesh>
        )}
        <Square scale={scale} position={[0, 0.1 * scale, 0]} />
      </group>

      <XRDomOverlay style={{ width: "100%", height: "100%" }}>
        {/*tudo que aparece quando abre a camera pelo chrome no celular*/}
        <div
          {...handlers}
          style={{ position: "absolute", inset: 0, touchAction: "none" }}
        />
        <button
          onClick={altern}
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "14px 24px",
          }}
        >
          {fixed ? "Mover de novo" : "Fixar aqui"}
        </button>
      </XRDomOverlay>
    </>
  );
}
