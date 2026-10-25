(window as any).XRWebGLBinding = undefined; //fez o objeto 3D voltar renderizar na camera normal
import { EnterViewer } from "./components/EnterViewer/enterViewer";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="viewers">
        <EnterViewer geometricForm="square" text="Ver cubo" />
        <EnterViewer geometricForm="pyramid" text="Ver piramide" />
        <EnterViewer geometricForm="copyMachine" text="ver copiadora"/>
      </div>
    </>
  );
}
