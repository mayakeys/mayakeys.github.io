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

  type();
});
