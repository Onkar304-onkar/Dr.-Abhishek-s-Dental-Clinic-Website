import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  variant?: "hero" | "implant" | "braces" | "brush" | "tooth";
};

function ToothModel({ color = "#ffffff", accent = "#38bdf8" }: { color?: string; accent?: string }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.1) * 0.08;
  });

  const crownProfile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(0.42, 0.08));
    pts.push(new THREE.Vector2(0.7, 0.32));
    pts.push(new THREE.Vector2(0.78, 0.55));
    pts.push(new THREE.Vector2(0.74, 0.78));
    pts.push(new THREE.Vector2(0.62, 0.92));
    pts.push(new THREE.Vector2(0.42, 1.0));
    pts.push(new THREE.Vector2(0.22, 1.02));
    pts.push(new THREE.Vector2(0, 1.03));
    return pts;
  }, []);

  return (
    <group ref={groupRef} scale={1.1}>
      {/* Crown */}
      <mesh position={[0, -0.0, 0]} castShadow receiveShadow>
        <latheGeometry args={[crownProfile, 48]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.18}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          ior={1.5}
          thickness={0.7}
          sheen={0.5}
          sheenColor={new THREE.Color(accent)}
        />
      </mesh>
      {/* Biting top indent (subtle) */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.3, 0.12, 24]} />
        <meshPhysicalMaterial color="#f4f4f5" roughness={0.4} metalness={0.02} />
      </mesh>
      {/* Roots */}
      <mesh position={[0.18, -0.4, 0]} castShadow receiveShadow>
        <latheGeometry args={[[new THREE.Vector2(0, 0), new THREE.Vector2(0.22, -0.15), new THREE.Vector2(0.18, -0.7), new THREE.Vector2(0.02, -1.2)], 20]} />
        <meshPhysicalMaterial color="#f4f4f5" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[-0.18, -0.4, 0]} castShadow receiveShadow>
        <latheGeometry args={[[new THREE.Vector2(0, 0), new THREE.Vector2(0.22, -0.15), new THREE.Vector2(0.18, -0.7), new THREE.Vector2(0.02, -1.2)], 20]} />
        <meshPhysicalMaterial color="#f4f4f5" roughness={0.45} metalness={0.05} />
      </mesh>
      {/* Shine accent ring */}
      <mesh position={[0, 0.6, 0.66]}>
        <torusGeometry args={[0.38, 0.014, 10, 44]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function ImplantModel() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.08;
  });

  return (
    <group ref={ref} scale={1.0}>
      {/* Screw body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.24, 0.18, 1.2, 32, 14, false]} />
        <meshPhysicalMaterial color="#d4d4d8" metalness={0.95} roughness={0.22} />
      </mesh>
      {/* Threads */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[0, -0.5 + i * 0.12, 0]} castShadow>
          <torusGeometry args={[0.265 - i * 0.004, 0.025, 6, 28]} />
          <meshStandardMaterial color="#9ca3af" metalness={1} roughness={0.25} />
        </mesh>
      ))}
      {/* Abutment */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.3, 24]} />
        <meshPhysicalMaterial color="#e5e7eb" metalness={0.9} roughness={0.18} />
      </mesh>
      {/* Crown */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.08}
          metalness={0.02}
        />
      </mesh>
      <mesh position={[0, 1.1, 0]} scale={[0.9, 1.2, 0.9]} castShadow>
        <sphereGeometry args={[0.34, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#fefefe" roughness={0.1} clearcoat={1} />
      </mesh>
    </group>
  );
}

function BracesModel() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.4;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.15;
  });
  return (
    <group ref={ref}>
      {/* Tooth row */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = (i - 2.5) * 0.52;
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.42, 0.7, 0.38]} />
              <meshPhysicalMaterial color="#ffffff" roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} metalness={0} />
            </mesh>
            <mesh position={[0, 0.1, 0.2]} castShadow>
              <boxGeometry args={[0.24, 0.2, 0.06]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        );
      })}
      {/* Archwire */}
      <mesh position={[0, 0.1, 0.26]} castShadow>
        <torusGeometry args={[1.45, 0.018, 10, 64, Math.PI]} />
        <meshStandardMaterial color="#f8fafc" metalness={1} roughness={0.1} />
      </mesh>
      {/* Elastic ligatures colored dots */}
      {Array.from({ length: 6 }).map((_, i) => {
        const x = (i - 2.5) * 0.52;
        const colors = ["#38bdf8", "#22d3ee", "#2dd4bf", "#38bdf8", "#22d3ee", "#2dd4bf"];
        return (
          <mesh key={i} position={[x, 0.1, 0.25]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

function ToothbrushModel() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.08;
  });
  return (
    <group ref={ref} scale={1.1}>
      {/* Handle */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.14, 2.2, 24]} />
        <meshPhysicalMaterial color="#0ea5e9" roughness={0.25} metalness={0.2} clearcoat={0.8} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[0, 0.98, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.28, 24]} />
        <meshPhysicalMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.36, 0.22, 0.54]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.25} clearcoat={0.7} />
      </mesh>
      {/* Bristles */}
      {Array.from({ length: 36 }).map((_, i) => {
        const r = Math.floor(i / 6);
        const c = i % 6;
        const x = -0.225 + c * 0.09;
        const z = -0.14 + r * 0.055;
        return (
          <mesh key={i} position={[x, 1.42, z]} castShadow>
            <cylinderGeometry args={[0.013, 0.011, 0.22, 6]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
          </mesh>
        );
      })}
      {/* Accent ring */}
      <mesh position={[0, -0.1, 0.15]}>
        <torusGeometry args={[0.13, 0.02, 12, 32]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function FloatingTooth({ color, scale = 1, position, rotation = [0, 0, 0], accent = "#38bdf8" }: { color?: string; scale?: number; position: [number, number, number]; rotation?: [number, number, number]; accent?: string }) {
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <group position={position} rotation={rotation} scale={scale}>
        <ToothModel color={color} accent={accent} />
      </group>
    </Float>
  );
}

export function DentalScene({ variant = "hero" }: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, variant === "hero" ? 5 : 4.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#67e8f9" />
      <pointLight position={[0, -2, 3]} intensity={0.6} color="#22d3ee" />

      {variant === "hero" && (
        <>
          <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.5}>
            <group position={[0, 0.1, 0]} scale={1.25}>
              <ToothModel accent="#22d3ee" />
            </group>
          </Float>
          <FloatingTooth position={[-2.6, 1.3, -0.5]} scale={0.4} accent="#2dd4bf" />
          <FloatingTooth position={[2.8, -1.2, -0.2]} scale={0.35} accent="#38bdf8" rotation={[0.2, 0.4, 0.1]} />
          <FloatingTooth position={[-2.9, -1.6, 0.2]} scale={0.3} accent="#67e8f9" rotation={[-0.3, 0.2, -0.2]} />
        </>
      )}

      {variant === "implant" && (
        <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
          <group position={[0, 0, 0]} scale={1}>
            <ImplantModel />
          </group>
        </Float>
      )}

      {variant === "braces" && (
        <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.8}>
          <group position={[0, 0.2, 0]} scale={0.9}>
            <BracesModel />
          </group>
        </Float>
      )}

      {variant === "brush" && (
        <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1.2}>
          <group position={[0, 0, 0]} scale={0.95}>
            <ToothbrushModel />
          </group>
        </Float>
      )}

      {variant === "tooth" && (
        <Float speed={1.5} rotationIntensity={0.7} floatIntensity={1.3}>
          <group position={[0, 0.2, 0]} scale={1.1}>
            <ToothModel accent="#22d3ee" />
          </group>
        </Float>
      )}

      <ContactShadows position={[0, -2.1, 0]} opacity={0.35} scale={8} blur={2.4} far={4} frames={1} resolution={512} />
      <Environment preset="city" />
    </Canvas>
  );
}

export function ParallaxOrbit({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = scrollY * 0.0008;
    groupRef.current.rotation.x = scrollY * 0.0003;
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[3.4, 0.02, 16, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.9, 0.015, 16, 120]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[4.4, 0.01, 16, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export function HeroCanvas({ scrollY }: { scrollY: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.4} color="#67e8f9" />
      <pointLight position={[0, -1, 4]} intensity={0.5} color="#22d3ee" />
      <ParallaxOrbit scrollY={scrollY} />
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
        <group position={[2.2, -0.3, 0]} scale={0.85}>
          <ToothModel accent="#22d3ee" />
        </group>
      </Float>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.4}>
        <group position={[-2.4, 1.1, -0.3]} scale={0.45}>
          <ToothModel accent="#2dd4bf" />
        </group>
      </Float>
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.1}>
        <group position={[0, 1.9, -0.8]} scale={0.32}>
          <ToothModel accent="#38bdf8" />
        </group>
      </Float>
      <ContactShadows position={[0, -2.3, 0]} opacity={0.25} scale={10} blur={2.8} far={5} frames={1} resolution={512} />
      <Environment preset="city" />
    </Canvas>
  );
}

// Re-export single tooth mesh for direct use
export function MiniScene({ variant }: { variant: SceneProps["variant"] }) {
  return <DentalScene variant={variant} />;
}
