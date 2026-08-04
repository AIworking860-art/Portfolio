import { motion } from "framer-motion";


function MotionWrapper({children,className}){


return(

<motion.div

className={className}


initial={{

opacity:0,

y:40

}}


animate={{

opacity:1,

y:0

}}


transition={{

duration:1,

ease:"easeOut"

}}

>

{children}

</motion.div>

)


}


export default MotionWrapper;