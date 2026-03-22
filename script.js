document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
// SLIDER AUTOMÁTICO DE RESEÑAS
// -------------------------------
const slider = document.querySelector('.reseñas-slider');
const prevBtn = document.querySelector('.slide-btn.prev');
const nextBtn = document.querySelector('.slide-btn.next');

if(slider && prevBtn && nextBtn){
  let scrollAmount = 0;
  const cardWidth = slider.querySelector('.reseña-card').offsetWidth + 20;

  // Flechas
  nextBtn.addEventListener('click', () => {
      if(scrollAmount < (slider.scrollWidth - slider.clientWidth)){
          scrollAmount += cardWidth;
      } else {
          scrollAmount = 0; // reinicia al final
      }
      slider.style.transform = `translateX(-${scrollAmount}px)`;
  });

  prevBtn.addEventListener('click', () => {
      if(scrollAmount > 0){
          scrollAmount -= cardWidth;
      } else {
          scrollAmount = slider.scrollWidth - slider.clientWidth; // ir al final
      }
      slider.style.transform = `translateX(-${scrollAmount}px)`;
  });

  // Slider automático cada 5 segundos
  setInterval(() => {
      if(scrollAmount < (slider.scrollWidth - slider.clientWidth)){
          scrollAmount += cardWidth;
      } else {
          scrollAmount = 0;
      }
      slider.style.transform = `translateX(-${scrollAmount}px)`;
  }, 5000);
}

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

});


function agregarReseña(){

  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;

  if(nombre === "" || mensaje === ""){
    alert("Por favor completa todos los campos");
    return;
  }

  const nuevaReseña = {
    nombre: nombre,
    mensaje: mensaje
  };

  // Obtener reseñas guardadas
  let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];

  // Agregar nueva
  reseñas.push(nuevaReseña);

  // Guardar
  localStorage.setItem("reseñas", JSON.stringify(reseñas));

  // Mostrar en pantalla
  mostrarReseñas();

  // Limpiar campos
  document.getElementById("nombre").value = "";
  document.getElementById("mensaje").value = "";
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