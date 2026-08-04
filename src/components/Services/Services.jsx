import "./Services.css";


const services = [

{
icon:"🤖",
title:"Generative AI Development",
text:"Building AI applications using LLMs, prompt engineering and modern AI technologies."
},


{
icon:"🧠",
title:"Agentic AI Solutions",
text:"Creating intelligent AI agents that can reason, automate tasks and interact with tools."
},


{
icon:"⚡",
title:"n8n Automation",
text:"Designing automated workflows, API integrations and smart business processes."
},


{
icon:"🐍",
title:"Python Development",
text:"Developing backend solutions, automation scripts and scalable Python applications."
}


];


function Services(){


return(

<section id="services" className="services">


<h2>
What I Do
</h2>



<p className="services-subtitle">

Building intelligent solutions with AI, Automation and Python.

</p>



<div className="services-grid">


{
services.map((service,index)=>(

<div 
className="service-card"
key={index}
>


<div className="service-icon">

{service.icon}

</div>


<h3>

{service.title}

</h3>


<p>

{service.text}

</p>


</div>

))

}


</div>


</section>

)

}


export default Services;