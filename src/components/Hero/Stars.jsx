import { Stars } from "@react-three/drei";

function StarBackground(){

return(

<Stars

radius={120}

depth={60}

count={4000}

factor={5}

saturation={0}

fade

speed={1}

/>

);

}

export default StarBackground;