import { Float, Sphere, Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Ring({ scale, rotation, color, speed }) {

  const ref = useRef();

  useFrame((state) => {

    ref.current.rotation.x += speed;

    ref.current.rotation.y += speed * .6;

    ref.current.rotation.z += speed * .3;

  });

  return (

    <Torus

      ref={ref}

      args={[scale,0.025,32,200]}

      rotation={rotation}

    >

      <meshStandardMaterial

        color={color}

        emissive={color}

        emissiveIntensity={3}

        metalness={1}

        roughness={0.15}

      />

    </Torus>

  );

}

function QuantumCore(){

  const core = useRef();

  useFrame((state)=>{

    core.current.rotation.y += .004;

    core.current.position.y =
      Math.sin(state.clock.elapsedTime)*0.15;

  });

  return(

<Float

speed={2}

rotationIntensity={0.2}

floatIntensity={0.5}

>

<group ref={core}>

<Sphere args={[1,128,128]}>

<meshPhysicalMaterial

color="#7c3aed"

metalness={1}

roughness={0}

clearcoat={1}

clearcoatRoughness={0}

transmission={0.15}

emissive="#7c3aed"

emissiveIntensity={2}

/>

</Sphere>

<Ring

scale={1.6}

rotation={[1.2,0,0]}

color="#3b82f6"

speed={0.004}

/>

<Ring

scale={2}

rotation={[0.2,1,0]}

color="#7c3aed"

speed={-0.003}

/>

<Ring

scale={2.4}

rotation={[0,0.6,1]}

color="#06b6d4"

speed={0.002}

/>

</group>

</Float>

);

}

export default QuantumCore;