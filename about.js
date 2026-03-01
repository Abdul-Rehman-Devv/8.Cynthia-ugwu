// Mini circle cursor follower (optional, matches main page)
var timeOut;
function circleSkew() {
  var Xscale = 1;
  var Yscale = 1;
  var Xprev = 0;
  var Yprev = 0;
  window.addEventListener('mousemove', function (dets) {
    clearTimeout(timeOut);
    Xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - Xprev);
    Yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - Yprev);
    Xprev = dets.clientX;
    Yprev = dets.clientY;
    circleMouseFollower(Xscale, Yscale);
    timeOut = setTimeout(function () {
      var circle = document.querySelector('#minicircle');
      if (circle) {
        circle.style.transform =
          'translate(' + dets.clientX + 'px,' + dets.clientY + 'px) scale(1,1)';
      }
    }, 100);
  });
}
function circleMouseFollower(Xscale, Yscale) {
  window.addEventListener('mousemove', function (dets) {
    var circle = document.querySelector('#minicircle');
    if (circle) {
      circle.style.transform =
        'translate(' + dets.clientX + 'px,' + dets.clientY + 'px) scale(' + Xscale + ',' + Yscale + ')';
    }
  });
}
if (document.querySelector('#minicircle')) {
  circleSkew();
  circleMouseFollower();
}

// Pakistan time in footer
function updateFooterTime() {
  var el = document.getElementById('footerTime');
  if (!el) return;
  var now = new Date();
  var timeStr = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Karachi',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  el.textContent = timeStr + ' PKT';
}
updateFooterTime();
setInterval(updateFooterTime, 60000);