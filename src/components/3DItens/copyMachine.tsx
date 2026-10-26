import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3 , Vector3 } from "three";
import type { Vector3Tuple } from "three";

// const MODEL_URL = "/models/copyMachine/machine.gltf";
const MODEL_URL = "/models/CAR_SUV/SUV.glb"; // modelo do carro

const ALTURA_REAL = 0.5;
export function CopyMachine({scale = 1 , position = [0,0,0]}: {scale?:number; position?: Vector3Tuple}){
    const {scene} = useGLTF(MODEL_URL)

    const {object , fit} = useMemo(() => {

        const object = scene.clone(true)
        object.updateMatrixWorld(true)

        const box = new Box3().setFromObject(object)
        const size = box.getSize(new Vector3())
        const center = box.getCenter(new Vector3());

        object.position.set(-center.x , -box.min.y , -center.z)

        return {object , fit: ALTURA_REAL/size.y}
    },[scene])

    return(
        <group position={position} scale={scale * fit}>
            <primitive object={object} ></primitive>
        </group>
    )
}
useGLTF.preload(MODEL_URL)
