import { XR, type XRStore } from "@react-three/xr";
import { PyramidView } from "../viewers/pyramidView";
import { SquareView } from "../viewers/squareView";
import { Canvas } from "@react-three/fiber";

interface enterViewerProps {
  geometricForm: "square" | "pyramid";
  text: string;
  store: XRStore;
}

function viewerCase(form: string) {
  switch (form) {
    case "square":
      return <SquareView></SquareView>;

    case "pyramid":
      return <PyramidView></PyramidView>;
  }
}

export function EnterViewer({ text, geometricForm, store }: enterViewerProps) {
  return (
    <>
      <button
        onClick={() => store.enterAR()}
      >
        {text}
      </button>

      <Canvas >
        <XR store={store}>{viewerCase(geometricForm)}</XR>
      </Canvas>
    </>
  );
}
