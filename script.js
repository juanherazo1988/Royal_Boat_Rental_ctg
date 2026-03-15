const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", function(){
menu.classList.toggle("active");
});


const links = document.querySelectorAll("#menu a");

links.forEach(link => {
link.addEventListener("click", () => {
menu.classList.remove("active");
});
});