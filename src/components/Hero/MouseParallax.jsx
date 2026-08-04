import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";


function MouseParallax({children}){


const group = useRef();

const {mouse}=useThree();


useFrame(()=>{

if(!group.current) return;


group.current.rotation.y =
mouse.x * 0.15;


group.current.rotation.x =
mouse.y * 0.10;


group.current.position.x =
mouse.x * 0.15;


group.current.position.y =
mouse.y * 0.1;


});


return(

<group ref={group}>

{children}

</group>

);


}


export default MouseParallax;