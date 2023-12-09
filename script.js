const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var ti = gsap.timeline();

    ti.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        duration: 2,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })
    .from("#herofooter",{
        y: -10,
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut,
        delay:-1
    })
}

var timeout;

function circleChapta(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX; 
    yprev = dets.clientY;
        
    circleMouseFollower(xscale, yscale);
     timeout = setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    },100);
    });
}
circleChapta();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}


document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffu = 0;
    

elem.addEventListener("mouseenter", function(details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffu = details.clientX - rotate;
    rotate = details.clientX;
    
    gsap.to(elem.querySelector("img"),{
        opacity: 1,
        display: "block",
        ease: Power3,
        top: diff,
        left: details.clientX,
        rotate: gsap.utils.clamp(-20,20, diffu * 0.5),

    });
});
elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration:0.5,
      display: "none", // Hide the image again
      ease: "power1.inOut",
    });
  });
});


circleMouseFollower();
firstPageAnim();
