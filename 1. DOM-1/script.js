'use strict'

// ----------------- Cambiar color fondo con botón -----------------

let botRed = document.getElementById("bRed");
let botBlue = document.getElementById("bBlue");

let container = document.getElementById("container");

    botRed.addEventListener("click", () => {
        container.style.backgroundColor = botRed.value;
    });

    botBlue.addEventListener("click", () => {
        container.style.backgroundColor = botBlue.value;
    });

// ----------------- Crear una lista desordenada -----------------

const dias = ["Lunes", "Martes", "Miercoles","Jueves", "Viernes", "Sabado", "Domingo"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Ocutbre", "Noviembre", "Diciembre"];

    let boton = document.getElementById("botIntro");

    boton.addEventListener("click", () => {

        let texto = document.getElementById("inputIntro").value;

        let array = [];

        if(texto === "meses"){
            array = meses;
        }else if (texto === "dias"){
            array = dias;
        }else{
            alert('Debes introducir "meses" o "dias"');
        }

        let lista = document.querySelector("#lista");
        lista.innerHTML = ""; // Borra el contenido anterior de la lista

        for (let i = 0; i < array.length; i++) {

            let li = document.createElement("li");
            let p = document.createElement("p");
            let dia = array[i];

            p.appendChild(document.createTextNode(dia));
            li.appendChild(p);
            lista.appendChild(li);
        }

    });
