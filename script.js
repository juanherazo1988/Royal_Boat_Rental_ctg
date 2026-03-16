document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------
  // MENÚ HAMBURGUESA
  // -------------------------------
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if(toggle && menu){
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });

    const links = menu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }

  // -------------------------------
  // CARRUSEL DE BOTES
  // -------------------------------
  document.querySelectorAll('.bote-card').forEach(card => {
    const carousel = card.querySelector('.carousel-images');
    const prev = card.querySelector('.prev');
    const next = card.querySelector('.next');

    if(!carousel || !prev || !next) return; // evita errores si falta algo

    let index = 0;
    const images = carousel.querySelectorAll('img');
    const imagesCount = images.length;

    function updateCarousel(){
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener('click', () => {
      index = (index - 1 + imagesCount) % imagesCount;
      updateCarousel();
    });

    next.addEventListener('click', () => {
      index = (index + 1) % imagesCount;
      updateCarousel();
    });
  });

});