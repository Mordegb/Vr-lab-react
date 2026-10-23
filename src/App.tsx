(window as any).XRWebGLBinding = undefined; //fez o objeto 3D voltar renderizar na camera normal
import { EnterViewer } from "./components/enterViewer";


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
      <EnterViewer geometricForm="square" text="Ver cubo" />
      <EnterViewer geometricForm="pyramid" text="Ver piramide" />
    </div>
  );
}
