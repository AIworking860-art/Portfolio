import { EffectComposer, Bloom } from "@react-three/postprocessing";


function BloomEffect(){

return(

<EffectComposer>

<Bloom

intensity={1.8}

luminanceThreshold={0.2}

luminanceSmoothing={0.9}

radius={0.8}

/>

</EffectComposer>


);

}


export default BloomEffect;