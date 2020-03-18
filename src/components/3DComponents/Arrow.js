import React, { useEffect, useState, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useFrame } from "react-three-fiber"
import { useStore } from "../../store"

const Arrow = ({ setRotate, setZoom, rotate }) => {
    const [model, setModel] = useState()
    const ref = useRef()
    const { setPage } = useStore()
    const [hover, set] = useState(false)
    useEffect(() => {
        new GLTFLoader().load("./arrow/scene.gltf", setModel)
    }, [])
    return model ?
        <mesh
            ref={ref}
            castShadow>
            <primitive
                style={{ cursor: 'pointer' }}
                ref={ref}
                castShadow
                rotation={[4, 3.2, -0.1]}
                position={[0, -1, 2.3]}
                scale={[0.1, 0.2, 0.3]}
                object={model.scene} />
        </mesh>
        : null
}

export default Arrow