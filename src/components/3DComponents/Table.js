import React, { useEffect, useState, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Table = () => {
    const [model, setModel] = useState()
    const ref = useRef()
    useEffect(() => {
        new GLTFLoader().load("./table/scene.gltf", setModel)
    }, [])

    return model ?
        <mesh castShadow>
            <primitive
                ref={ref}
                castShadow
                rotation={[0, 3.2, 0.0]}
                position={[0, -5.9, -3]}
                scale={[0.1, 0.1, 0.1]}
                object={model.scene} />
        </mesh>
        : null
}

export default Table