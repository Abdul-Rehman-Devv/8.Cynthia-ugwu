const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstPageAnim() {
    let tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0 ,
        duration:1.5
        ,
        ease: Expo.easeInOut 

    })
    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut, 
        duration:2,
        delay : -1,
        stagger: .2
    })
    .from("#mainFooter",{
        y:-10,
        opacity: 0,
        duration: 1.5,
        delay : -1 ,
        ease: Expo.easeInOut

    })
}
function circleMouseFollower(){
    window.addEventListener('mousemove',function(dets){
    document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
    })
}
function circleSkew(){
    var Xscale = 1
    var Yscale = 1

    var Xdiff = 0
    var Ydiff = 0
    window.addEventListener('mousemove', function(dets){
        var Xdiff = Xscale - Xprev ;
        var Ydiff = Xscale - Yprev ;
        
        Xprev = dets.clientX;
        Yprev = dets.clientY;
        console.log(Xdiff , Ydiff)

    })
}
circleSkew()
circleMouseFollower()
firstPageAnim()