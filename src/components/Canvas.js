import React, { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from "react-three-fiber"
import * as THREE from "three"
import { useSpring, a, config } from 'react-spring/three'
import Text from './3DComponents/Text'
import Table from './3DComponents/Table'
import { useStore } from '../store'
import Pelvis from './3DComponents/Pelvis'
import Arrow from './3DComponents/Arrow'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })
const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

const Title = () => {
  const { setPage } = useStore()
  const [hover, set] = useState(false)
  const props = useSpring({
    pos: !hover ? [-3, -2, 4] : [-3, -1.9, 4],
    config: config.wobbly
  })
  return (
    <a.group onClick={() => setPage("info")} onPointerOver={() => set(true)} onPointerOut={() => set(false)} position={props.pos} rotation={[0, 0.7, 0]}>
      <Text position={[0.8, 2, -5]} size={0.1} children="PELVIS" color="#7ab0c4" />
      <Text position={[0, 1.5, -5]} size={0.1} children="ORIENTATION" color="#7ab0c4" />
    </a.group>
  )
}

function Dolly({ rotate, zoom }) {
  const { page } = useStore()
  console.log(page)
  useFrame(({ camera }) => {
    if (page !== 'end') {
      // camera.rotation.x = camera.rotation.x += (-1 - camera.rotation.x) * 0.04
      camera.rotation.y = camera.rotation.y += (-0 - camera.rotation.y) * 0.04
      camera.position.z = camera.position.z += (8 - camera.position.z) * 0.05
      camera.position.x = camera.position.x += (0.5 - camera.position.x) * 0.05
      camera.position.y = camera.position.y += (0 - camera.position.y) * 0.05
    }
    if (rotate && page !== 'end') {
      if (zoom) {
        camera.rotation.y = camera.rotation.y += (700 - camera.rotation.y) * 0.04
        camera.rotation.x = camera.rotation.x += (700 - camera.rotation.x) * 0.04
      }
      camera.position.z = camera.position.z += (-4 - camera.position.z) * 0.04
      camera.position.x = camera.position.x += (0 - camera.position.x) * 0.04
      camera.position.y = camera.position.y += (-3.6 - camera.position.y) * 0.04
    } else if (page === "info") {
      camera.rotation.y = camera.rotation.y += (0.8 - camera.rotation.y) * 0.04
      camera.position.z = camera.position.z += (-4 - camera.position.z) * 0.04
      camera.position.x = camera.position.x += (-8 - camera.position.x) * 0.04
      camera.position.y = camera.position.y += (1 - camera.position.y) * 0.04
    } else if (page === 'end') {
      camera.rotation.x = -1
      camera.rotation.y = 0
      camera.position.z = camera.position.z += (6 - camera.position.z) * 0.04
      camera.position.x = camera.position.x += (0.5 - camera.position.x) * 0.04
      camera.position.y = camera.position.y += (4 - camera.position.y) * 0.04
    }

    camera.updateProjectionMatrix()
  })
  return null
}

const CanvasModel = () => {
  const [zoom, setZoom] = useState(false)
  const { page, rotate, setRotate } = useStore()
  return (
    <Canvas
      camera={{ position: [5, 3, 20], rotation: [-0.4, 0.5, 0] }}
      shadowMap
      concurrent
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping
        gl.outputEncoding = THREE.sRGBEncoding
      }}
    >
      <color attach="background" args={["#171720"]} />
      <Dolly rotate={rotate} zoom={zoom} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <spotLight
        position={[10, 8, 10]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <Suspense fallback={null}>
        <Pelvis setRotate={(rotate) => setRotate(rotate)} setZoom={(zoom) => setZoom(zoom)} rotate={rotate} />
      </Suspense>
      <Suspense fallback={null}>
        <Table />
      </Suspense>
      {page === 'home' &&
        <Suspense fallback={null}>
          <Title />
        </Suspense>
      }
      {
        page === 'end' &&
        <Suspense fallback={null}>
          <Arrow />
        </Suspense>
      }
      <mesh position={[0, 0, -10]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#171720" />
      </mesh>
      {page === 'end' &&
        <Controls />
      }
    </Canvas >
  )
}

export default CanvasModel