/* minified */
window.addEventListener("load",(function(){gsap.to(".preloader",{opacity:0,duration:1,ease:"power2.out",onComplete:function(){gsap.to(".preloader",{display:"none"})}}),gsap.to(".content",{duration:1,opacity:1,y:-20,ease:"power2.out",onComplete:()=>{ScrollTrigger.refresh()}})})),document.querySelectorAll(".dropdown").forEach((function(e){e.addEventListener("change",(function(){this.nextElementSibling.href=this.value}))}));