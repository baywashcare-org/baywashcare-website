"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Lightformer, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

const BUBBLE_COUNT = 50
// Bubbles stay inside the visible canvas area: they rise within this band and
// shrink away at both ends, so nothing gets cut off at the top or the sides.
const Y_MIN = -1
const Y_MAX = 4

// Seeded PRNG so the bubble layout is deterministic and render stays pure.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.44, 0.44, 0.34, 32]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.8} />
      </mesh>
      <mesh position={[0, position[2] > 0 ? 0.175 : -0.175, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.03, 32]} />
        <meshStandardMaterial color="#cfd8e3" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Car() {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const { pointer } = state
    group.current.rotation.y += delta * 0.25
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.15,
      0.05
    )
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
  })

  return (
    <group ref={group}>
      {/* body */}
      <RoundedBox
        args={[4.2, 0.65, 1.8]}
        radius={0.28}
        smoothness={6}
        position={[0, 0.72, 0]}
      >
        <meshPhysicalMaterial
          color="#2bb7ee"
          metalness={0.5}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </RoundedBox>
      {/* cabin */}
      <RoundedBox
        args={[2.1, 0.6, 1.55]}
        radius={0.25}
        smoothness={6}
        position={[-0.25, 1.22, 0]}
      >
        <meshPhysicalMaterial
          color="#06121c"
          metalness={0.6}
          roughness={0.05}
          clearcoat={1}
        />
      </RoundedBox>
      {/* roof highlight */}
      <RoundedBox
        args={[1.5, 0.06, 1.3]}
        radius={0.03}
        position={[-0.25, 1.53, 0]}
      >
        <meshPhysicalMaterial
          color="#2bb7ee"
          metalness={0.5}
          roughness={0.25}
          clearcoat={1}
        />
      </RoundedBox>
      {/* headlights */}
      {[-0.6, 0.6].map((z) => (
        <mesh key={`h${z}`} position={[2.08, 0.8, z]}>
          <boxGeometry args={[0.06, 0.12, 0.35]} />
          <meshStandardMaterial
            color="#e6fbff"
            emissive="#7be8ff"
            emissiveIntensity={3}
          />
        </mesh>
      ))}
      {/* taillights */}
      {[-0.6, 0.6].map((z) => (
        <mesh key={`t${z}`} position={[-2.08, 0.8, z]}>
          <boxGeometry args={[0.06, 0.1, 0.4]} />
          <meshStandardMaterial
            color="#ff4d5e"
            emissive="#ff2840"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      <Wheel position={[1.3, 0.44, 0.92]} />
      <Wheel position={[1.3, 0.44, -0.92]} />
      <Wheel position={[-1.3, 0.44, 0.92]} />
      <Wheel position={[-1.3, 0.44, -0.92]} />
    </group>
  )
}

function Bubbles() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(() => {
    const rand = mulberry32(42)
    return Array.from({ length: BUBBLE_COUNT }, () => ({
      x: (rand() - 0.5) * 5,
      z: (rand() - 0.5) * 4,
      y: Y_MIN + rand() * (Y_MAX - Y_MIN),
      speed: 0.15 + rand() * 0.35,
      scale: 0.05 + rand() * 0.16,
      wobble: rand() * Math.PI * 2,
    }))
  }, [])

  useFrame((state, delta) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    data.forEach((b, i) => {
      b.y += delta * b.speed
      if (b.y > Y_MAX) b.y = Y_MIN
      // Shrink in and out so bubbles never pop or get cut off at the edges.
      const life = (b.y - Y_MIN) / (Y_MAX - Y_MIN)
      const fade = smoothstep(0, 0.2, life) * (1 - smoothstep(0.7, 1, life))
      dummy.position.set(b.x + Math.sin(t * 0.6 + b.wobble) * 0.15, b.y, b.z)
      dummy.scale.setScalar(b.scale * fade)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, BUBBLE_COUNT]}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshPhysicalMaterial
        color="#bdeeff"
        transparent
        opacity={0.35}
        roughness={0}
        metalness={0.1}
        clearcoat={1}
        envMapIntensity={2}
      />
    </instancedMesh>
  )
}

function Platform() {
  return (
    <group position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[2.9, 3, 96]} />
        <meshBasicMaterial color="#38d4ff" transparent opacity={0.9} />
      </mesh>
      <mesh>
        <ringGeometry args={[3.4, 3.43, 96]} />
        <meshBasicMaterial color="#38d4ff" transparent opacity={0.35} />
      </mesh>
      <mesh>
        <circleGeometry args={[2.9, 96]} />
        <meshStandardMaterial
          color="#07111c"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [10, 4.2, 11], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.5} />
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={6}
          position={[0, 5, -6]}
          scale={[12, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={5}
          color="#38d4ff"
          position={[-6, 2, 3]}
          scale={[3, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={5}
          color="#ffffff"
          position={[6, 1, 4]}
          scale={[3, 5, 1]}
        />
      </Environment>
      <Platform />
      <Car />
      <Bubbles />
    </Canvas>
  )
}
