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

// monta os slides
ads.forEach(ad => {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  const content = ad.link
    ? `<a href="${ad.link}" target="_blank"><img src="${ad.img}" alt="Publicidade"></a>`
    : `<img src="${ad.img}" alt="Publicidade">`;

  slide.innerHTML = content;
  slidesEl.appendChild(slide);
});

// cria os indicadores
ads.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    current = i;
    updateSlide();
    resetInterval();
  });
  indicatorsEl.appendChild(dot);
});

function updateIndicators(index) {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function updateSlide() {
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  updateIndicators(current);
}

function startRotation() {
  intervalId = setInterval(() => {
    current = (current + 1) % ads.length;
    updateSlide();
  }, 5000);
}

function resetInterval() {
  clearInterval(intervalId);
  startRotation();
}

// inicia
updateSlide();
startRotation();

// botão fechar
closeBtn.addEventListener("click", () => {
  popup.classList.remove("s");
  clearInterval(intervalId);
});
