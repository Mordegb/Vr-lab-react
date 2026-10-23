import { createXRStore, XR } from "@react-three/xr";
import { PyramidView } from "../../viewers/pyramidView";
import { SquareView } from "../../viewers/squareView";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import "./enterViewer.css";

interface enterViewerProps {
  geometricForm: "square" | "pyramid";
  text: string;
}

function viewerCase(form: string) {
  switch (form) {
    case "square":
      return <SquareView></SquareView>;

    case "pyramid":
      return <PyramidView></PyramidView>;
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
