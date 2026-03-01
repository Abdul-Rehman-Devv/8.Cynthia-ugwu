// Cursor follower – fixed for full viewport
var timeOut;
var circleXscale = 1;
var circleYscale = 1;
var circleFollowerInitialized = false;

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
    circleXscale = Xscale;
    circleYscale = Yscale;
    timeOut = setTimeout(function () {
      var circle = document.querySelector('#minicircle');
      if (circle) {
        circle.style.transform =
          'translate(' + dets.clientX + 'px,' + dets.clientY + 'px) scale(1,1)';
      }
    }, 100);
  });
}

function circleMouseFollower() {
  if (circleFollowerInitialized) return;
  circleFollowerInitialized = true;
  window.addEventListener('mousemove', function (dets) {
    var circle = document.querySelector('#minicircle');
    if (circle) {
      circle.style.transform =
        'translate(' + dets.clientX + 'px,' + dets.clientY + 'px) scale(' + circleXscale + ',' + circleYscale + ')';
    }
  });
}

if (document.querySelector('#minicircle')) {
  circleSkew();
  circleMouseFollower();
}

// Footer time (PKT)
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

// Project popup: open on card click, show multiple images (carousel)
(function () {
  var modal = document.getElementById('projectModal');
  var overlay = modal && modal.querySelector('.projectModalOverlay');
  var closeBtn = modal && modal.querySelector('.projectModalClose');
  var titleEl = modal && modal.querySelector('.projectModalTitle');
  var slideWrap = modal && modal.querySelector('.projectModalSlideWrap');
  var dotsWrap = modal && modal.querySelector('.projectModalDots');
  var prevBtn = modal && modal.querySelector('.projectModalPrev');
  var nextBtn = modal && modal.querySelector('.projectModalNext');
  var contentBox = modal && modal.querySelector('.projectModalContent');

  var currentIndex = 0;
  var slides = [];
  var dots = [];

  function openModal(card) {
    if (!modal || !slideWrap) return;
    var title = card.querySelector('.projectTitle');
    var gallery = card.querySelector('.projectGalleryImages');
    if (!gallery) return;
    var imgs = gallery.querySelectorAll('img');
    if (imgs.length === 0) return;

    if (title) titleEl.textContent = title.textContent;
    slides = Array.from(imgs);
    currentIndex = 0;

    slideWrap.innerHTML = '';
    slides.forEach(function (img, i) {
      var clone = img.cloneNode(true);
      clone.removeAttribute('hidden');
      if (i === 0) clone.classList.add('isActive');
      slideWrap.appendChild(clone);
    });

    dotsWrap.innerHTML = '';
    dots = [];
    if (slides.length > 1) {
      contentBox.classList.remove('singleImage');
      for (var d = 0; d < slides.length; d++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'projectModalDot' + (d === 0 ? ' isActive' : '');
        dot.setAttribute('aria-label', 'Image ' + (d + 1));
        dot.addEventListener('click', function (idx) {
          return function () { goTo(idx); };
        }(d));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    } else {
      contentBox.classList.add('singleImage');
    }

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('isOpen');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('isOpen');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function goTo(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    if (slideWrap) {
      var imgs = slideWrap.querySelectorAll('img');
      imgs.forEach(function (img, i) {
        img.classList.toggle('isActive', i === currentIndex);
      });
    }
    dots.forEach(function (dot, i) {
      dot.classList.toggle('isActive', i === currentIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });
  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if (!modal.classList.contains('isOpen')) return;
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  document.querySelectorAll('.projectCard').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card);
    });
  });
})();