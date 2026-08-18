document.addEventListener("DOMContentLoaded", function(){

/* ==============================
ELEMENTOS
============================== */

const botonAbrir = document.getElementById("abrirBtn");
const portada = document.getElementById("portada");
const contenido = document.getElementById("contenidoInvitacion");

const btnMusica = document.getElementById("btnMusica");
const musica = document.getElementById("musica");

const iconos = document.querySelectorAll(".animar-icono");
const secciones = document.querySelectorAll(".animar-seccion");

const tarjetas = document.querySelectorAll(".tarjeta-regalo");

const track = document.querySelector(".carrusel-track");
const puntos = document.querySelectorAll(".punto");


/* ==============================
ABRIR INVITACIÓN
============================== */

if(botonAbrir){
  botonAbrir.addEventListener("click", function(){

    if(portada){
      portada.classList.add("slide-up");
    }

    setTimeout(() => {
      if(portada) portada.style.display = "none";

      if(contenido){
        contenido.style.display = "block";
        contenido.classList.add("mostrar-invitacion");
      }
    }, 1000);

    if(musica){
      musica.play();
    }

    if(btnMusica){
      btnMusica.classList.add("playing");
      btnMusica.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }

  });
}


/* ==============================
CONTROL MÚSICA
============================== */

if(btnMusica){
  btnMusica.addEventListener("click", function(){

    if(!musica) return;

    if(musica.paused){
      musica.play();
      btnMusica.classList.add("playing");
      btnMusica.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }else{
      musica.pause();
      btnMusica.classList.remove("playing");
      btnMusica.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

  });
}
let lastScroll = 0;
const btn = document.getElementById("btnMusica");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // bajando
    btn.classList.add("oculto");
  } else {
    // subiendo
    btn.classList.remove("oculto");
  }

  lastScroll = currentScroll;
});

/* ==============================
ANIMACIÓN SCROLL
============================== */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });
},{
  threshold:0.2
});

iconos.forEach(icono => observer.observe(icono));
secciones.forEach(seccion => observer.observe(seccion));


/* ==============================
CONTADOR
============================== */

const fechaEvento = new Date("November 14, 2026 16:30:00").getTime();

const contador = setInterval(function(){

  const ahora = new Date().getTime();
  const distancia = fechaEvento - ahora;

  if(distancia <= 0){
    clearInterval(contador);
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  const d = document.getElementById("dias");
  const h = document.getElementById("horas");
  const m = document.getElementById("minutos");
  const s = document.getElementById("segundos");

  if(d) d.textContent = dias;
  if(h) h.textContent = horas;
  if(m) m.textContent = minutos;
  if(s) s.textContent = segundos;

},1000);


/* ==============================
TARJETAS REGALOS
============================== */

tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener("click", () => {

    tarjetas.forEach(t => {
      if(t !== tarjeta){
        t.classList.remove("activa");
      }
    });

    tarjeta.classList.toggle("activa");

  });
});


/* ==============================
CARRUSEL
============================== */

let index = 0;
let startX = 0;
let endX = 0;

function actualizarCarrusel(){
  if(!track) return;

  track.style.transform = `translateX(-${index * 100}%)`;

  puntos.forEach(p => p.classList.remove("activo"));
  if(puntos[index]) puntos[index].classList.add("activo");
}

/* PUNTOS */
puntos.forEach((punto, i) => {
  punto.addEventListener("click", () => {
    index = i;
    actualizarCarrusel();
  });
});

/* SWIPE */
if(track){

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){
      index++;
      if(index >= puntos.length) index = puntos.length - 1;
    }

    if(endX - startX > 50){
      index--;
      if(index < 0) index = 0;
    }

    actualizarCarrusel();
  });

}

});
