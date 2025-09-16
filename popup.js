// Lista de anúncios (pode ter só imagem ou imagem + link)
const ads = [
  { img: "https://noitescomletras.com.br/wp-content/uploads/2023/05/familia-feliz-deitada.jpg", link: "https://google.com" },
  { img: "https://placekitten.com/800/400" }, // sem link
  { img: "https://picsum.photos/800/400", link: "https://example.com" }
];

const imgEl = document.querySelector(".ad-img");
const linkEl = document.querySelector(".ad-link");
const closeBtn = document.querySelector(".c");
const popup = document.querySelector(".i");

let current = 0;

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
}

// inicia mostrando o primeiro anúncio
showAd(current);

// troca a cada 5s
setInterval(() => {
  current = (current + 1) % ads.length;
  showAd(current);
}, 5000);

// botão fechar
closeBtn.addEventListener("click", () => {
  popup.classList.remove("s");
});
