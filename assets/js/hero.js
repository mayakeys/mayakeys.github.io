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

   // Stop cursor
   document.querySelector(".cursor").style.display = "none";

   // Trigger morph animation
   hero.classList.add("hero--compact");

   // Reveal page content AFTER movement
   setTimeout(() => {
     content.classList.add("visible");
   }, 700);
  }


  type();
});
