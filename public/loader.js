/* TEMport® — "Look Twice" loader (no on-screen counter)
   Real progress (fonts + hero images + window load), min ~2s so it never feels fake.
   Exit: eyes double-take, the bottom-right corner lifts, the paper peels away.
   Fires window event "temport:loader-done" when the page underneath is revealed. */
(function () {
  "use strict";

  var root = document.documentElement;
  var loader = document.getElementById("tp-loader");
  if (!loader || !root.classList.contains("tp-loading")) return;

  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var MIN_MS = 2000; // shortest the loader will ever stay
  var MAX_MS = 9000; // give up waiting on slow assets
  var DOG_EAR = 40; // resting size of the folded corner (px)
  var LIFT = 124; // corner lift before the peel (px)

  var paper = loader.querySelector(".tp-paper");
  var flapG = loader.querySelector("#tp-flap-g");
  var flapPoly = loader.querySelector("#tp-flap-poly");
  var sh1 = loader.querySelector("#tp-sh1");
  var sh2 = loader.querySelector("#tp-sh2");
  var edge = loader.querySelector("#tp-edge");
  var grad = loader.querySelector("#tp-flap-grad");
  var eyesWrap = loader.querySelector(".tp-eyes");
  var eyeEls = Array.prototype.slice.call(loader.querySelectorAll(".tp-eye"));
  var pupilEls = Array.prototype.slice.call(loader.querySelectorAll(".tp-pupil"));
  var chip = loader.querySelector(".tp-chip");
  var chipText = loader.querySelector(".tp-chip-text");

  /* ---------------- helpers ---------------- */
  function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOutBack(t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

  function tween(dur, ease, step, end) {
    var s = performance.now();
    (function f(n) {
      var p = Math.min(1, (n - s) / dur);
      step(ease(p));
      if (p < 1) requestAnimationFrame(f); else if (end) end();
    })(s);
  }

  /* ---------------- paper peel geometry ---------------- */
  var size = { w: window.innerWidth, h: window.innerHeight };
  var peelS = 0;

  // keep the part of poly where a*x + b*y <= c
  function clipHP(poly, a, b, c) {
    var out = [], n = poly.length;
    for (var i = 0; i < n; i++) {
      var P = poly[i], Q = poly[(i + 1) % n];
      var fp = a * P.x + b * P.y - c, fq = a * Q.x + b * Q.y - c;
      if (fp <= 0) out.push(P);
      if ((fp < 0 && fq > 0) || (fp > 0 && fq < 0)) {
        var t = fp / (fp - fq);
        out.push({ x: P.x + (Q.x - P.x) * t, y: P.y + (Q.y - P.y) * t });
      }
    }
    return out;
  }
  function clipRect(poly) {
    poly = clipHP(poly, -1, 0, 0);
    poly = clipHP(poly, 1, 0, size.w);
    poly = clipHP(poly, 0, -1, 0);
    return clipHP(poly, 0, 1, size.h);
  }
  function pts(poly) { return poly.map(function (p) { return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" "); }
  function css(poly) { return "polygon(" + poly.map(function (p) { return p.x.toFixed(1) + "px " + p.y.toFixed(1) + "px"; }).join(",") + ")"; }
  function shift(poly, d) { return poly.map(function (p) { return { x: p.x - d, y: p.y - d }; }); }

  function setPeel(s) {
    peelS = s;
    var W = size.w, H = size.h, k = W + H - s;
    var rect = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }];
    if (s <= 0) { paper.style.clipPath = ""; flapG.style.display = "none"; return; }
    var rem = clipHP(rect, 1, 1, k);
    if (rem.length < 3) { paper.style.clipPath = "polygon(0 0,0 0,0 0)"; flapG.style.display = "none"; return; }
    paper.style.clipPath = css(rem);
    var cut = clipHP(rect, -1, -1, -k);
    if (cut.length < 3) { flapG.style.display = "none"; return; }

    // fold the cut-off corner back over the sheet: reflect across x + y = k
    var refl = cut.map(function (p) { return { x: k - p.y, y: k - p.x }; });
    var fl = clipHP(clipRect(refl), 1, 1, k);
    if (fl.length < 3) { flapG.style.display = "none"; return; }

    flapG.style.display = "";
    flapPoly.setAttribute("points", pts(fl));
    sh1.setAttribute("points", pts(clipHP(clipRect(shift(fl, 7)), 1, 1, k)));
    sh2.setAttribute("points", pts(clipHP(clipRect(shift(fl, 15)), 1, 1, k)));

    var x1 = Math.max(0, k - H), x2 = Math.min(W, k);
    edge.setAttribute("x1", x1); edge.setAttribute("y1", k - x1);
    edge.setAttribute("x2", x2); edge.setAttribute("y2", k - x2);

    var mx = (x1 + x2) / 2, my = k - mx, L = Math.min(s * 0.7, 240) / Math.SQRT2;
    grad.setAttribute("x1", mx); grad.setAttribute("y1", my);
    grad.setAttribute("x2", mx - L); grad.setAttribute("y2", my - L);
  }

  function measure() {
    var r = loader.getBoundingClientRect();
    size.w = r.width; size.h = r.height;
    setPeel(peelS);
  }
  window.addEventListener("resize", measure);
  measure();
  if (!reduce) setPeel(DOG_EAR);

  /* ---------------- real progress ---------------- */
  var t0 = performance.now();
  var domReady = true; // this script runs at the end of <body>
  var winLoaded = document.readyState === "complete";
  var fontsOk = false;
  var imgDone = 0;
  var imgs = Array.prototype.slice.call(document.querySelectorAll("#hero img")).filter(function (i) {
    return i.getClientRects().length > 0; // skip the hidden day/night twin
  });

  if (!winLoaded) window.addEventListener("load", function () { winLoaded = true; });

  if (document.fonts && document.fonts.load) {
    var ok = function () { fontsOk = true; };
    Promise.all([
      document.fonts.load('900 1em "Mona Sans"'),
      document.fonts.load('600 1em "Plus Jakarta Sans"'),
      document.fonts.load('600 1em "Inter"')
    ]).then(ok, ok);
  } else { fontsOk = true; }

  imgs.forEach(function (img) {
    if (img.complete) { imgDone++; return; }
    var once = function () { imgDone++; };
    img.addEventListener("load", once, { once: true });
    img.addEventListener("error", once, { once: true });
  });

  function target() {
    var t = domReady ? 10 : 0;
    t += fontsOk ? 30 : 0;
    t += imgs.length ? 40 * Math.min(1, imgDone / imgs.length) : 40;
    t += winLoaded ? 20 : 0;
    return t;
  }

  /* ---------------- tagline chip ---------------- */
  var stage = -1;
  var STAGES = [
    { t: "Design that\u2026", c: "chip-purple" },
    { t: "makes people\u2026", c: "chip-pink" },
    { t: "look twice.", c: "chip-green" }
  ];

  function setStage(i) {
    if (i === stage) return;
    stage = i;
    chip.classList.remove("chip-purple", "chip-pink", "chip-green");
    chip.classList.add(STAGES[i].c);
    chipText.textContent = STAGES[i].t;
    chipText.classList.remove("tp-swap");
    void chipText.offsetWidth;
    chipText.classList.add("tp-swap");
  }

  /* ---------------- eyes ---------------- */
  var spring = eyeEls.map(function () { return { x: 0, y: 0, vx: 0, vy: 0 }; });
  var px = 0, py = 0, lastMove = -1e9;
  var idle = { x: 0, y: 0 }, nextIdle = 0;
  var glanceUntil = 0, cornerMode = false;
  var pScale = 1, pScaleT = 1;

  if (!reduce) {
    window.addEventListener("pointermove", function (e) {
      px = e.clientX; py = e.clientY; lastMove = performance.now();
    }, { passive: true });
  }

  function aim(r, tx, ty, reach) {
    var dx = tx - (r.left + r.width / 2), dy = ty - (r.top + r.height / 2);
    var d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / reach);
    return { x: dx / d * k, y: dy / d * k };
  }

  function eyeStep(now) {
    if (now > nextIdle) {
      var a = Math.random() * Math.PI * 2, r = 0.45 + Math.random() * 0.5;
      idle = { x: Math.cos(a) * r, y: Math.sin(a) * r };
      nextIdle = now + 900 + Math.random() * 1300;
    }
    var cr = chip.getBoundingClientRect();
    for (var i = 0; i < eyeEls.length; i++) {
      var er = eyeEls[i].getBoundingClientRect(), reach = er.width * 0.9, t;
      if (cornerMode) t = aim(er, size.w, size.h, reach);
      else if (now < glanceUntil) t = aim(er, cr.left + cr.width * 0.5, cr.top + cr.height * 0.5, reach);
      else if (now - lastMove < 1800) t = aim(er, px, py, reach);
      else t = idle;
      var m = (er.width - pupilEls[i].offsetWidth) / 2 * 0.8, s = spring[i];
      s.vx = (s.vx + (t.x - s.x) * 0.14) * 0.74; s.x += s.vx; // slight wobble = googly
      s.vy = (s.vy + (t.y - s.y) * 0.14) * 0.74; s.y += s.vy;
      pupilEls[i].style.transform =
        "translate3d(" + (s.x * m).toFixed(2) + "px," + (s.y * m).toFixed(2) + "px,0) scale(" + pScale.toFixed(3) + ")";
    }
    pScale += (pScaleT - pScale) * 0.25;
  }

  function blink() {
    eyeEls.forEach(function (e) { e.classList.add("is-blink"); });
    setTimeout(function () { eyeEls.forEach(function (e) { e.classList.remove("is-blink"); }); }, 130);
  }
  var blinkTimer;
  function blinkLoop() {
    blinkTimer = setTimeout(function () {
      blink();
      if (Math.random() < 0.3) setTimeout(blink, 260);
      blinkLoop();
    }, 1800 + Math.random() * 2400);
  }
  if (!reduce) blinkLoop();

  /* ---------------- finish: double-take, lift, peel ---------------- */
  var finishing = false, done = false;

  function complete() {
    if (done) return;
    done = true;
    clearTimeout(blinkTimer);
    try { sessionStorage.setItem("temport_loader_seen", "1"); } catch (e) {}
    root.classList.remove("tp-loading");
    if (document.body) document.body.classList.add("tp-loaded");
    if (loader.parentNode) loader.parentNode.removeChild(loader);
    window.dispatchEvent(new CustomEvent("temport:loader-done"));
  }

  function finish() {
    if (finishing) return;
    finishing = true;
    clearTimeout(blinkTimer);
    setStage(2);

    if (reduce) {
      loader.style.transition = "opacity 0.4s ease";
      loader.style.opacity = "0";
      setTimeout(complete, 420);
      return;
    }

    eyesWrap.classList.add("is-surprised"); // "wait... what?"
    pScaleT = 0.62;
    blink();
    setTimeout(blink, 230); // look twice

    setTimeout(function () {
      eyesWrap.classList.remove("is-surprised");
      pScaleT = 1;
      cornerMode = true; // eyes watch the corner lift
      tween(340, easeOutBack, function (p) { setPeel(DOG_EAR + (LIFT - DOG_EAR) * p); });
    }, 520);

    setTimeout(function () {
      var end = size.w + size.h + 60;
      tween(900, easeInOutCubic, function (p) { setPeel(LIFT + (end - LIFT) * p); }, complete);
    }, 900);
  }

  /* ---------------- main loop ---------------- */
  var shown = 0, hit = {};

  function frame(now) {
    if (done) return;
    var el = now - t0;
    var timeCap = easeInOutQuad(Math.min(1, el / MIN_MS)) * 100;
    var tgt = el > MAX_MS ? 100 : target();
    var goal = Math.min(tgt, timeCap);
    if (shown < goal) shown = Math.min(goal, shown + Math.max(0.25, (goal - shown) * 0.09));

    if (!finishing) {
      setStage(shown < 40 ? 0 : 1);
      [25, 50, 75].forEach(function (m) {
        if (shown >= m && !hit[m]) { hit[m] = true; glanceUntil = now + 900; }
      });
    }
    if (!reduce) eyeStep(now);
    if (shown >= 99.99 && !finishing) finish();
    requestAnimationFrame(frame);
  }

  setStage(0);
  requestAnimationFrame(frame);
})();