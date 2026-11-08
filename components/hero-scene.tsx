"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  Lightformer,
  RoundedBox,
} from "@react-three/drei"
import * as THREE from "three"

const BODY_COLOR = "#2bb7ee"
const BUBBLE_COUNT = 40
// Bubbles stay inside the visible canvas area: they rise within this band and
// shrink away at both ends, so nothing gets cut off at the top or the sides.
const Y_MIN = 0
const Y_MAX = 3.4

// What the camera looks at, and the radius of the sphere that must stay in view
// (platform ring + bubbles). Used to fit the scene to any canvas aspect ratio.
const TARGET = new THREE.Vector3(0, 0.9, 0)
const FIT_RADIUS = 3.3
const VIEW_DIR = new THREE.Vector3(10, 4.2, 11).normalize()

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

/** Keeps the whole scene framed, whether the canvas is wide or tall. */
function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const { width, height } = useThree((s) => s.size)

  useLayoutEffect(() => {
    const aspect = width / height
    const vFov = THREE.MathUtils.degToRad(camera.fov)
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
    const distance = FIT_RADIUS / Math.sin(Math.min(vFov, hFov) / 2)
    camera.position.copy(VIEW_DIR).multiplyScalar(distance).add(TARGET)
    camera.lookAt(TARGET)
    camera.updateProjectionMatrix()
  }, [camera, width, height])

  return null
}

function Wheel({ position }: { position: [number, number, number] }) {
  const side = position[2] > 0 ? 1 : -1
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.38, 0.38, 0.3, 40]} />
        <meshStandardMaterial color="#07090d" roughness={0.9} />
      </mesh>
      <mesh position={[0, side * 0.151, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 40]} />
        <meshStandardMaterial color="#7d8a9b" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0, side * 0.162, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 20]} />
        <meshStandardMaterial color="#38d4ff" emissive="#38d4ff" />
      </mesh>
    </group>
  )
}

function Car() {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const { pointer } = state
    group.current.rotation.y += delta * 0.22
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.1,
      0.05
    )
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04
  })

  const paint = (
    <meshPhysicalMaterial
      color={BODY_COLOR}
      metalness={0.6}
      roughness={0.22}
      clearcoat={1}
      clearcoatRoughness={0.04}
    />
  )

  return (
    <group ref={group}>
      {/* body */}
      <RoundedBox
        args={[4.3, 0.52, 1.85]}
        radius={0.24}
        smoothness={8}
        position={[0, 0.58, 0]}
      >
        {paint}
      </RoundedBox>
      {/* glass cabin */}
      <RoundedBox
        args={[2.25, 0.5, 1.62]}
        radius={0.24}
        smoothness={8}
        position={[-0.25, 1.02, 0]}
      >
        <meshPhysicalMaterial
          color="#0a1824"
          metalness={0.9}
          roughness={0.04}
          clearcoat={1}
          envMapIntensity={2.5}
        />
      </RoundedBox>
      {/* roof */}
      <RoundedBox
        args={[1.75, 0.1, 1.5]}
        radius={0.05}
        smoothness={4}
        position={[-0.3, 1.29, 0]}
      >
        {paint}
      </RoundedBox>
      {/* LED headlights */}
      {[-0.55, 0.55].map((z) => (
        <mesh key={`h${z}`} position={[2.14, 0.68, z]}>
          <boxGeometry args={[0.04, 0.07, 0.45]} />
          <meshStandardMaterial
            color="#e6fbff"
            emissive="#a5f3ff"
            emissiveIntensity={4}
          />
        </mesh>
      ))}
      {/* full-width tail light bar */}
      <mesh position={[-2.14, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.06, 1.45]} />
        <meshStandardMaterial
          color="#ff4d5e"
          emissive="#ff2840"
          emissiveIntensity={3}
        />
      </mesh>
      <Wheel position={[1.35, 0.38, 0.8]} />
      <Wheel position={[1.35, 0.38, -0.8]} />
      <Wheel position={[-1.35, 0.38, 0.8]} />
      <Wheel position={[-1.35, 0.38, -0.8]} />
    </group>
  )
}

function Bubbles() {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(() => {
    const rand = mulberry32(42)
    return Array.from({ length: BUBBLE_COUNT }, () => ({
      x: (rand() - 0.5) * 5.2,
      z: (rand() - 0.5) * 4,
      y: Y_MIN + rand() * (Y_MAX - Y_MIN),
      speed: 0.12 + rand() * 0.3,
      scale: 0.04 + rand() * 0.13,
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
      <sphereGeometry args={[1, 32, 32]} />
      {/* thin soap-film look: mostly clear with iridescent reflections */}
      <meshPhysicalMaterial
        color="#e8f8ff"
        emissive="#38d4ff"
        emissiveIntensity={0.15}
        transparent
        opacity={0.22}
        depthWrite={false}
        roughness={0}
        metalness={0}
        iridescence={1}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[200, 800]}
        envMapIntensity={3}
      />
    </instancedMesh>
  )
}

function Platform() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[2.95, 96]} />
        <meshStandardMaterial color="#030810" metalness={0} roughness={1} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.92, 3, 128]} />
        <meshBasicMaterial color="#38d4ff" toneMapped={false} />
      </mesh>
      <mesh>
        <ringGeometry args={[3.4, 3.42, 128]} />
        <meshBasicMaterial color="#38d4ff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <CameraRig />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} />
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
          intensity={4}
          color="#ffffff"
          position={[6, 1, 4]}
          scale={[3, 5, 1]}
        />
        <Lightformer
          form="ring"
          intensity={3}
          color="#ff9ad5"
          position={[0, 6, 4]}
          scale={2}
        />
      </Environment>
      <Platform />
      <ContactShadows
        position={[0, 0.005, 0]}
        scale={6}
        far={1.5}
        blur={2.4}
        opacity={0.75}
        resolution={512}
        color="#000000"
      />
      <Car />
      <Bubbles />
    </Canvas>
  )
}
