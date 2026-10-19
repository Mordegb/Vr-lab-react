import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'

const store = createXRStore()

export default function App() {
  return (
    <>
      <button
        onClick={() => store.enterAR()}
        style={{ position: 'fixed', zIndex: 10, top: 20, left: 20, padding: '12px 20px', fontSize: 18 }}
      >
        Iniciar RA
      </button>

      <Canvas style={{ position: 'fixed', inset: 0 }}>
        <XR store={store}>
          <ambientLight intensity={1} />
          <directionalLight position={[1, 2, 1]} />
          <mesh position={[0, 1, -0.8]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </XR>
      </Canvas>
    </>
  )
}