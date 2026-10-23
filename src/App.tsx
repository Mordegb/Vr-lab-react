(window as any).XRWebGLBinding = undefined //fez o objeto 3D voltar renderizar na camera normal
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { SquareView } from "./viewers/squareView";
import { PyramidView } from "./viewers/pyramidView";

const store = createXRStore();

export default function App() {
  return (
    <>
      <button
        onClick={() => store.enterAR()}
        style={{ position: "fixed", zIndex: 10, top: 20, left: 20 }}
      >
        Iniciar RA
      </button>
      <Canvas style={{ position: "fixed", inset: 0 }}>
        <XR store={store}>
          {/* <SquareView></SquareView> */}
          <PyramidView></PyramidView>
        </XR>
      </Canvas>
    </>
  );
}
