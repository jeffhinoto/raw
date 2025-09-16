const imgEl = document.querySelector(".ad-img");
const linkEl = document.querySelector(".ad-link");
const closeBtn = document.querySelector(".c");
const popup = document.querySelector(".i");
const indicatorsEl = document.querySelector(".indicators");

// lê anúncios do HTML
const ads = Array.from(document.querySelectorAll(".ads div")).map(div => ({
  img: div.dataset.img,
  link: div.dataset.link || null
}));

let current = 0;
let intervalId = null;

// cria as bolinhas dinamicamente
ads.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    current = i;
    showAd(current);
    resetInterval();
  });
  indicatorsEl.appendChild(dot);
});

function updateIndicators(index) {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function showAd(index) {
  const ad = ads[index];
  imgEl.src = ad.img;

  if (ad.link) {
    linkEl.href = ad.link;
    linkEl.style.pointerEvents = "auto";
  } else {
    linkEl.removeAttribute("href");
    linkEl.style.pointerEvents = "none";
  }

  updateIndicators(index);
}

function startRotation() {
  intervalId = setInterval(() => {
    current = (current + 1) % ads.length;
    showAd(current);
  }, 5000);
}

function resetInterval() {
  clearInterval(intervalId);
  startRotation();
}

// inicia
showAd(current);
startRotation();

// botão fechar
closeBtn.addEventListener("click", () => {
  popup.classList.remove("s");
  clearInterval(intervalId);
});
