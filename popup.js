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
document.addEventListener('DOMContentLoaded', () => {
  const slidesEl = document.querySelector(".slides");
  const indicatorsEl = document.querySelector(".indicators");
  const closeBtn = document.querySelector(".c");
  const popup = document.querySelector(".i");
  const coverflowContainer = document.querySelector(".coverflow-container");

  // Lê anúncios do HTML
  const ads = Array.from(document.querySelectorAll(".ads div")).map(div => ({
    img: div.dataset.img,
    link: div.dataset.link || null
  }));

  let current = 0;
  let intervalId = null;

  // Monta os slides e os indicadores
  function createSlides() {
    ads.forEach((ad, i) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.dataset.index = i;

      const content = ad.link
        ? `<a href="${ad.link}" target="_blank"><img src="${ad.img}" alt="Publicidade"></a>`
        : `<img src="${ad.img}" alt="Publicidade">`;
      
      slide.innerHTML = content;
      slidesEl.appendChild(slide);

      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.addEventListener("click", () => {
        current = i;
        updateSlides();
        resetInterval();
      });
      indicatorsEl.appendChild(dot);
    });
  }

  // Atualiza as classes dos slides (active, prev, next)
  function updateSlides() {
    const allSlides = document.querySelectorAll(".slide");
    allSlides.forEach((slide, i) => {
      slide.classList.remove("active", "prev", "next");

      if (i === current) {
        slide.classList.add("active");
      } else if (i === (current - 1 + ads.length) % ads.length) {
        slide.classList.add("prev");
      } else if (i === (current + 1) % ads.length) {
        slide.classList.add("next");
      }
    });
    updateIndicators();
  }

  // Atualiza os indicadores
  function updateIndicators() {
    document.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  // Inicia a rotação automática
  function startRotation() {
    intervalId = setInterval(() => {
      current = (current + 1) % ads.length;
      updateSlides();
    }, 5000);
  }

  // Reseta o intervalo
  function resetInterval() {
    clearInterval(intervalId);
    startRotation();
  }

  // Adiciona botões de navegação
  function createNavButtons() {
    const prevBtn = document.createElement("button");
    prevBtn.classList.add("nav-button", "prev-btn");
    prevBtn.innerHTML = "‹";
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + ads.length) % ads.length;
      updateSlides();
      resetInterval();
    });
    coverflowContainer.appendChild(prevBtn);

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("nav-button", "next-btn");
    nextBtn.innerHTML = "›";
    nextBtn.addEventListener("click", () => {
      current = (current + 1) % ads.length;
      updateSlides();
      resetInterval();
    });
    coverflowContainer.appendChild(nextBtn);
  }

  // Inicia a aplicação
  if (ads.length > 0) {
    createSlides();
    createNavButtons();
    updateSlides();
    startRotation();
  } else {
    console.log("Nenhum anúncio encontrado para exibir.");
  }

  // Botão de fechar
  closeBtn.addEventListener("click", () => {
    popup.classList.remove('s');
    clearInterval(intervalId);
  });
});
