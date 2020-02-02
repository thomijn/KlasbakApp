import React from "react"
import { useLoader } from "react-three-fiber"
import * as THREE from "three"
import CardboxImg from "../../images/cardbox.png"
import { useSpring, a } from "react-spring/three"


const Lit = ({ hover }) => {
    const [texture] = useLoader(THREE.TextureLoader, [CardboxImg])

    const props = useSpring({
        rotation: !hover ? [0, 0, 0] : [-0.2, 0, 0]
    })

    const props2 = useSpring({
        position: !hover ? [0, 1.15, 0] : [0, 1.3, 0]
    })

    return (
        <a.mesh
            position={props2.position}
            rotation={props.rotation}
        >
            <boxBufferGeometry attach="geometry" args={[3.3, 0.2, 1.2]} />
            <meshStandardMaterial map={texture} attach="material" />
        </a.mesh>
    )
}

export default Lit