let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroIntentosMaximo = 5;

// Referencias a los elementos
const audioButton = document.getElementById('audioButton');
const audioPlayer = document.getElementById('audioPlayer');

// Estado de reproducción
let isPlaying = false;
let isMuted = false;

// Función para reproducir/pausar audio
audioButton.addEventListener('click', () => {
    if (!isPlaying) {
        audioPlayer.play();
        isPlaying = true;
        audioButton.innerHTML = '<i class="icon-audio">🔇</i>'; // Cambia icono a mute
    } else {
        audioPlayer.pause();
        isPlaying = false;
        audioButton.innerHTML = '<i class="icon-audio">🔊</i>'; // Cambia icono a play
    }
});

// Función para silenciar el audio
audioButton.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!isMuted) {
        audioPlayer.muted = true;
        isMuted = true;
        audioButton.innerHTML = '<i class="icon-audio">🔈</i>'; // Cambia icono a sin sonido
    } else {
        audioPlayer.muted = false;
        isMuted = false;
        audioButton.innerHTML = '<i class="icon-audio">🔊</i>'; // Cambia icono a sonido
    }
});

// Reproducir el audio nuevamente cuando termine
audioPlayer.addEventListener('ended', () => {
    audioPlayer.currentTime = 0; // Reinicia el tiempo
    audioPlayer.play(); // Reproduce de nuevo
});

// Función para asignar texto a los elementos
function asignarTextoElemento(elemento, texto, color) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    if (color) {
        elementoHTML.style.color = color;
    }
}

// Función para verificar el intento del usuario
function verificarIntento() {
    let numeroDeUsuario = document.getElementById('valorUsuario').value.trim(); // Trim para evitar espacios vacíos

    // Validar si el input está vacío
    if (numeroDeUsuario === "") {
        asignarTextoElemento('p', 'Por favor, ingresa un número antes de jugar.', 'red');
        return;
    }

    // Convertir el valor a número entero
    numeroDeUsuario = parseInt(numeroDeUsuario);

    // Continuar con el resto de la validación
    if (intentos >= numeroIntentosMaximo) {
        asignarTextoElemento('p', `Lo siento, has perdido. Solo tenías ${numeroIntentosMaximo} intentos para adivinar.`, 'red');
        asignarTextoElemento('h2', `El número secreto era ${numeroSecreto}`, 'yellow');
        document.querySelector('#inicio').setAttribute('disabled', 'true');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#dexter').setAttribute('src', './img/dexterenojado.png');
        return;
    }

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Felicidades, acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`, 'yellow');
        asignarTextoElemento('h2', '');
        document.querySelector('#inicio').setAttribute('disabled', 'true');
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#dexter').setAttribute('src', './img/dexterfelix.png');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor', 'red');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor', 'red');
        }
        intentos++;
        limpiarCaja();
    }
}

// Función para limpiar la caja de entrada
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Función para generar el número secreto
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles', 'red');
        document.querySelector('#inicio').style.display = 'none';
        document.getElementById('nuevo').removeAttribute('disabled');
        document.querySelector('#dexter').style.display = 'none';
        setTimeout(() => {
            document.querySelector('#dexter').style.display = 'block';
            document.querySelector('#dexter').setAttribute('src', './img/dextertriste.png');
        }, 12500);
    } else if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('h2', `Ingresa un número del 1 al ${numeroMaximo}`, 'white');
    asignarTextoElemento('p', `Tienes ${numeroIntentosMaximo} intentos para adivinar el número secreto`, 'yellow');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    document.getElementById('inicio').removeAttribute('disabled');
    document.querySelector('#dexter').setAttribute('src', './img/dexter.png');
}

// Función para recargar la página
function reiniciar() {
    location.reload();
}

// Validar que el input de usuario sea un número válido
function validarInput() {
    let valorInput = document.getElementById("valorUsuario").value;
    let valorNumerico = parseInt(valorInput);

    if (isNaN(valorNumerico) || valorNumerico < 1 || valorNumerico > numeroMaximo) {
        document.getElementById("valorUsuario").value = '';
    } else {
        document.getElementById("valorUsuario").value = valorNumerico;
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.log('Error al registrar el Service Worker:', error);
            });
    });
}

// Llamar a condiciones iniciales para iniciar el juego
condicionesIniciales();