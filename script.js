document.querySelectorAll("section").forEach((section)=>{

section.style.opacity="0";
section.style.transform="translateY(20px)";

setTimeout(()=>{

section.style.transition="0.8s ease";

section.style.opacity="1";
section.style.transform="translateY(0)";


},200);


});
