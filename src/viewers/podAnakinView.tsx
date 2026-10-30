import { Suspense, useRef, useState } from "react";
import { Group, Matrix4 } from "three";
import { XRDomOverlay, useXRHitTest } from "@react-three/xr";
import { usePinchScale } from "../hooks/usePinchScale";
import { ArFixedButton } from "../components/arFixedButton/arFixedButton";
import { PodAnakin } from "../components/3DItens/podAnakin";

const matrix = new Matrix4();
const PASSO = 0.01;

export function PodAnakinView() {
  const [scale, handlers] = usePinchScale();
  const [fixed, setFixed] = useState(false);
  const group = useRef<Group>(null!);
  const lift = useRef<Group>(null!);
  const timer = useRef<number>(null!);

  useXRHitTest((results, getWorldMatrix) => {
    if (fixed || results.length === 0) return;
    getWorldMatrix(matrix, results[0]);
    group.current.position.setFromMatrixPosition(matrix);
    group.current.visible = true;
  }, "viewer");
 
  const altern = () => setFixed((f) => !f);

  const move = (d: 1 | -1) => {
    clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      lift.current.position.y = Math.max(0, lift.current.position.y + d * PASSO);
    }, 16);
  };
  const stop = () => clearInterval(timer.current);

  const hover = (d: 1 | -1) => ({
    onPointerDown: () => move(d),
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
  });
  
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[1, 2, 1]} />

      <group ref={group} visible={false}>
        {!fixed && (
          <mesh rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.12, 0.15, 32]} />
            <meshBasicMaterial color={"#009dff" } />
          </mesh>
        )}
        <group ref={lift}>
          <Suspense fallback={null}>
            <PodAnakin scale={scale} />
          </Suspense>
        </group>
      </group>

      <XRDomOverlay style={{ width: "100%", height: "100%" }}>
        <div
          {...handlers}
          style={{ position: "absolute", inset: 0, touchAction: "none" }}
        />
        <ArFixedButton alternState={altern} fixedState={fixed} />

        <div style={estiloBotoes}>
          <button {...hover(1)} style={estiloBotao}>subir</button>
          <button {...hover(-1)} style={estiloBotao}>descer</button>
        </div>
      </XRDomOverlay>
    </>
  );
}

const estiloBotoes = {
  position: "absolute",
  bottom: 24,
  right: 16,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  zIndex: 10,
} as const;

const estiloBotao = {
  padding: "16px 24px",
  fontSize: 18,
  touchAction: "none",
  userSelect: "none",
} as const;