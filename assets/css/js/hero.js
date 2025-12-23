const text = "Learning-based robotics and machine learning for real-world systems.";
const speed = 50;

let i = 0;
const target = document.getElementById("typed-text");

function type() {
  if (i < text.length) {
    target.textContent += text.charAt(i);
    i++;
    setTimeout(type, speed);
  } else {
    setTimeout(exitHero, 600);
  }
}

function exitHero() {
  const hero = document.getElementById("hero");
  const content = document.getElementById("site-content");

  hero.style.transition = "transform 0.8s ease, opacity 0.8s ease";
  hero.style.transform = "translateY(-100%)";
  hero.style.opacity = "0";

  content.classList.remove("hidden");
  content.style.transition = "opacity 0.8s ease";
  content.style.opacity = "1";

  setTimeout(() => hero.remove(), 900);
}

type();
