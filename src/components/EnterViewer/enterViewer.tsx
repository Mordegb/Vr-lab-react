import { createXRStore, XR } from "@react-three/xr";
import { PyramidView } from "../../viewers/pyramidView";
import { SquareView } from "../../viewers/squareView";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import "./enterViewer.css";
import { CopyMachineView } from "../../viewers/copyMachineView";
import { PodAnakinView } from "../../viewers/podAnakinView";

interface enterViewerProps {
  geometricForm: "square" | "pyramid" | "copyMachine" | "anakinPod";
  text: string;
}

function viewerCase(form: string) {
  switch (form) {
    case "square":
      return <SquareView></SquareView>;

    case "pyramid":
      return <PyramidView></PyramidView>;

    case "copyMachine":
      return <CopyMachineView></CopyMachineView>;

    case "anakinPod":
      return <PodAnakinView></PodAnakinView>;
  }
}

export function EnterViewer({ text, geometricForm }: enterViewerProps) {
  const [store] = useState(() => createXRStore());
  return (
    <div className="container">
      <button className="card" onClick={() => store.enterAR()}>
        {text}
      </button>

      <Canvas className="canvas">
        <XR store={store}>{viewerCase(geometricForm)}</XR>
      </Canvas>
    </div>
  );
}
