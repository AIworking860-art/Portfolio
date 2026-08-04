import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import QuantumCore from "../QuantumCore/QuantumCore";
import EnergyParticles from "../QuantumCore/EnergyParticles";
import MouseParallax from "./MouseParallax";
import BloomEffect from "../Effects/Bloom";
import Stars from "./Stars";

function HeroCanvas() {

  return (

    <Canvas

camera={{

position:[0,0,5],

fov:45,

}}

dpr={[1,2]}

gl={{

antialias:true

}}

>

      <color attach="background" args={["transparent"]} />

     <ambientLight intensity={1.5} />

      <pointLight

       position={[3,3,3]}

       intensity={10}

       color="#7c3aed"

      />

      <pointLight

       position={[-3,-3,-3]}

       intensity={8}

      color="#2563eb"

       />

       <pointLight

       position={[0,5,0]}

       intensity={4}

       color="#06b6d4"

        />

      <Suspense fallback={null}>
        <MouseParallax>
          <Stars />

        <QuantumCore />
        <EnergyParticles />
        </MouseParallax>
        

      </Suspense>

      <OrbitControls

        enableZoom={false}

        autoRotate

        autoRotateSpeed={0.8}

      />
      <BloomEffect />

    </Canvas>

  );

}

export default HeroCanvas;