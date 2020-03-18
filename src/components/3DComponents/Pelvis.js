import React, { useEffect, useState, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useFrame } from "react-three-fiber"
import { useStore } from "../../store"

const Pelvis = ({ setRotate, setZoom, rotate }) => {
    const [model, setModel] = useState()
    const ref = useRef()
    const { setPage } = useStore()
    const [hover, set] = useState(false)
    useEffect(() => {
        new GLTFLoader().load("./pelvis/scene.gltf", setModel)
    }, [])

    useFrame(() => {
        if (ref.current && !rotate) (ref.current.position.y += ((hover ? 0.2 : 0) - ref.current.position.y) * 0.1)

    })

    return model ?
        <mesh
            style={{ cursor: 'pointer' }}
            ref={ref}
            onPointerOver={() => set(true)}
            onPointerOut={() => set(false)}
            onClick={() => {
                setRotate(true)
                setPage('start')
                setTimeout(() => {
                    setZoom(true)
                }, 1500);
            }}
            castShadow>
            <primitive
                style={{ cursor: 'pointer' }}
                ref={ref}
                castShadow
                rotation={[-0.5, 3.2, -0.1]}
                position={[0, -0.5, 3]}
                scale={[0.01, 0.01, 0.01]}
                object={model.scene} />
        </mesh>
        : null
}

export default Pelvis