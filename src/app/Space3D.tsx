"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Text, useTexture } from "@react-three/drei";
import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import * as THREE from "three";

type PlanetTheme = "corona" | "rings" | "glyphs" | "alphabet" | "asteroids" | "wireframe" | "pulse";

type PlanetInfo = {
  id: string;
  sectionLabel: string;
  name: string;
  role?: string;
  color: string;
  glow: string;
  size: number;
  isStar?: boolean;
  bullets: string[];
  cta?: { label: string; href: string };
  t: number;       // position along the camera arc (0..1)
  side: number;    // perpendicular offset from the arc (planet sits to the side)
  height: number;  // vertical offset
  theme: PlanetTheme;
};

const PLANETS_INFO: PlanetInfo[] = [
  {
    id: "you",
    sectionLabel: "Welcome",
    name: "Kailash Shankar",
    role: "Software Engineer & Researcher",
    color: "#ffcf6e",
    glow: "#ffd070",
    size: 5.0,
    isStar: true,
    bullets: [
      "University of Florida — CS + Linguistics",
      "GPA 4.0",
      "Building technology that matters",
    ],
    t: 0.025,
    side: 1.5,
    height: 0.3,
    theme: "corona",
  },
  {
    id: "experience",
    sectionLabel: "Experience",
    name: "Where I've shipped",
    color: "#9a5cc2",
    glow: "#c98aff",
    size: 4.0,
    bullets: [
      "EDU Africa — Cape Town · MERN mapping app for informal settlements (100+ MAU)",
      "UF GatorAI Club — AI Teaching Assistant w/ Gemini + RAG · 95% accuracy",
    ],
    t: 0.17,
    side: 10,
    height: 2.4,
    theme: "rings",
  },
  {
    id: "research",
    sectionLabel: "Research",
    name: "Computational Linguistics Lab",
    role: "with Dr. Zoey Liu — UF",
    color: "#3a7ed1",
    glow: "#7ab4ff",
    size: 4.4,
    bullets: [
      "Cross-lingual NLP & low-resource languages",
      "OLMo-2 benchmarking across 2,000 languages",
      "On UF's HiPerGator supercomputer",
    ],
    t: 0.33,
    side: -10,
    height: -2.2,
    theme: "glyphs",
  },
  {
    id: "lingua",
    sectionLabel: "Featured Project",
    name: "Lingua",
    role: "AI language learning platform — linguaclassroom.com",
    color: "#ff8a3c",
    glow: "#ffb15a",
    size: 5.2,
    bullets: [
      "Reading · Writing · Listening · Speaking assignments — auto-graded",
      "AI conversation characters for real-world practice",
      "Built with Next.js · Supabase · Gemini Live & TTS",
    ],
    cta: { label: "Visit site →", href: "https://linguaclassroom.com" },
    t: 0.50,
    side: 12,
    height: 3,
    theme: "alphabet",
  },
  {
    id: "projects",
    sectionLabel: "Projects",
    name: "Things I've built",
    color: "#3fa890",
    glow: "#76e0c6",
    size: 3.8,
    bullets: [
      "AI Career Coach — Resume optimizer + mock interview engine",
      "Home Price Estimator — C++ Red-Black / B-Tree backend, React front",
    ],
    t: 0.66,
    side: -10,
    height: -2.2,
    theme: "asteroids",
  },
  {
    id: "skills",
    sectionLabel: "Toolkit",
    name: "The stack I reach for",
    color: "#d6b86b",
    glow: "#ffe39a",
    size: 3.4,
    bullets: [
      "Python · C/C++ · TypeScript · MATLAB",
      "React · Next.js · FastAPI · Node",
      "Gemini · RAG/ChromaDB · OLMo-2 · Hugging Face",
      "PostgreSQL · Supabase · NeonDB · Docker",
    ],
    t: 0.82,
    side: 6,
    height: 1.5,
    theme: "wireframe",
  },
  {
    id: "contact",
    sectionLabel: "Let's connect",
    name: "Build something with me",
    color: "#e26ba8",
    glow: "#ffa3d2",
    size: 4.2,
    bullets: [
      "kailashshankar@ufl.edu",
      "linkedin.com/in/kailash-shankar",
      "github.com/Kailash-Shankar",
    ],
    cta: { label: "Say hello →", href: "mailto:kailashshankar@ufl.edu" },
    t: 0.965,
    side: 3,
    height: 1,
    theme: "pulse",
  },
];

// ── One big sweeping arc ──
// A graceful S-curve through space (viewed from above): swings out wide to the
// left, peaks, sweeps back across to the right. Gentle y modulation adds
// dimensionality without making the camera shake.
const ARC_POINTS: [number, number, number][] = [
  [  0,   0,   28],
  [ -5,   1,    0],
  [-15,   2,  -30],
  [-23,   2,  -65],
  [-28,   1, -100],
  [-26,  -1, -140],
  [-17,  -2, -178],
  [ -4,  -2, -212],
  [ 10,  -1, -242],
  [ 20,   0, -275],
];

type ResolvedPlanet = PlanetInfo & { worldPos: THREE.Vector3 };

// Profile pic mounted on the front of the sun, always facing the camera.
// It's a flat circle (billboarded) parked just in front of the planet's surface
// so visually it looks like the photo is painted across the planet's face.
function ProfileFace({ planet }: { planet: ResolvedPlanet }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const texture = useTexture("/profile_pic.jpg");
  const tmpDir = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    // Direction from planet center → camera (world space). Group is at planet.worldPos,
    // so this becomes the local position offset that pushes the disc toward the camera.
    tmpDir.copy(camera.position).sub(planet.worldPos);
    if (tmpDir.lengthSq() < 1e-6) return;
    tmpDir.normalize();
    meshRef.current.position.copy(tmpDir).multiplyScalar(planet.size * 0.92);
    // Billboard: face the camera
    meshRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[planet.size * 0.92, 64]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// ── Thematic detail overlays ─────────────────────────────────────────────────
// Each adds character to a planet that relates to what it represents.

function CoronaTheme({ planet }: { planet: ResolvedPlanet }) {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const g3 = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (g1.current) g1.current.rotation.z += delta * 0.08;
    if (g2.current) g2.current.rotation.x += delta * 0.05;
    if (g3.current) {
      g3.current.rotation.y += delta * 0.06;
      g3.current.rotation.z -= delta * 0.04;
    }
    const t = state.clock.elapsedTime;
    if (g1.current) g1.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.04);
  });
  const r = planet.size;
  return (
    <group>
      <mesh ref={g1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r * 1.55, 0.045, 6, 36]} />
        <meshBasicMaterial color="#fff0c8" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={g2} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[r * 1.75, 0.035, 8, 80]} />
        <meshBasicMaterial color={planet.glow} transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh ref={g3} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[r * 1.4, 0.05, 8, 80]} />
        <meshBasicMaterial color="#ffb15a" transparent opacity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

function RingsTheme({ planet }: { planet: ResolvedPlanet }) {
  // Saturn-style rings + two orbiting moons (representing two experiences)
  const moonsRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (moonsRef.current) moonsRef.current.rotation.y += delta * 0.35;
  });
  const r = planet.size;
  const tilt = -0.35;
  return (
    <group>
      <group rotation={[Math.PI / 2 + tilt, 0, 0]}>
        <mesh>
          <ringGeometry args={[r * 1.45, r * 1.95, 96]} />
          <meshBasicMaterial color={planet.glow} transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh>
          <ringGeometry args={[r * 2.0, r * 2.18, 96]} />
          <meshBasicMaterial color={planet.glow} transparent opacity={0.3} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh>
          <ringGeometry args={[r * 2.25, r * 2.35, 96]} />
          <meshBasicMaterial color={planet.glow} transparent opacity={0.22} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </group>
      <group ref={moonsRef}>
        <mesh position={[r * 2.6, 0.3, 0]}>
          <sphereGeometry args={[r * 0.18, 24, 24]} />
          <meshStandardMaterial color={planet.color} emissive={planet.glow} emissiveIntensity={0.7} roughness={0.5} />
        </mesh>
        <mesh position={[-r * 2.7, -0.2, r * 0.6]}>
          <sphereGeometry args={[r * 0.22, 24, 24]} />
          <meshStandardMaterial color={planet.color} emissive={planet.glow} emissiveIntensity={0.6} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function OrbitingTextTheme({
  planet,
  symbols,
  speed = 0.18,
  radiusMul = 1.85,
  fontSize = 0.6,
}: {
  planet: ResolvedPlanet;
  symbols: string[];
  speed?: number;
  radiusMul?: number;
  fontSize?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * speed;
  });
  const r = planet.size * radiusMul;
  const tilt = 0.3;
  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {symbols.map((sym, i) => {
        const angle = (i / symbols.length) * Math.PI * 2;
        const yOff = Math.sin(angle * 2) * planet.size * 0.3;
        return (
          <Text
            key={i}
            position={[Math.cos(angle) * r, yOff, Math.sin(angle) * r]}
            fontSize={planet.size * fontSize * 0.2}
            color={planet.glow}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.008}
            outlineColor="#000000"
            outlineOpacity={0.6}
          >
            {sym}
          </Text>
        );
      })}
    </group>
  );
}

function AsteroidsTheme({ planet }: { planet: ResolvedPlanet }) {
  // Belt of small irregular asteroids around the planet (multiple "projects")
  const groupRef = useRef<THREE.Group>(null);
  const asteroids = useMemo(() => {
    const arr: { angle: number; radius: number; y: number; size: number; rot: [number, number, number] }[] = [];
    const n = 4;
    for (let i = 0; i < n; i++) {
      arr.push({
        angle: (i / n) * Math.PI * 2 + Math.random() * 0.25,
        radius: planet.size * 1.65 + (Math.random() - 0.5) * planet.size * 0.4,
        y: (Math.random() - 0.5) * planet.size * 0.4,
        size: planet.size * (0.08 + Math.random() * 0.13),
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      });
    }
    return arr;
  }, [planet.size]);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18;
  });
  return (
    <group ref={groupRef} rotation={[Math.PI / 7, 0, 0]}>
      {asteroids.map((a, i) => (
        <mesh
          key={i}
          position={[Math.cos(a.angle) * a.radius, a.y, Math.sin(a.angle) * a.radius]}
          rotation={a.rot}
        >
          <icosahedronGeometry args={[a.size, 0]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.glow}
            emissiveIntensity={0.4}
            roughness={0.85}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function WireframeTheme({ planet }: { planet: ResolvedPlanet }) {
  // Geometric tech lattice around the planet
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (outer.current) {
      outer.current.rotation.x += delta * 0.07;
      outer.current.rotation.y += delta * 0.11;
    }
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.05;
      inner.current.rotation.z += delta * 0.09;
    }
  });
  const r = planet.size;
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[r * 1.35, 1]} />
        <meshBasicMaterial color={planet.glow} wireframe transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[r * 1.1, 0]} />
        <meshBasicMaterial color="#fff0c8" wireframe transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </group>
  );
}

function PulseTheme({ planet }: { planet: ResolvedPlanet }) {
  // Three concentric signal-wave rings expanding outward and fading
  const refs = useRef<(THREE.Mesh | null)[]>([null, null, null]);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = ((time * 0.45 + i / 3) % 1);
      const scale = 1 + phase * 1.9;
      mesh.scale.setScalar(scale);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, (1 - phase) * 0.55);
    });
  });
  const r = planet.size;
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <torusGeometry args={[r * 1.25, 0.05, 8, 64]} />
          <meshBasicMaterial color={planet.glow} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function StarField({ count = 1400 }: { count?: number }) {
  // Custom Points starfield — small bright dots distributed on a sphere shell
  // around the origin. Constant pixel size (no size attenuation) so they're
  // reliably visible at any distance without needing bloom.
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 220 + Math.random() * 380; // 220-600 from origin
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  // Keep stars centered on camera so the user is always surrounded by them.
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(camera.position);
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <pointsMaterial
          color="#ffffff"
          size={1.6}
          sizeAttenuation={false}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Comets({ count = 6 }: { count?: number }) {
  // Occasional shooting stars streaking across the backdrop.
  // Each comet is a short line (head + tail) that drifts across, fades in/out,
  // and respawns at a fresh random position when its life ends.
  const linesRef = useRef<THREE.LineSegments>(null);
  const positions = useMemo(() => new Float32Array(count * 6), [count]);
  const colors = useMemo(() => new Float32Array(count * 6), [count]);

  type Comet = { pos: THREE.Vector3; vel: THREE.Vector3; life: number; maxLife: number; delay: number };
  const cometsRef = useRef<Comet[]>([]);

  const spawn = (): Comet => {
    const radius = 230 + Math.random() * 180;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.9;
    const pos = new THREE.Vector3(
      Math.cos(theta) * Math.cos(phi) * radius,
      Math.sin(phi) * radius * 0.6,
      Math.sin(theta) * Math.cos(phi) * radius - 100, // bias toward scene depth
    );
    // Velocity roughly tangential to position so comets sweep across
    const vel = new THREE.Vector3(
      -pos.z + (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 25,
      pos.x + (Math.random() - 0.5) * 30,
    ).normalize().multiplyScalar(40 + Math.random() * 60);
    const maxLife = 2.2 + Math.random() * 2.5;
    const delay = Math.random() * 5; // staggered initial / respawn delay
    return { pos, vel, life: -delay, maxLife, delay };
  };

  useEffect(() => {
    cometsRef.current = Array.from({ length: count }, () => spawn());
    // Initialize buffer to off-screen so nothing flashes at frame 0
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < 6; j++) {
        positions[i * 6 + j] = 0;
        colors[i * 6 + j] = 0;
      }
    }
  }, [count, positions, colors]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((_, delta) => {
    if (!linesRef.current) return;
    const comets = cometsRef.current;
    for (let i = 0; i < count; i++) {
      const c = comets[i];
      if (!c) continue;
      c.life += delta;
      if (c.life >= c.maxLife) {
        comets[i] = spawn();
        continue;
      }
      if (c.life < 0) {
        // Pre-life delay — invisible
        for (let j = 0; j < 6; j++) {
          positions[i * 6 + j] = 0;
          colors[i * 6 + j] = 0;
        }
        continue;
      }
      c.pos.addScaledVector(c.vel, delta);
      const u = c.life / c.maxLife;
      const fade = u < 0.18 ? u / 0.18 : u > 0.78 ? (1 - u) / 0.22 : 1;
      // Tail position: behind the head along velocity direction
      const tailScale = -0.18;
      positions[i * 6 + 0] = c.pos.x + c.vel.x * tailScale;
      positions[i * 6 + 1] = c.pos.y + c.vel.y * tailScale;
      positions[i * 6 + 2] = c.pos.z + c.vel.z * tailScale;
      positions[i * 6 + 3] = c.pos.x;
      positions[i * 6 + 4] = c.pos.y;
      positions[i * 6 + 5] = c.pos.z;
      // Tail dark → head bright cream-gold
      colors[i * 6 + 0] = 0;
      colors[i * 6 + 1] = 0;
      colors[i * 6 + 2] = 0;
      colors[i * 6 + 3] = fade * 1.0;
      colors[i * 6 + 4] = fade * 0.95;
      colors[i * 6 + 5] = fade * 0.85;
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry} frustumCulled={false} renderOrder={-2}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  );
}

const RESEARCH_GLYPHS = ["α", "θ", "ñ", "ø", "φ"];
const LINGUA_GLYPHS = ["Hi", "Hola", "Salut", "Ciao", "Olá"];

function PlanetThemeOverlay({ planet }: { planet: ResolvedPlanet }) {
  switch (planet.theme) {
    case "corona":
      return <CoronaTheme planet={planet} />;
    case "rings":
      return <RingsTheme planet={planet} />;
    case "glyphs":
      return <OrbitingTextTheme planet={planet} symbols={RESEARCH_GLYPHS} speed={0.2} radiusMul={1.8} fontSize={0.6} />;
    case "alphabet":
      return <OrbitingTextTheme planet={planet} symbols={LINGUA_GLYPHS} speed={0.12} radiusMul={2.0} fontSize={0.45} />;
    case "asteroids":
      return <AsteroidsTheme planet={planet} />;
    case "wireframe":
      return <WireframeTheme planet={planet} />;
    case "pulse":
      return <PulseTheme planet={planet} />;
  }
}

function Planet({ planet, isActive }: { planet: ResolvedPlanet; isActive: boolean; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (planet.isStar ? 0.04 : 0.08);
    }
  });

  return (
    <group position={planet.worldPos}>
      {/* Single combined halo */}
      <mesh>
        <sphereGeometry args={[planet.size * 1.25, 24, 18]} />
        <meshBasicMaterial color={planet.glow} transparent opacity={planet.isStar ? 0.22 : 0.16} depthWrite={false} />
      </mesh>
      {/* Planet body — skipped for the welcome planet so the profile pic isn't
          obscured by the gold sphere. The halo around it still gives the glow. */}
      {planet.id !== "you" && (
        <mesh ref={meshRef}>
          <sphereGeometry args={[planet.size, 40, 28]} />
          {planet.isStar ? (
            <meshBasicMaterial color={planet.color} toneMapped={false} />
          ) : (
            <meshStandardMaterial
              color={planet.color}
              emissive={planet.glow}
              emissiveIntensity={0.7}
              roughness={0.55}
              metalness={0.15}
            />
          )}
        </mesh>
      )}
      {planet.isStar && <pointLight color={planet.glow} intensity={4} distance={80} decay={1.5} />}

      {/* Profile photo on the front of the welcome planet (the sun) */}
      {planet.id === "you" && (
        <Suspense fallback={null}>
          <ProfileFace planet={planet} />
        </Suspense>
      )}

      {/* Theme overlays disabled — caused mount/unmount churn on every planet
          transition which crashed weaker devices. */}

      {/* Content card (2D overlay, only visible for the active planet) */}
      <Html
        position={[0, 0, 0]}
        center
        zIndexRange={[20, 0]}
        style={{
          pointerEvents: isActive ? "auto" : "none",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.7s ease",
          transform: "translate(0, 0)",
        }}
        wrapperClass="planet-card-wrap"
      >
        <div
          className="planet-card"
          style={{
            minWidth: 320,
            maxWidth: 380,
            padding: "22px 26px",
            background: "rgba(10, 8, 4, 0.78)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: `1px solid ${planet.glow}55`,
            borderRadius: 18,
            boxShadow: `0 18px 60px rgba(0,0,0,0.55), 0 0 40px ${planet.glow}30`,
            color: "#f5f0e8",
            transform: "translate(140px, -50%)",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.74rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: planet.glow,
              marginBottom: 10,
              opacity: 0.9,
            }}
          >
            {planet.sectionLabel}
          </div>
          <div
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "1.55rem",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "#f5f0e8",
              marginBottom: planet.role ? 6 : 14,
            }}
          >
            {planet.name}
          </div>
          {planet.role && (
            <div
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.98rem",
                color: planet.glow,
                marginBottom: 14,
                opacity: 0.9,
              }}
            >
              {planet.role}
            </div>
          )}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {planet.bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  fontSize: "0.98rem",
                  lineHeight: 1.5,
                  color: "rgba(245,240,232,0.86)",
                  paddingLeft: 14,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.6em",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: planet.glow,
                    boxShadow: `0 0 6px ${planet.glow}`,
                  }}
                />
                {b}
              </li>
            ))}
          </ul>
          {planet.cta && (
            <a
              href={planet.cta.href}
              target={planet.cta.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: 18,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.86rem",
                color: planet.glow,
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px solid ${planet.glow}80`,
                background: `${planet.glow}18`,
                letterSpacing: "0.05em",
              }}
            >
              {planet.cta.label}
            </a>
          )}
        </div>
      </Html>
    </group>
  );
}

function Nebula() {
  // Subtle distant glow patches that drift slowly
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.003;
    }
  });
  return (
    <group ref={ref}>
      <mesh position={[-40, 10, -120]}>
        <sphereGeometry args={[55, 32, 32]} />
        <meshBasicMaterial color="#3a1a5a" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[60, -20, -180]}>
        <sphereGeometry args={[70, 32, 32]} />
        <meshBasicMaterial color="#5a2030" transparent opacity={0.07} depthWrite={false} />
      </mesh>
      <mesh position={[-30, -30, -230]}>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial color="#1a3a5a" transparent opacity={0.07} depthWrite={false} />
      </mesh>
    </group>
  );
}

const HYPERSPACE_SECONDS = 2.8;
const FADE_OUT_SECONDS = 0.4;  // streak fade folded into the LAST portion of hyperspace
const MAX_SCROLL = PLANETS_INFO[PLANETS_INFO.length - 1].t;

function Hyperspace({ intensityRef }: { intensityRef: React.RefObject<number> }) {
  // Streaks live in CAMERA-LOCAL space (a group that follows the camera each frame).
  // So no matter where the camera is or which way it faces, the streaks always
  // fill the FOV and fly past the viewer's point of view.
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  const STREAK_COUNT = 70;
  const MAX_RADIUS = 75; // covers the full FOV at typical streak depth
  const SPAWN_Z = -210;  // far in front of camera (camera looks down -z in local space)
  const RESET_Z = 12;    // recycle once past the camera (slightly behind)

  const geometry = useMemo(() => {
    const positions = new Float32Array(STREAK_COUNT * 6);
    const colors = new Float32Array(STREAK_COUNT * 6);
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#e8c96e"),
      new THREE.Color("#a8d8ff"),
      new THREE.Color("#ffb15a"),
    ];
    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      // sqrt sampling → uniform 2D disc area, so streaks aren't bunched in the center
      const radius = Math.sqrt(Math.random()) * MAX_RADIUS;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const zHead = -10 - Math.random() * 200; // distributed throughout the depth
      const len = 6 + Math.random() * 14;
      positions[i * 6 + 0] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = zHead - len;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = zHead;
      const head = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 6 + 0] = 0; colors[i * 6 + 1] = 0; colors[i * 6 + 2] = 0;
      colors[i * 6 + 3] = head.r; colors[i * 6 + 4] = head.g; colors[i * 6 + 5] = head.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!linesRef.current || !groupRef.current) return;

    const intensity = intensityRef.current;
    if (matRef.current) {
      matRef.current.opacity = Math.max(0, Math.min(1, intensity));
    }
    // Skip ALL per-frame work once warp is fully faded — saves 140× per-frame buffer writes
    if (intensity < 0.005) return;

    // Lock the group to the camera so the streaks are always in the camera's frame
    groupRef.current.position.copy(camera.position);
    groupRef.current.quaternion.copy(camera.quaternion);

    const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
    // Streaks move +z (toward and past camera) in camera-local space
    const speed = 90 + intensity * 320;
    for (let i = 0; i < STREAK_COUNT; i++) {
      positions[i * 6 + 2] += speed * delta;
      positions[i * 6 + 5] += speed * delta;
      if (positions[i * 6 + 5] > RESET_Z) {
        // Recycle far in front of camera, fresh xy on the disc
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * MAX_RADIUS;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const zHead = SPAWN_Z - Math.random() * 80;
        const len = 6 + Math.random() * 14;
        positions[i * 6 + 0] = x;
        positions[i * 6 + 1] = y;
        positions[i * 6 + 2] = zHead - len;
        positions[i * 6 + 3] = x;
        positions[i * 6 + 4] = y;
        positions[i * 6 + 5] = zHead;
      }
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={geometry} frustumCulled={false} renderOrder={-1}>
        <lineBasicMaterial
          ref={matRef}
          vertexColors
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

function Scene({
  scrollRef,
  onActivePlanetChange,
  hyperIntensityRef,
  planets,
  curve,
}: {
  scrollRef: React.RefObject<number>;
  onActivePlanetChange: (i: number) => void;
  hyperIntensityRef: React.RefObject<number>;
  planets: ResolvedPlanet[];
  curve: THREE.CatmullRomCurve3;
}) {
  const { camera } = useThree();
  const smoothScroll = useRef(0);
  const lastActive = useRef(-1);
  const phaseStart = useRef<number | null>(null);
  const lookAtTarget = useMemo(() => new THREE.Vector3(), []);
  const forwardTarget = useMemo(() => new THREE.Vector3(), []);
  const showcaseOffset = useMemo(() => new THREE.Vector3(), []);
  const planetDelta = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const tmpDir = useMemo(() => new THREE.Vector3(), []);
  const lookAtInit = useRef(false);
  const [activePlanet, setActivePlanet] = useState(0);

  useFrame((state) => {
    if (phaseStart.current === null) phaseStart.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - phaseStart.current;

    // Lock vertical up so the camera never rolls (a major source of "weird angles")
    camera.up.set(0, 1, 0);

    if (elapsed < HYPERSPACE_SECONDS) {
      // ── Hyperspace entry ──
      const t = elapsed / HYPERSPACE_SECONDS;
      const ease = 1 - Math.pow(1 - t, 3);
      const startZ = 380;
      const endZ = ARC_POINTS[0][2];
      const z = startZ - (startZ - endZ) * ease;
      camera.position.set(0, 0, z);

      // Look target during hyperspace = the SUN's world position (exactly what
      // normal mode will use at scroll t=0). For most of the warp the camera
      // looks straight down -z (so streaks fly past symmetrically), then in the
      // last ~30% it gently turns to lock onto the sun. By the time the warp
      // ends, the lookAt direction is identical to normal mode's — no snap.
      planetDelta.copy(planets[0].worldPos);
      tmpDir.set(0, 0, z - 80);
      const handoffStart = 0.7;
      const rawHandoff = Math.max(0, (ease - handoffStart) / (1 - handoffStart));
      const handoff = rawHandoff * rawHandoff * (3 - 2 * rawHandoff);
      tmpDir.lerp(planetDelta, handoff);
      if (!lookAtInit.current) {
        lookAtTarget.copy(tmpDir);
        lookAtInit.current = true;
      }
      lookAtTarget.lerp(tmpDir, 0.2);
      camera.lookAt(lookAtTarget);

      const fadeStart = HYPERSPACE_SECONDS - FADE_OUT_SECONDS;
      hyperIntensityRef.current =
        elapsed > fadeStart ? Math.max(0, 1 - (elapsed - fadeStart) / FADE_OUT_SECONDS) : 1;
    } else {
      // ── Normal exploration ──
      // Camera follows the arc and looks DIRECTLY at the smoothly interpolated
      // position between adjacent planets — never snaps because the interpolation
      // is continuous. Heavy smoothing keeps the camera feeling calm and intentional.
      hyperIntensityRef.current = 0;

      const rawScroll = isFinite(scrollRef.current) ? scrollRef.current : 0;
      smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, rawScroll, 0.06);
      if (!isFinite(smoothScroll.current)) smoothScroll.current = 0;
      const t = Math.max(0, Math.min(MAX_SCROLL, smoothScroll.current));

      const camPos = curve.getPointAt(t);
      if (isFinite(camPos.x) && isFinite(camPos.y) && isFinite(camPos.z)) {
        camera.position.copy(camPos);
      }

      const tangentT = Math.max(0.001, Math.min(0.999, t));
      tangent.copy(curve.getTangentAt(tangentT)).normalize();
      forwardTarget.copy(camPos).addScaledVector(tangent, 90);

      // Find the two surrounding planets (sorted by t)
      let beforeIdx = 0;
      for (let i = 0; i < planets.length; i++) {
        if (planets[i].t <= t) beforeIdx = i;
      }
      const afterIdx = Math.min(beforeIdx + 1, planets.length - 1);
      const before = planets[beforeIdx];
      const after = planets[afterIdx];
      const span = after.t - before.t;
      const rawBlend = span > 1e-6 ? Math.max(0, Math.min(1, (t - before.t) / span)) : 0;
      const smoothBlend = rawBlend * rawBlend * (3 - 2 * rawBlend); // smoothstep

      // Continuously interpolated planet target — moves smoothly from one planet
      // to the next as you scroll, so the camera never jerks between targets.
      let nearestIdx = smoothBlend < 0.5 ? beforeIdx : afterIdx;
      let nearestDistance = Math.abs(t - planets[nearestIdx].t);
      for (let i = 0; i < planets.length; i++) {
        const d = Math.abs(t - planets[i].t);
        if (d < nearestDistance) {
          nearestDistance = d;
          nearestIdx = i;
        }
      }

      // ── Continuous planet-to-planet focus ──
      // The lookAt target is the smoothstep-blended interpolation between the
      // CURRENT and NEXT planet's positions. This means: full focus on each
      // planet at its t-value, smooth pan across to the next. No mid-segment
      // forward-look (which is what was causing the jerky "snap" away from
      // each planet at the end of the journey).
      const eased = rawBlend * rawBlend * (rawBlend * (rawBlend * 6 - 15) + 10); // quintic smoothstep — even softer than cubic
      planetDelta.copy(before.worldPos).lerp(after.worldPos, eased);

      // Defensive: if the candidate lookAt target ends up almost directly above
      // or below the camera (which makes lookAt degenerate and the camera
      // points straight up), nudge it forward along the curve tangent.
      tmpDir.copy(planetDelta).sub(camPos);
      const distSq = tmpDir.lengthSq();
      if (distSq > 1e-6) {
        tmpDir.multiplyScalar(1 / Math.sqrt(distSq));
        if (Math.abs(tmpDir.y) > 0.92) {
          planetDelta.addScaledVector(tangent, 20);
        }
      }

      forwardTarget.copy(planetDelta);
      void showcaseOffset;

      if (!lookAtInit.current) {
        lookAtTarget.copy(forwardTarget);
        lookAtInit.current = true;
      }
      // Slow lerp — head turns gradually, never whips. Quintic smoothing on
      // the segment blend + this temporal lerp = silky transitions throughout.
      lookAtTarget.lerp(forwardTarget, 0.045);
      camera.lookAt(lookAtTarget);

      // Active planet for UI — hysteresis switches at 50% of segment
      if (nearestIdx !== lastActive.current) {
        lastActive.current = nearestIdx;
        setActivePlanet(nearestIdx);
        onActivePlanetChange(nearestIdx);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      {/* Custom starfield — bright points, camera-centered so always 360° around you */}
      <StarField count={1400} />
      <Comets count={2} />
      <Hyperspace intensityRef={hyperIntensityRef} />
      {planets.map((p, i) => (
        <Planet key={p.id} planet={p} index={i} isActive={i === activePlanet} />
      ))}
    </>
  );
}

function ResponsiveCamera({ isSmallScreen }: { isSmallScreen: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = isSmallScreen ? 64 : 55;
      camera.updateProjectionMatrix();
    }
  }, [camera, isSmallScreen]);

  return null;
}

export default function Space3D({ onExit }: { onExit: () => void }) {
  const scrollRef = useRef<number>(0);
  const hyperIntensityRef = useRef<number>(1);
  const [activePlanet, setActivePlanet] = useState(0);
  // Phase-based state — only updates on threshold crossings, not on every wheel event
  const [scrollPhase, setScrollPhase] = useState<"start" | "mid" | "end">("start");
  const [uiReady, setUiReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Smooth two-phase exit: play a brief warp-out fade, THEN ask the parent to unmount.
  const EXIT_DURATION_MS = 700;
  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    window.setTimeout(() => onExit(), EXIT_DURATION_MS);
  };
  // Direct DOM refs for the progress bar — bypasses React on every scroll tick
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scrollPhaseRef = useRef<"start" | "mid" | "end">("start");

  // Updates the progress UI without re-rendering React on every wheel event
  const syncProgressDOM = () => {
    const v = scrollRef.current;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${(v / MAX_SCROLL) * 100}%`;
    }
    const next: "start" | "mid" | "end" = v < 0.02 ? "start" : v >= MAX_SCROLL - 0.005 ? "end" : "mid";
    if (next !== scrollPhaseRef.current) {
      scrollPhaseRef.current = next;
      setScrollPhase(next);
    }
  };

  // Build the arc curve once.
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        ARC_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        false,
        "centripetal",
        0.5,
      ),
    [],
  );

  // Compute each planet's world position: sit ON the arc but offset perpendicular
  // to the curve's tangent (so the camera flies *past* each one rather than through it).
  const planets: ResolvedPlanet[] = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    return PLANETS_INFO.map((info) => {
      // Position planet slightly AHEAD on the curve from its t-value, so the
      // camera sees it in its forward gaze rather than swinging 90° perpendicular.
      // This dramatically reduces required head turns.
      const visualT = Math.min(1, info.t + 0.06);
      const pos = curve.getPointAt(visualT);
      const tangent = curve.getTangentAt(visualT);
      const right = new THREE.Vector3().crossVectors(tangent, up);
      if (right.lengthSq() > 1e-6) right.normalize();
      else right.set(1, 0, 0);
      const sideScale = isSmallScreen ? 0.48 : 1;
      const heightScale = isSmallScreen ? 0.7 : 1;
      pos.add(right.multiplyScalar(info.side * sideScale));
      pos.y += info.height * heightScale;
      return { ...info, worldPos: pos };
    });
  }, [curve, isSmallScreen]);

  useEffect(() => {
    // Reveal the UI overlays once the hyperspace journey completes.
    const t = setTimeout(() => setUiReady(true), HYPERSPACE_SECONDS * 1000 + 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const updateScreenSize = () => setIsSmallScreen(window.innerWidth <= 760);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0006;
      scrollRef.current = Math.max(0, Math.min(MAX_SCROLL, scrollRef.current + delta));
      syncProgressDOM();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") triggerExit();
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        scrollRef.current = Math.min(MAX_SCROLL, scrollRef.current + 0.04);
        syncProgressDOM();
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        scrollRef.current = Math.max(0, scrollRef.current - 0.04);
        syncProgressDOM();
      }
    };
    // Touch handling for mobile
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      scrollRef.current = Math.max(0, Math.min(MAX_SCROLL, scrollRef.current + dy * 0.0015));
      syncProgressDOM();
      touchY = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.body.style.overflow = prevOverflow;
    };
  }, [onExit]);

  const jumpToPlanet = (i: number) => {
    scrollRef.current = planets[i].t;
    syncProgressDOM();
  };

  return (
    <div
      className="space3d-root"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#04020a",
        cursor: "grab",
        // Zoom-out + fade transition when exiting 3D mode
        transform: isExiting ? "scale(0.9)" : "scale(1)",
        opacity: isExiting ? 0 : 1,
        transition: isExiting
          ? `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.32, 0, 0.18, 1), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.32, 0, 0.18, 1)`
          : "none",
        transformOrigin: "center center",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 380], fov: isSmallScreen ? 64 : 55, near: 0.1, far: 1500 }}
        gl={{
          antialias: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
          alpha: false,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        onCreated={({ camera, gl }) => {
          camera.position.set(0, 0, 380);
          camera.up.set(0, 1, 0);
          camera.lookAt(0, 0, 300);
          // Recover from any WebGL context loss instead of staying blank
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          }, false);
        }}
      >
        <color attach="background" args={["#04020a"]} />
        <ResponsiveCamera isSmallScreen={isSmallScreen} />
        <Scene
          scrollRef={scrollRef}
          onActivePlanetChange={setActivePlanet}
          hyperIntensityRef={hyperIntensityRef}
          planets={planets}
          curve={curve}
        />
      </Canvas>

      {/* ── UI overlays (fade in after hyperspace) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: uiReady ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: uiReady ? "auto" : "none",
        }}
      >

      {/* ── Exit button ── */}
      <button
        className="space-exit"
        onClick={triggerExit}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          background: "rgba(10,10,8,0.55)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(201,168,76,0.35)",
          color: "#e8c96e",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "0.82rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "10px 22px",
          borderRadius: "999px",
          cursor: "pointer",
          transition: "background 0.2s ease, transform 0.2s ease, color 0.2s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(201,168,76,0.9)";
          e.currentTarget.style.color = "#0a0a08";
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(10,10,8,0.55)";
          e.currentTarget.style.color = "#e8c96e";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Exit 3D ×
      </button>

      {/* ── Logo ── */}
      <div
        className="space-logo"
        style={{
          position: "absolute",
          top: 26,
          left: 28,
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 10px #c9a84c" }} />
        <span style={{ color: "#c9a84c", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.95rem", letterSpacing: "0.16em" }}>KS</span>
      </div>

      {/* ── Planet nav (right side rail) ── click any to jump to that planet */}
      <div
        className="space-rail"
        style={{
          position: "absolute",
          right: 28,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 10,
          alignItems: "flex-end",
        }}
      >
        {planets.map((p, i) => {
          const active = i === activePlanet;
          return (
            <button
              key={p.id}
              onClick={() => jumpToPlanet(i)}
              aria-label={`Jump to ${p.name}`}
              aria-current={active ? "true" : undefined}
              className="space-rail-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "none",
                border: "none",
                padding: "6px 4px",
                cursor: "pointer",
                color: active ? p.glow : "rgba(245,240,232,0.55)",
                opacity: active ? 1 : 0.7,
                transition: "opacity 0.25s ease, color 0.3s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.74rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 8px rgba(0,0,0,0.7)",
                  whiteSpace: "nowrap",
                }}
              >
                {p.sectionLabel}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: active ? 28 : 8,
                  height: 6,
                  borderRadius: 999,
                  background: active ? p.glow : "rgba(245,240,232,0.4)",
                  transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease",
                  boxShadow: active ? `0 0 12px ${p.glow}aa` : "none",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* ── Scroll hint (only at start) ── */}
      {scrollPhase === "start" && (
        <div
          className="space-hint"
          style={{
            position: "absolute",
            bottom: 42,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(245,240,232,0.7)",
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontStyle: "italic",
            fontSize: "1.05rem",
            textAlign: "center",
            zIndex: 10,
            pointerEvents: "none",
            animation: "spaceHintPulse 2.2s ease-in-out infinite",
          }}
        >
          <div style={{ marginBottom: 8 }}>scroll to journey through the system</div>
          <div style={{ fontSize: "1.4rem", letterSpacing: "0.3em", opacity: 0.8 }}>↓</div>
        </div>
      )}

      {/* ── End-of-journey CTA ── */}
      {scrollPhase === "end" && (
        <div
          className="space-end-cta"
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 12,
            zIndex: 10,
          }}
        >
          <a
            className="space-end-link"
            href="mailto:kailashshankar@ufl.edu"
            style={{
              background: "rgba(10,10,8,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(232,201,110,0.5)",
              color: "#ffe39a",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              padding: "11px 22px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Say hello →
          </a>
          <a
            className="space-end-link"
            href="https://www.linkedin.com/in/kailash-shankar"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "rgba(10,10,8,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(232,201,110,0.5)",
              color: "#ffe39a",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              padding: "11px 22px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            LinkedIn ↗
          </a>
        </div>
      )}

      {/* ── Progress bar ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(245,240,232,0.08)",
          zIndex: 10,
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, #c9a84c, #ffe39a, #ff8a3c)",
            transition: "width 0.18s linear",
            boxShadow: "0 0 12px rgba(232,201,110,0.6)",
          }}
        />
      </div>

      </div>{/* /UI overlays */}

      <style>{`
        @keyframes spaceHintPulse {
          0%, 100% { opacity: 0.55; transform: translateX(-50%) translateY(0); }
          50%       { opacity: 1;    transform: translateX(-50%) translateY(6px); }
        }
        @keyframes exitFlashIn {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { opacity: 0.9; }
          100% { opacity: 1; transform: scale(1.6); }
        }
        @keyframes exitDimIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes exitContentFade {
          0%   { opacity: 1; filter: blur(0px); transform: scale(1); }
          100% { opacity: 0; filter: blur(14px); transform: scale(1.12); }
        }
        @media (max-width: 760px) {
          .space3d-root {
            cursor: default !important;
            touch-action: none;
          }
          .space-exit {
            top: 14px !important;
            right: 14px !important;
            padding: 9px 14px !important;
            font-size: 0.72rem !important;
            letter-spacing: 0.08em !important;
            z-index: 30 !important;
          }
          .space-logo {
            top: 18px !important;
            left: 16px !important;
            gap: 8px !important;
            z-index: 30 !important;
          }
          .planet-card-wrap {
            max-width: 100vw;
            pointer-events: none;
          }
          .planet-card {
            min-width: 0 !important;
            width: min(86vw, 340px) !important;
            max-width: min(86vw, 340px) !important;
            max-height: 36vh !important;
            overflow-y: auto !important;
            padding: 16px 18px !important;
            border-radius: 16px !important;
            transform: translate(-50%, calc(-100% - 46px)) !important;
            box-shadow: 0 12px 42px rgba(0,0,0,0.62), 0 0 28px rgba(232,201,110,0.16) !important;
            pointer-events: auto;
          }
          .planet-card > div:first-child {
            font-size: 0.62rem !important;
            letter-spacing: 0.13em !important;
            margin-bottom: 7px !important;
          }
          .planet-card > div:nth-child(2) {
            font-size: 1.22rem !important;
            line-height: 1.1 !important;
          }
          .planet-card li {
            font-size: 0.9rem !important;
            line-height: 1.38 !important;
          }
          .planet-card a {
            width: 100%;
            text-align: center;
            font-size: 0.78rem !important;
            padding: 8px 12px !important;
          }
          .space-rail {
            left: 50% !important;
            right: auto !important;
            top: auto !important;
            bottom: 28px !important;
            transform: translateX(-50%) !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 9px !important;
            width: calc(100vw - 32px);
            padding: 8px 10px;
            border-radius: 999px;
            background: rgba(4,2,10,0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 24 !important;
          }
          .space-rail-btn {
            padding: 8px 4px !important;
            gap: 0 !important;
          }
          .space-rail-btn span:first-child {
            display: none;
          }
          .space-rail-btn span:last-child {
            width: 10px !important;
            height: 10px !important;
            border-radius: 999px !important;
          }
          .space-rail-btn[aria-current="true"] span:last-child {
            width: 28px !important;
          }
          .space-hint {
            bottom: 86px !important;
            width: calc(100vw - 40px);
            font-size: 0.95rem !important;
            line-height: 1.25;
          }
          .space-end-cta {
            bottom: 86px !important;
            width: min(86vw, 320px);
            flex-direction: column !important;
            gap: 10px !important;
          }
          .space-end-link {
            width: 100%;
            text-align: center;
            padding: 10px 16px !important;
            font-size: 0.78rem !important;
          }
        }
        @media (max-width: 430px) {
          .planet-card {
            width: min(90vw, 320px) !important;
            max-width: min(90vw, 320px) !important;
            max-height: 34vh !important;
            padding: 14px 16px !important;
            transform: translate(-50%, calc(-100% - 38px)) !important;
          }
          .space-rail {
            width: calc(100vw - 24px);
            bottom: 24px !important;
            gap: 7px !important;
          }
          .space-hint,
          .space-end-cta {
            bottom: 80px !important;
          }
        }
      `}</style>

    </div>
  );
}
