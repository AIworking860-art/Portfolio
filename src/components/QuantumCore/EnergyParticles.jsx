import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";


function EnergyParticles(){

const particles = useMemo(()=>{

const positions=[];


for(let i=0;i<600;i++){

positions.push(
(Math.random()-0.5)*12,
(Math.random()-0.5)*12,
(Math.random()-0.5)*12
);

}

return new Float32Array(positions);


},[]);


return(

<Points
positions={particles}
stride={3}
frustumCulled={false}
>

<PointMaterial

transparent

color="#06b6d4"

size={0.025}

sizeAttenuation

depthWrite={false}

/>

</Points>


);


}


export default EnergyParticles;