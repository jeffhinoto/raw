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

    slide.classList.remove("active");

    if (offset === 0) {
      // central
      slide.style.transform = "translate(-50%, -50%) scale(1)";
      slide.style.zIndex = 3;
      slide.style.filter = "none";
      slide.style.opacity = 1;
      slide.classList.add("active");
    } else if (offset === -1) {
      // anterior (esquerda)
      slide.style.transform = "translate(calc(-150%), -50%) scale(0.8)";
      slide.style.zIndex = 2;
      slide.style.filter = "blur(3px)";
      slide.style.opacity = 0.7;
    } else if (offset === 1) {
      // próximo (direita)
      slide.style.transform = "translate(calc(50%), -50%) scale(0.8)";
      slide.style.zIndex = 2;
      slide.style.filter = "blur(3px)";
      slide.style.opacity = 0.7;
    } else {
      // esconde o resto
      slide.style.transform = "translate(-50%, -50%) scale(0.5)";
      slide.style.zIndex = 1;
      slide.style.opacity = 0;
    }
  });

  updateIndicators(current);
}


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
