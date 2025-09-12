document.addEventListener("DOMContentLoaded", function () {
  const closeBtn = document.querySelector(".close-btn");
  const popup = document.querySelector(".img_div");

  if (closeBtn && popup) {
    closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });
  }
});
