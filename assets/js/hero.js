/* =========================================================
   HERO TYPING + TRANSITION
   ========================================================= */

let heroFinished = false;
let heroAnimating = true;

function finishHero() {
  if (heroFinished) return;
  heroFinished = true;
  heroAnimating = false;

  document.body.classList.add("hero-done");
  document.body.style.overflow = "auto";

  // removeHeroAfterTransition();
  // remove hero AFTER animation completes
  setTimeout(() => {
    const hero = document.getElementById("hero");
    if (hero) hero.remove();
  }, 1200); // must be >= your hero transition time
}

// function removeHeroAfterTransition() {
//   const hero = document.getElementById("hero");
//   const heroImage = hero.querySelector(".hero-image");

//   heroImage.addEventListener(
//     "transitionend",
//     (e) => {
//       // only react to the transform finishing
//       if (e.propertyName !== "transform") return;

//       heroImage.style.display = "none";
//       hero.remove(); 
//     },
//     { once: true }
//   );
// }


function initHeroTyping() {
  const line1 = "Computer Science @ Caltech";
  const line2 = "Computer Vision and Multimodal Learning";

  const target1 = document.getElementById("typed-line-1");
  const target2 = document.getElementById("typed-line-2");

  let i = 0;
  let j = 0;

  function typeLine1() {
    if (i < line1.length) {
      target1.textContent += line1[i++];
      setTimeout(typeLine1, 45);
    } else {
      setTimeout(typeLine2, 300);
    }
  }


  function typeLine2() {
    if (j < line2.length) {
      target2.textContent += line2[j++];
      setTimeout(typeLine2, 45);
    } 
    else {
      setTimeout(() => {
      setTimeout(finishHero, 400);
      }, 500);
    }
  }

  const hero = document.getElementById("hero");
  hero.addEventListener("transitionend", () => {
    if (document.body.classList.contains("hero-done")) {
      hero.style.pointerEvents = "none";
    }
  });


  typeLine1();
}


/* =========================================================
   CONSTELLATION BACKGROUND
   ========================================================= */

class Star {
  constructor(cx, cy, theme = "hero") {
    this.cx = cx;
    this.cy = cy;
    this.theme = theme;

    const r =
      theme === "nav"
        ? Math.random() * 30 + 15   // 🔹 small nav orbits
        : Math.random() * 120 + 40; // hero size

    const a = Math.random() * Math.PI * 2;

    this.radius = r;
    this.angle = a;

    this.speed =
      theme === "nav"
        ? (Math.random() - 0.5) * 0.00035 // slightly faster
        : (Math.random() - 0.5) * 0.00035;
  }

  update(dt) {
    this.angle += this.speed * dt;
    this.x = this.cx + Math.cos(this.angle) * this.radius;
    this.y = this.cy + Math.sin(this.angle) * this.radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle =
      this.theme === "nav"
        ? "rgba(80,140,210,0.45)"
        : "rgba(255,255,255,0.20)";
    ctx.fill();
  }
}




const mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

class BackgroundStar {
  constructor(w, h) {
    this.reset(w, h);
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.twinkleSpeed = Math.random() * 0.0015 + 0.0015;
  }

  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = Math.random() * 0.015 + 0.005;
    this.size = Math.random() * 1.2 + 0.4;
    this.baseAlpha = Math.random() * 0.35 + 0.25;
  }

  update(dt, h) {
    this.y -= this.speed * dt * 0.03;
    if (this.y < -10) this.y = h + 10;

    this.twinklePhase += this.twinkleSpeed * dt;
  }

  draw(ctx) {
    const boost = document.body.classList.contains("hero-done") ? 0.15 : 0;
    const twinkle =
      this.baseAlpha +
      Math.sin(this.twinklePhase) * 0.17 + boost;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 215, 140, ${Math.max(0, twinkle)})`;
    ctx.fill();
  }
}

class Constellation {
  constructor(cx, cy, count = 5, theme = "hero") {
    this.cx = cx;
    this.cy = cy;
    this.stars = [];
    this.theme = theme;

    this.driftPhase = Math.random() * Math.PI * 2;
    this.driftSpeed = theme === "nav" ? 0.00015 : 0;

    for (let i = 0; i < count; i++) {
      this.stars.push(new Star(cx, cy, theme));
    }

    this.connections = [];
    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        if (Math.random() < 0.35) {
          this.connections.push([i, j]);
        }
      }
    }
  }

  update(dt) {
    if (this.theme === "nav") {
      this.driftPhase += this.driftSpeed * dt;
      this.cx += Math.sin(this.driftPhase) * 0.05;
      this.cy += Math.cos(this.driftPhase) * 0.05;
    }

    this.stars.forEach(s => {
      s.cx = this.cx;
      s.cy = this.cy;
      s.update(dt);
    });
  }

  draw(ctx) {
  this.connections.forEach(([i, j]) => {
    const a = this.stars[i];
    const b = this.stars[j];

    ctx.lineWidth = 0.6;

    ctx.strokeStyle =
      this.theme === "nav"
        ? "rgba(80,140,210,0.18)"
        : "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1.2;

    
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });

  this.stars.forEach(s => s.draw(ctx));

  if (this.theme === "nav" && mouse.x !== null && mouse.y !== null) {
    const rect = ctx.canvas.getBoundingClientRect();
    const mx = mouse.x - rect.left;
    const my = mouse.y - rect.top;

    this.stars.forEach(s => {
      const d = Math.hypot(s.x - mx, s.y - my);
      if (d < 90) {
        ctx.strokeStyle = "rgba(80,140,210,0.25)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    });
  }


  if (this.theme === "hero" && mouse.x !== null && mouse.y !== null) {

    this.stars.forEach(s => {
      const d = Math.hypot(s.x - mouse.x, s.y - mouse.y);

      if (d < 140) {
        const alpha = (1 - d / 140) * 0.30; // very subtle

        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.6;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    });
  }

  }
}

function isFarEnough(x, y, existing, minDist) {
  return existing.every(c => {
    const dx = c.cx - x;
    const dy = c.cy - y;
    return Math.hypot(dx, dy) > minDist;
  });
}


function initConstellations() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let lastTime = performance.now();


  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  ctx.shadowBlur = 4;
  ctx.shadowColor = "rgba(255,255,255,0.3)";

  const bgStars = [];
  const BG_COUNT = 220;

  for (let i = 0; i < BG_COUNT; i++) {
    bgStars.push(new BackgroundStar(canvas.width, canvas.height));
  }

  const constellations = [];
  const TARGET = 22;
  const MIN_DISTANCE = 260; // ← tune this
  let attempts = 0;

  while (constellations.length < TARGET && attempts < 2000) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    if (isFarEnough(x, y, constellations, MIN_DISTANCE)) {
      constellations.push(
        new Constellation(
          x,
          y,
          6 + Math.floor(Math.random() * 4)
        )
      );
    }

    attempts++;
  }

  function drawRadialFocus() {
    const cx = canvas.width * 0.5;   // center horizontally
    const cy = canvas.height * 0.5;  // center vertically (hero content)

    const gradient = ctx.createRadialGradient(
      cx, cy, 120,
      cx, cy, canvas.width * 0.65
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.45, "rgba(0, 0, 0, 0.15)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.55)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (heroFinished) {
      return; }
    const delta = time - lastTime;
    lastTime = time;

    // ⭐ background stars
    bgStars.forEach(s => {
      s.update(delta, canvas.height);
      s.draw(ctx);
    });

    // ✨ constellations
    constellations.forEach(c => {
      c.update(delta);
      c.draw(ctx);
    });

    // 🌌 radial focus overlay
    if (!document.body.classList.contains("hero-done")) {
      drawRadialFocus();
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function enableScrollSkip() {
  const skip = () => finishHero();

  window.addEventListener("wheel", skip, { once: true });
  window.addEventListener("touchstart", skip, { once: true });
  window.addEventListener(
    "keydown",
    e => {
      if (["ArrowDown", "Space", "PageDown"].includes(e.code)) {
        finishHero();
      }
    },
    { once: true }
  );
}

/* =========================================================
   NAVBAR Constellations
   ========================================================= */
   function initNavConstellations() {
    const canvas = document.getElementById("nav-canvas");
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const constellations = [];
    const COUNT = 8;

    for (let i = 0; i < COUNT; i++) {
      constellations.push(
        new Constellation(
          ((i + 0.5) / COUNT) * canvas.width,  // evenly spaced X
          Math.random() * canvas.height,       // small vertical jitter
          4 + Math.floor(Math.random() * 2),
          "nav"
        )
      );
    }

    let lastTime = performance.now();
    function animate(time) {
      if (heroAnimating) {
        requestAnimationFrame(animate);
       return;
      }
      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      constellations.forEach(c => {
        c.update(delta * 0.6); // 🔥 slow + controlled
        c.draw(ctx);
      });

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }





/* =========================================================
   BOOTSTRAP
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initHeroTyping();
  enableScrollSkip();
  initConstellations();
  initNavConstellations();
});
