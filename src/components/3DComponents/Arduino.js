import React, { useEffect, useState, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useFrame } from "react-three-fiber"

const Arduino = ({ mouse }) => {
    const [model, setModel] = useState()
    const ref = useRef()
    useEffect(() => {
        new GLTFLoader().load("./models/scene.gltf", setModel)
    }, [])
    useFrame(({ clock }) => {
        if (ref.current) ref.current.position.x = ref.current.position.x += (0 + mouse.current[0] / 800 - ref.current.position.x) * 0.05
        if (ref.current) ref.current.position.y = ref.current.position.y += (6 + mouse.current[1] / 1200 - ref.current.position.y) * 0.05

    })
    return model ?
        <mesh castShadow>
            <primitive
                ref={ref}
                castShadow
                rotation={[0, 0.5, 0.3]}
                position={[0, 6, 0]}
                scale={[0.01, 0.01, 0.01]}
                object={model.scene} />
        </mesh>
        : null
}

export default Arduino