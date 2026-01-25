
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
})
function firstPageAnim() {
  let tl = gsap.timeline()

  tl.from('#nav', {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to('.boundingelem', {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from('#mainFooter', {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    })
}
var timeOut;
function circleSkew() {
  var Xscale = 1
  var Yscale = 1

  var Xprev = 0
  var Yprev = 0
  window.addEventListener('mousemove', function (dets) {
  clearTimeout(timeOut)
        Xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - Xprev)
        Yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY -Yprev)

    Xprev = dets.clientX
    Yprev = dets.clientY
    
    circleMouseFollower(Xscale,Yscale)
    timeOut=setTimeout(() => {
      document.querySelector('#minicircle').style.transform =
    `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
      
    }, 100);

  });
}
function circleMouseFollower(Xscale, Yscale) {
  window.addEventListener('mousemove', function (dets) {
    document.querySelector('#minicircle').style.transform =
    `translate(${dets.clientX}px,${dets.clientY}px) scale(${Xscale},${Yscale})`
  })
}
circleSkew()
circleMouseFollower()
firstPageAnim()

document.querySelectorAll(".elem").forEach(function (elem){
  elem.addEventListener("mousemove",function(details){
   gsap.to(elem.querySelector("img"), {
    opacity:1,
    ease: Power1.out,
    duration:0.3
   });
  
  })
});