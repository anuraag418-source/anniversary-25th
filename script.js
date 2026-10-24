// Gentle fade-in as sections scroll into view. The page works without this script.
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

// Gold sparkles (welcome screen and closing)
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.sparkles').forEach(function (box) {
    for (var i = 0; i < 34; i++) {
      var s = document.createElement('span'), z = 3 + Math.random() * 9;
      s.style.cssText = 'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;width:' + z + 'px;height:' + z + 'px;--t:' + (3.5 + Math.random() * 5) + 's;--d:' + (Math.random() * 6) + 's';
      box.appendChild(s);
    }
  });
})();

// 3D "25": stack of darker gold layers behind the front number
(function () {
  var g = document.querySelector('.big25 .gold');
  if (!g || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  var w = document.createElement('div'); w.className = 'num3d';
  g.parentNode.insertBefore(w, g);
  var n = 18;
  for (var i = n; i >= 1; i--) {
    var l = document.createElement('span'), t = i / n;
    l.className = 'layer'; l.setAttribute('aria-hidden', 'true'); l.textContent = g.textContent;
    l.style.setProperty('--c', 'hsl(38 ' + (52 - 12 * t) + '% ' + (54 - 32 * t) + '%)');
    l.style.transform = 'translateZ(' + (-i * 2.4) + 'px)';
    w.appendChild(l);
  }
  w.appendChild(g);
})();

// 3D interlocked rings: each ring is a band of thin gold facets arranged in a circle
(function () {
  var N = 40, R = 66, H = 24, SEG = 12;
  document.querySelectorAll('.ring').forEach(function (ring) {
    for (var k = 0; k < N; k++) {
      var a = k * 360 / N, L = 40 + 22 * Math.abs(Math.cos((a - 35) * Math.PI / 180));
      var s = document.createElement('i');
      s.style.cssText = 'width:' + SEG + 'px;height:' + H + 'px;margin:' + (-H / 2) + 'px 0 0 ' + (-SEG / 2) + 'px;' +
        'transform:rotateY(' + a + 'deg) translateZ(' + R + 'px);' +
        'background:linear-gradient(180deg,hsl(46 85% ' + (L + 22) + '%),hsl(41 60% ' + L + '%) 50%,hsl(36 55% ' + (L - 14) + '%))';
      ring.appendChild(s);
    }
  });
})();

// Gentle 3D tilt on photos and the details card (mouse only)
(function () {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.arch,.frame,.card,.gallery figure').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(900px) rotateY(' + (x * 9) + 'deg) rotateX(' + (-y * 9) + 'deg)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });
})();

// Background song: starts as soon as the browser allows it.
// Browsers block sound until a visitor interacts, so if autoplay is refused,
// the song begins on the first tap, click, key press or touch anywhere on the page.
(function () {
  var a = document.getElementById('song');
  if (!a) return;
  a.volume = 0.8;
  a.loop = true;
  var events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];
  function arm() { events.forEach(function (e) { document.addEventListener(e, kick, { passive: true }); }); }
  function disarm() { events.forEach(function (e) { document.removeEventListener(e, kick); }); }
  function kick() { var p = a.play(); if (p && p.catch) p.catch(function () {}); }
  a.addEventListener('playing', disarm);
  var p = a.play();
  if (p && p.catch) p.catch(arm); else arm();
})();
