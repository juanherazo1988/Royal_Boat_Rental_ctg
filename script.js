document.addEventListener('DOMContentLoaded', () => {

  const slider = document.querySelector('.reseñas-slider');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');
  let currentIndex = 0;

  // -------------------------------
  // CARGAR RESEÑAS DESDE FIRESTORE
  // -------------------------------
  db.collection("reseñas")
    .orderBy("fecha", "desc")
    .onSnapshot(snapshot => {
      slider.innerHTML = "";
      snapshot.forEach(doc => {
        const r = doc.data();
        const card = document.createElement("div");
        card.classList.add("reseña-card");
        card.innerHTML = `
          <p class="estrellas">★★★★★</p>
          <p>"${r.mensaje}"</p>
          <h4>- ${r.nombre}</h4>
        `;
        slider.appendChild(card);
      });
      currentIndex = 0;
      updateSlider();
    });

  // -------------------------------
  // FUNCIONES DE DESLIZAMIENTO
  // -------------------------------
  function updateSlider() {
    const card = slider.querySelector('.reseña-card');
    if (!card) return;
    const cardWidth = card.offsetWidth + 20; // gap entre cards
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function slideNext() {
    const cards = slider.querySelectorAll('.reseña-card');
    if (!cards.length) return;
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  }

  function slidePrev() {
    const cards = slider.querySelectorAll('.reseña-card');
    if (!cards.length) return;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  }

  // -------------------------------
  // BOTONES
  // -------------------------------
  if (prevBtn) prevBtn.addEventListener('click', slidePrev);
  if (nextBtn) nextBtn.addEventListener('click', slideNext);

  // -------------------------------
  // DESLIZAMIENTO AUTOMÁTICO
  // -------------------------------
  setInterval(slideNext, 5000);

});

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

  mostrarReseñas();




function agregarReseña(){

  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;

  if(nombre === "" || mensaje === ""){
    alert("Por favor completa todos los campos");
    return;
  }

  db.collection("reseñas").add({
    nombre: nombre,
    mensaje: mensaje,
    fecha: new Date()
  })
  .then(() => {
    document.getElementById("nombre").value = "";
    document.getElementById("mensaje").value = "";
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

function mostrarReseñas(){

  const slider = document.querySelector('.reseñas-slider');

  // limpiar antes de volver a pintar
  slider.innerHTML = "";

  let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

  reseñas.forEach(r => {

    const card = document.createElement("div");
    card.classList.add("reseña-card");

    card.innerHTML = `
      <p class="estrellas">★★★★★</p>
      <p>"${r.mensaje}"</p>
      <h4>- ${r.nombre}</h4>
    `;

    slider.appendChild(card);
  });
}