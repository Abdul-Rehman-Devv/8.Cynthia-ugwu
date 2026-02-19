
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
console.log(document.querySelectorAll(".elem"))
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0; 

  elem.addEventListener("mousemove", function (details) {
    var img = elem.querySelector("img");
    var imgWidth = img.offsetWidth;
    var imgHeight = img.offsetHeight;
    var centerX = details.clientX - imgWidth / 3;
    var centerY = details.clientY - imgHeight ;

   
    var diff = details.clientY - elem.getBoundingClientRect().top;
    var diffrot = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(img, {
      opacity: 1,
      ease: "power1.out",
      duration: 0.3,
      top: centerY,
      left: centerX,
      rotate: gsap.utils.clamp(-20, 20, diffrot) 
    });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      duration: 0.5,
    });
  });
});
