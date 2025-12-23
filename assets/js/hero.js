document.addEventListener("DOMContentLoaded", () => {
  const text =
    "Computer Science @ Caltech · Computer Vision and Multimodal Learning";

  const target = document.getElementById("typed-text");
  let i = 0;

  function type() {
    if (i < text.length) {
      target.textContent += text[i++];
      setTimeout(type, 45);
    } else {
      setTimeout(() => {
        document.body.classList.remove("hero-active");
        document.body.classList.add("hero-done");
      }, 600);
    }
  }
  function exitHero() {
   const hero = document.getElementById("hero");
   const content = document.getElementById("site-content");
   const image = document.querySelector(".hero-image");

   // Move image to top-right
   image.classList.add("to-corner");

   // Fade out hero background (NOT the image)
   hero.style.transition = "opacity 0.8s ease";
   hero.style.opacity = "0";

   // Reveal site content
   setTimeout(() => {
     content.classList.remove("hidden");
     content.style.transition = "opacity 0.8s ease";
     content.style.opacity = "1";
   }, 600);

   // Remove hero after animation completes
   setTimeout(() => hero.remove(), 1200);
 }

  type();
});
