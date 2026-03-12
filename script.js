let index = 0;

mostrarImagen();

function mostrarImagen(){

let imagenes = document.getElementsByClassName("slide");

for(let i = 0; i < imagenes.length; i++){

imagenes[i].style.display = "none";

}

index++;

if(index > imagenes.length){

index = 1;

}

imagenes[index-1].style.display = "block";

setTimeout(mostrarImagen, 3000);

}
