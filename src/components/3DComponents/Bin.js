import React, { Suspense, useEffect } from 'react'
import Lit from './Lit'
import { useStore } from '../../store'
import { useSpring, a } from 'react-spring/three'

const Bin = ({ setPositionX, setPositionY, setPositionZ, position, colorDark, bin, color, lit, hover }) => {
    const { setSelectedBin, selectedBin, page } = useStore()
    useEffect(() => {
        if (!selectedBin) {
            setPositionZ(6)
            setPositionY(3)
            setPositionX(1)
        }
    }, [selectedBin])

    const animateProps = useSpring({
        color: selectedBin && selectedBin.name === bin.name ? colorDark : color
    })
    console.log(bin.name)
    console.log(selectedBin)

    return (
        <mesh
            onClick={() => {
                if (page === "bins") {
                    setSelectedBin(bin)
                }
            }}
            position={position}
            castShadow >
            <Suspense fallback={null}>
                {lit &&
                    <Lit hover={hover} />
                }
            </Suspense>
            <a.boxBufferGeometry attach="geometry" args={[1, 2.25, 1]} />
            <a.meshPhysicalMaterial color={animateProps.color} attach="material" />
        </mesh >
    )

}

export default Bin
