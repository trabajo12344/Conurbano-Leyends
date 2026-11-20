// CONURBANO LEYENDS — interacciones de la web
const $ = (selector, contexto = document) => contexto.querySelector(selector);
const $$ = (selector, contexto = document) => [...contexto.querySelectorAll(selector)];

const barraProgreso = $('#barraProgreso');
window.addEventListener('scroll', () => {
  const recorrido = document.documentElement.scrollHeight - window.innerHeight;
  barraProgreso.style.width = `${recorrido > 0 ? (window.scrollY / recorrido) * 100 : 0}%`;
}, { passive: true });

// Animaciones al entrar en pantalla
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12 });
$$('.aparece').forEach((elemento, indice) => {
  elemento.style.transitionDelay = `${Math.min(indice % 4, 3) * 65}ms`;
  observador.observe(elemento);
});


const menuMovil = $('#menuMovil');
const navegacion = $('#navegacion');
menuMovil.addEventListener('click', () => {
  const abierto = navegacion.classList.toggle('abierto');
  menuMovil.classList.toggle('activo', abierto);
  menuMovil.setAttribute('aria-expanded', String(abierto));
});
$$('#navegacion a').forEach(enlace => enlace.addEventListener('click', () => {
  navegacion.classList.remove('abierto');
  menuMovil.classList.remove('activo');
  menuMovil.setAttribute('aria-expanded', 'false');
}));


const menuCuenta = $('#menuCuenta');
const desplegable = $('#desplegable');
menuCuenta.addEventListener('click', (evento) => {
  evento.stopPropagation();
  const abierto = desplegable.classList.toggle('abierto');
  menuCuenta.setAttribute('aria-expanded', String(abierto));
});
document.addEventListener('click', (evento) => {
  if (!evento.target.closest('.menu-cuenta')) {
    desplegable.classList.remove('abierto');
    menuCuenta.setAttribute('aria-expanded', 'false');
  }
});

const modalFondo = $('#modalFondo');
const tituloModal = $('#tituloModal');
const estadoCuenta = $('#estadoCuenta');
function abrirModal(tipo) {
  tituloModal.innerHTML = tipo === 'registro' ? 'CREÁ TU<br><em>CUENTA.</em>' : 'BIENVENIDO<br><em>AL COMBATE.</em>';
  estadoCuenta.textContent = 'Esta interfaz es demostrativa: todavía no está conectada a un sistema de usuarios.';
  modalFondo.classList.add('visible');
  modalFondo.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-abierto');
  setTimeout(() => $('#usuario').focus(), 100);
}
function cerrarModal() {
  modalFondo.classList.remove('visible');
  modalFondo.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-abierto');
}
$$('[data-modal]').forEach(boton => boton.addEventListener('click', () => {
  desplegable.classList.remove('abierto');
  abrirModal(boton.dataset.modal);
}));
$('#cerrarModal').addEventListener('click', cerrarModal);
modalFondo.addEventListener('click', e => { if (e.target === modalFondo) cerrarModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    cerrarModal();
    cerrarVisor();
    desplegable.classList.remove('abierto');
  }
});
$('#formCuenta').addEventListener('submit', e => {
  e.preventDefault();
  estadoCuenta.textContent = 'Formulario de demostración: para habilitar cuentas reales hace falta conectar un servidor y una base de datos.';
  mostrarAviso('La función de cuentas todavía no está habilitada.');
});

// Visor de escenarios
const visorFondo = $('#visorFondo');
function cerrarVisor() {
  visorFondo.classList.remove('visible');
  visorFondo.setAttribute('aria-hidden', 'true');
}
$$('.escenario').forEach(boton => boton.addEventListener('click', () => {
  $('#visorImagen').src = boton.dataset.imagen;
  $('#visorImagen').alt = boton.dataset.titulo;
  $('#visorTitulo').textContent = boton.dataset.titulo;
  $('#visorDescripcion').textContent = boton.dataset.desc;
  visorFondo.classList.add('visible');
  visorFondo.setAttribute('aria-hidden', 'false');
}));
$('#cerrarVisor').addEventListener('click', cerrarVisor);
visorFondo.addEventListener('click', e => { if (e.target === visorFondo) cerrarVisor(); });

// Formulario: prepara un correo en el dispositivo del visitante.
// Reemplazar el correo de destino por la dirección oficial del equipo.
const correoDestino = ''; // Ejemplo: contacto@tudominio.com
$('#formContacto').addEventListener('submit', e => {
  e.preventDefault();
  const datos = new FormData(e.currentTarget);
  const asunto = encodeURIComponent(`[Conurbano Leyends] ${datos.get('asunto')}`);
  const cuerpo = encodeURIComponent(
    `Nombre: ${datos.get('nombre')}\nCorreo: ${datos.get('correo')}\n\n${datos.get('mensaje')}`
  );
  if (!correoDestino) {
    mostrarAviso('Formulario validado. Configurá el correo de destino en js/main.js para recibir mensajes.');
    $('#estadoFormulario').textContent = 'El formulario funciona y valida los datos. Falta configurar el correo oficial del equipo en js/main.js.';
    return;
  }
  window.location.href = `mailto:${correoDestino}?subject=${asunto}&body=${cuerpo}`;
  $('#estadoFormulario').textContent = 'Se preparó el mensaje en tu aplicación de correo.';
});

// Avisos breves
let temporizadorAviso;
function mostrarAviso(mensaje) {
  const aviso = $('#aviso');
  aviso.textContent = mensaje;
  aviso.classList.add('visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 4200);
}


$('#botonDescarga').addEventListener('click', e => {
  e.preventDefault();
  mostrarAviso('La descarga se habilitará cuando se publique el juego.');
});
