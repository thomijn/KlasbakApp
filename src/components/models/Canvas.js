import React, { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useLoader, useRender, useThree, extend, useFrame } from "react-three-fiber"
import { useSpring, a } from "react-spring/three"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import CardboxImg from "../../images/cardbox.png"

extend({ OrbitControls })

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useRender(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

const Arduino = () => {
  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load("./models/scene.gltf", setModel)
  }, [])

  return model ?
    <primitive
      position={[1, 0.5, 0.4]}
      rotation={[0, 1.55, -1.55]}
      scale={[0.1, 0.1, 0.1]}
      object={model.scene} />
    : null
}


const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, 0, 0]} receiveShadow>
    <circleBufferGeometry attach="geometry" args={[5, 100]} />
    <meshPhysicalMaterial attach="material" color="#57ab4f" />
  </mesh>
)

function Lit({ hover }) {
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
      <boxBufferGeometry attach="geometry" args={[1.2, 0.2, 1.2]} />
      <meshStandardMaterial map={texture} attach="material" />
    </a.mesh>
  )
}

function Dolly({ positionZ, positionX, positionY, backside }) {
  useFrame(({ camera }) => {
    camera.position.z = camera.position.z += (positionZ - camera.position.z) * 0.05
    camera.position.x = camera.position.x += (positionX - camera.position.x) * 0.05
    camera.position.y = camera.position.y += (positionY - camera.position.y) * 0.05

    if (backside) {
      camera.rotation.y = camera.rotation.y += (3.15 - camera.rotation.y) * 0.04
      camera.position.z = camera.position.z += (-14 - camera.position.z) * 0.04
      camera.position.y = camera.position.y += (0.5 - camera.position.y) * 0.04

    } else {
      camera.rotation.y = camera.rotation.y += (0 - camera.rotation.y) * 0.02
      camera.position.z = camera.position.z += (positionZ - camera.position.z) * 0.02
      camera.position.y = camera.position.y += (positionY - camera.position.y) * 0.02
    }

    camera.updateProjectionMatrix()
  })
  return null
}

function Thing({ position, setPositionZ, setPositionX, setPositionY, positionX }) {
  const [texture] = useLoader(THREE.TextureLoader, [CardboxImg])
  const [hover, setHover] = useState(false)

  return (
    <mesh
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      onClick={() => {
        setPositionZ(3)
        setPositionY(2.5)
        setPositionX(positionX)
      }}
      position={position}
      castShadow>
      <Suspense fallback={null}>
        <Lit hover={hover} />
      </Suspense>
      <boxBufferGeometry attach="geometry" args={[1, 2.25, 1]} />
      <meshPhysicalMaterial map={texture} attach="material" />
    </mesh>
  )
}

const CanvasModel = ({ backside }) => {
  const [positionZ, setPositionZ] = useState(6)
  const [positionX, setPositionX] = useState(1)
  const [positionY, setPositionY] = useState(3)

  const [backsideCamera, setBacksideCamera] = useState([0, 0, 0])

  return (
    <Canvas
      camera={{ position: [positionX, positionY, positionZ], rotation: [0, 0, 0] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}
    >
      <Dolly backside={backside} positionZ={positionZ} positionX={positionX} positionY={positionY} />
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} penumbra={2} castShadow />
      {/* <fog attach="fog" args={["white", 5, 10]} /> */}
      {/* <Controls /> */}
      <Suspense fallback={null}>
        <Thing
          setPositionZ={(positionZ) => setPositionZ(positionZ)}
          setPositionX={(positionX) => setPositionX(positionX)}
          setPositionY={(positionY) => setPositionY(positionY)}
          positionX={-0.5}
          position={[-0.5, 1, 1]}
        />
        <Thing
          setPositionZ={(positionZ) => setPositionZ(positionZ)}
          setPositionX={(positionX) => setPositionX(positionX)}
          setPositionY={(positionY) => setPositionY(positionY)}
          positionX={1}
          position={[1, 1, 1]}
        />
        <Thing
          setPositionZ={(positionZ) => setPositionZ(positionZ)}
          setPositionX={(positionX) => setPositionX(positionX)}
          setPositionY={(positionY) => setPositionY(positionY)}
          positionX={2.5}
          position={[2.5, 1, 1]}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Arduino />
      </Suspense>
      <Plane />
    </Canvas>
  )
}

export default CanvasModel