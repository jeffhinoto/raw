const slidesEl = document.querySelector(".slides");
const indicatorsEl = document.querySelector(".indicators");
const closeBtn = document.querySelector(".c");
const popup = document.querySelector(".i");

// lê anúncios do HTML
const ads = Array.from(document.querySelectorAll(".ads div")).map(div => ({
  img: div.dataset.img,
  link: div.dataset.link || null
}));

let current = 0;
let intervalId = null;
const slides = [];

// monta os slides
ads.forEach(ad => {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  const content = ad.link
    ? `<a href="${ad.link}" target="_blank"><img src="${ad.img}" alt="Publicidade"></a>`
    : `<img src="${ad.img}" alt="Publicidade">`;

  slide.innerHTML = content;
  slidesEl.appendChild(slide);
  slides.push(slide);
});

// cria os indicadores
ads.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    current = i;
    updateSlides();
    resetInterval();
  });
  indicatorsEl.appendChild(dot);
});

function updateIndicators(index) {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function updateSlides() {
  slides.forEach((slide, i) => {
    const offset = i - current;

    if (offset === 0) {
      // slide ativo
      slide.style.transform = "translateX(-50%) scale(1)";
      slide.style.zIndex = 3;
      slide.style.filter = "none";
      slide.style.opacity = 1;
    } else if (offset < 0) {
      // anteriores (esquerda)
      slide.style.transform = `translateX(calc(-50% + ${offset * 120}px)) scale(0.8)`;
      slide.style.zIndex = 2;
      slide.style.filter = "blur(2px)";
      slide.style.opacity = 0.6;
    } else {
      // próximos (direita)
      slide.style.transform = `translateX(calc(-50% + ${offset * 120}px)) scale(0.8)`;
      slide.style.zIndex = 2;
      slide.style.filter = "blur(2px)";
      slide.style.opacity = 0.6;
    }
  });

  updateIndicators(current);
}

function startRotation() {
  intervalId = setInterval(() => {
    current = (current + 1) % ads.length;
    updateSlides();
  }, 5000);
}

function resetInterval() {
  clearInterval(intervalId);
  startRotation();
}

// inicia
updateSlides();
startRotation();

// botão fechar
closeBtn.addEventListener("click", () => {
  popup.classList.remove("s");
  clearInterval(intervalId);
});
