import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

import QuantumCore from "../QuantumCore/QuantumCore";
import EnergyParticles from "../QuantumCore/EnergyParticles";
import MouseParallax from "./MouseParallax";
import BloomEffect from "../Effects/Bloom";
import Stars from "./Stars";

function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={isMobile ? 1 : [1, 2]}
      gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[3, 3, 3]} intensity={10} color="#7c3aed" />
      <pointLight position={[-3, -3, -3]} intensity={8} color="#2563eb" />
      <pointLight position={[0, 5, 0]} intensity={4} color="#06b6d4" />

      <Suspense fallback={null}>
        {isMobile ? (
          <>
            <Stars />
            <QuantumCore />
          </>
        ) : (
          <MouseParallax>
            <Stars />
            <QuantumCore />
            <EnergyParticles />
          </MouseParallax>
        )}
      </Suspense>

      {!isMobile && (
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      )}
      {!isMobile && <BloomEffect />}
    </Canvas>
  );
}

export default HeroCanvas;