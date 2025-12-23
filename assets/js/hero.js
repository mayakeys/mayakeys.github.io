document.addEventListener("DOMContentLoaded", () => {
  const text = "Computer Science @ Caltech · Computer Vision and Multimodal Learning";
  const speed = 45;

  let i = 0;
  const target = document.getElementById("typed-text");

  if (!target) {
    console.error("typed-text element not found");
    return;
  }

  target.textContent = "";

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
    const hero = document.getElementById("hero");
    const content = document.getElementById("site-content");

    hero.style.transition = "transform 0.9s ease, opacity 0.9s ease";
    hero.style.transform = "translateY(-100%)";
    hero.style.opacity = "0";

    content.classList.remove("hidden");
    content.style.opacity = "1";

    setTimeout(() => hero.remove(), 950);
  }

  type();
});
