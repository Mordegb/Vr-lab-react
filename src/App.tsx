(window as any).XRWebGLBinding = undefined; //fez o objeto 3D voltar renderizar na camera normal
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { SquareView } from "./viewers/squareView";
import { PyramidView } from "./viewers/pyramidView";
import { EnterViewer } from "./components/enterViewer";

const storeSquare = createXRStore();
const storePyramid = createXRStore();

export default function App() {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 10,
        top: 20,
        left: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <EnterViewer geometricForm="square" store={storeSquare} text="Ver cubo" />
      <EnterViewer geometricForm="pyramid" store={storePyramid} text="Ver piramide" />
    </div>
  );
}
