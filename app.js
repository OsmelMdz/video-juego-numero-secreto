let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroIntentosMaximo = 5;

function asignarTextoElemento(elemento, texto, color) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    if (color) {
        elementoHTML.style.color = color;
    }
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (intentos > numeroIntentosMaximo) {
        // El jugador ha superado el número máximo de intentos
        asignarTextoElemento('p', `Lo siento, has perdido. Solo tenías ${numeroIntentosMaximo} intentos para adivinar.`, 'red');
        asignarTextoElemento('h2', `El número secreto era ${numeroSecreto}`, 'yellow');
        // Deshabilitar el botón inicio
        document.querySelector('#inicio').setAttribute('disabled', 'true');
        document.getElementById('reiniciar').removeAttribute('disabled');
        // Cambiar de imagen 
        document.querySelector('#dexter').setAttribute('src', './img/dexterenojado.png');
        return;
    }
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Felicidades, acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`, 'yellow');
        asignarTextoElemento('h2', ``)
        // Deshabilitar el botón inicio
        document.querySelector('#inicio').setAttribute('disabled', 'true');
        document.getElementById('reiniciar').removeAttribute('disabled');
        // Cambiar de imagen 
        document.querySelector('#dexter').setAttribute('src', './img/dexterfelix.png');
    } else {
        // El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor', 'red');
            // Cambiar imagen
            document.querySelector('#dexter').setAttribute('src', './img/dexterpensativo.png');
            // modificar el h2 de acuerdo a los intentos que lleve
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor', 'red');
            // Cambiar imagen
            document.querySelector('#dexter').setAttribute('src', './img/dexterpensativo.png');
        }
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        document.querySelector('#inicio').style.display = 'none';
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles', 'red');
        asignarTextoElemento('h2', ``)
        document.getElementById('nuevo').removeAttribute('disabled');
        //forzar a que cambie la imagen y elimine la que tenia el el metodo reiniciar
        // Desaparecer el elemento con el id 'dexter'
        document.querySelector('#dexter').style.display = 'none';
        // Programar una función para que se ejecute después de 1 minuto
        setTimeout(function () {
            // Mostrar nuevamente el elemento con el id 'dexter'
            document.querySelector('#dexter').style.display = 'block'; // Cambia 'block' si es un elemento diferente al div
            // Cambiar el atributo 'src' para mostrar una imagen diferente
            document.querySelector('#dexter').setAttribute('src', './img/dextertriste.png');
        }, 12.5); // 60000 milisegundos = 1 minuto
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('h2', `Ingresa un número del 1 al ${numeroMaximo}`, 'white');
    asignarTextoElemento('p', `Tienes ${numeroIntentosMaximo} intentos para adivinar el número secreto`, 'yellow');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    document.getElementById('inicio').removeAttribute('disabled');
    // reiniciar la imagen a la que tenia antes de iniciar el juego
    document.querySelector('#dexter').setAttribute('src', './img/dexter.png');
}

function reiniciar() {
    //recargar la pagina 
    location.reload();
}

condicionesIniciales();

function validarInput() {
    // Obtener el valor del input
    var valorInput = document.getElementById("valorUsuario").value;
    // Eliminar cualquier carácter no numérico
    var valorNumerico = parseInt(valorInput);
    // Verificar si el valor es un número y está dentro del rango permitido
    if (isNaN(valorNumerico) || valorNumerico < 1 || valorNumerico > 10) {
        // Si no es un número o está fuera del rango, establecer el valor a la última entrada válida
        document.getElementById("valorUsuario").value = "";
    } else {
        // Si es un número válido, actualizar el valor del input
        document.getElementById("valorUsuario").value = valorNumerico;
    }
}