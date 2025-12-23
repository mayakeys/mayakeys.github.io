document.addEventListener("DOMContentLoaded", () => {
  console.log("hero.js loaded");

  const hero = document.getElementById("hero");
  const content = document.getElementById("site-content");
  const target = document.getElementById("typed-text");

  if (!hero || !content || !target) return;

  const text =
    "Learning-based robotics and machine learning for real-world systems.";
  const speed = 50;
  let i = 0;

  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(exitHero, 700);
    }
  }

  function exitHero() {
    hero.style.transform = "translateY(-100%)";
    hero.style.opacity = "0";

    content.classList.remove("hidden");
    content.style.opacity = "1";

    document.body.style.overflow = "auto";

    setTimeout(() => hero.remove(), 900);
  }

  type();
});
