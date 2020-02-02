import React, { Suspense, useState, useRef, useCallback } from 'react'
import { Canvas, useFrame } from "react-three-fiber"
import * as THREE from "three"
import Bin from './3DComponents/Bin'
import Plane from './3DComponents/Plane'
import Arduino from './3DComponents/Arduino'
import { useStore } from '../store'
import Text from './3DComponents/Text'
import { useSpring, a, config } from 'react-spring/three'

const Title = () => {
  const { setPage } = useStore()
  const [hover, set] = useState(false)
  const props = useSpring({
    pos: !hover ? [2, 0, 0] : [2, 0.2, 0],
    config: config.wobbly
  })
  return (
    <a.group onClick={() => setPage("info")} onPointerOver={() => set(true)} onPointerOut={() => set(false)} position={props.pos} rotation={[0, -0.5, 0]}>
      <Text position={[0.8, 4, -5]} size={0.5} children="KLAS" color="red" />
      <Text position={[0, 1.5, -5]} size={0.5} children="BAK." color="red" />
    </a.group>
  )
}

const Bins = ({ setPositionX, setPositionY, setPositionZ }) => {
  const [hoverBins, setHoverBins] = useState(false)
  const { bins, setPage, page } = useStore()
  const props = useSpring({
    pos: !hoverBins ? [-5, 0.1, -4] : [-5, 0.3, -4],
    config: config.wobbly
  })
  return (
    <a.group onClick={() => setPage("bins")} onPointerOver={() => page === "home" && setHoverBins(true)} onPointerOut={() => page === "home" && setHoverBins(false)
    } position={props.pos} rotation={[0, 0.9, 0]} >
      <Bin
        bin={bins[0]}
        color="#4a6bcf"
        colorDark="#2e427d"
        setPositionZ={(positionZ) => setPositionZ(positionZ)}
        setPositionX={(positionX) => setPositionX(positionX)}
        setPositionY={(positionY) => setPositionY(positionY)}
        positionX={-0.5}
        position={[-1, 1, 1]} />
      <Bin
        hover={hoverBins}
        lit
        bin={bins[1]}
        color="#fa5568"
        colorDark="#993742"
        setPositionZ={(positionZ) => setPositionZ(positionZ)}
        setPositionX={(positionX) => setPositionX(positionX)}
        setPositionY={(positionY) => setPositionY(positionY)}
        positionX={1}
        position={[0, 1, 1]}
      />
      <Bin
        bin={bins[2]}
        color="#7ae68d"
        colorDark="#4c8f57"
        setPositionZ={(positionZ) => setPositionZ(positionZ)}
        setPositionX={(positionX) => setPositionX(positionX)}
        setPositionY={(positionY) => setPositionY(positionY)}
        positionX={2.5}
        position={[1, 1, 1]}
      />
    </a.group >
  )
}

function Dolly({ positionZ, positionX, positionY }) {
  const { page } = useStore()
  useFrame(({ camera }) => {
    camera.rotation.Y = camera.rotation.y += (0 - camera.rotation.y) * 0.04
    camera.position.z = camera.position.z += (positionZ - camera.position.z) * 0.05
    camera.position.x = camera.position.x += (positionX - camera.position.x) * 0.05
    camera.position.y = camera.position.y += (positionY - camera.position.y) * 0.05
    if (page === "bins") {
      camera.rotation.y = camera.rotation.y += (1.7 - camera.rotation.y) * 0.04
      camera.position.z = camera.position.z += (-9 - camera.position.z) * 0.04
      camera.position.x = camera.position.x += (-4 - camera.position.x) * 0.04
      camera.position.y = camera.position.y += (1 - camera.position.y) * 0.04
    } else if (page === "info") {
      camera.rotation.y = camera.rotation.y += (-1 - camera.rotation.y) * 0.04
      camera.position.z = camera.position.z += (-4 - camera.position.z) * 0.04
      camera.position.x = camera.position.x += (0 - camera.position.x) * 0.04
      camera.position.y = camera.position.y += (1 - camera.position.y) * 0.04
    }

    camera.updateProjectionMatrix()
  })
  return null
}

const CanvasModel = () => {
  const mouseText = useRef([0, 0])
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouseText.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(3)
  const [positionZ, setPositionZ] = useState(10)
  const d = 8.25

  return (
    <Canvas onMouseMove={onMouseMove}
      camera={{ position: [0, 5, 9] }}
      shadowMap
      onCreated={({ gl }) => {
        gl.setClearColor('#84aedb')
        gl.toneMapping = THREE.Uncharted2ToneMapping
        gl.outputEncoding = THREE.sRGBEncoding
      }}
    >
      <Suspense fallback={<p>loading...</p>}>
        <Dolly positionX={positionX} positionZ={positionZ} positionY={positionY} />
        <hemisphereLight skyColor={"black"} groundColor={0xffffff} intensity={0.68} position={[0, 50, 0]} />
        <directionalLight
          position={[-8, 12, 8]}
          shadow-camera-left={d * -1}
          shadow-camera-bottom={d * -1}
          shadow-camera-right={d}
          shadow-camera-top={d}
          shadow-camera-near={0.1}
          shadow-camera-far={1500}
          castShadow
        />
        <fog attach="fog" args={["#97b381", 5, 25]} />
        <Suspense fallback={null}>
          <Bins
            positionX={positionX}
            positionZ={positionZ}
            setPositionX={setPositionX}
            setPositionY={setPositionY}
            setPositionZ={setPositionZ}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Arduino mouse={mouseText} />
        </Suspense>
        <Suspense fallback={null}>
          <Title />
        </Suspense>
        <Plane />
      </Suspense>
    </Canvas >
  )
}

export default CanvasModel