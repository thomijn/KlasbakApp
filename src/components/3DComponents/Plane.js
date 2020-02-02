import React from "react"

const Plane = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[1000, 1000]} />
        <meshLambertMaterial attach="material" color="#758f60" />
    </mesh>
)

export default Plane