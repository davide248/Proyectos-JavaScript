// ---------------> CLASE CUENTA <---------------
class Cuenta{

    constructor(titular, numero, clave, saldo){
        this.titular = titular;
        this.numero = numero;
        this.clave = clave;
        this.saldo = saldo;
    }

    getNombre(){
        return  this.titular;
    }
    
    getSaldo(){
        return this.saldo;
    }

    toString(){
        return this.titular + " C.C.: " + this.numero + " - " + this.saldo + "€";
    }

    login(pass){
        if(this.clave === pass) return true;

        return flase;
    }

    ingresarDinero(cantidad){
         this.saldo+=cantidad;
    }

    sacarDinero(cantidad){
        this.saldo-=cantidad;
    }

    static validarCuenta(num){
        return cuentas.find(cuenta => cuenta.numero === num);
    }

    transferencia(num, cantidad){
        if(Cuenta.validarCuenta(num)){
            let c = Cuenta.validarCuenta(num);

            this.sacarDinero(cantidad);

            c.ingresarDinero(cantidad);

        }else{
            prompt("La cuenta no existe");
            return;
        }
    }

}

// ---------------> DATOS CUENTAS <---------------

let c1 = new Cuenta("David", "123", "d1a2", 3000);
let c2 = new Cuenta("Marian", "456", "m4a5", 15000);
let c3 = new Cuenta("Sam", "789", "p7e8", 8000);

let cuentas = [c1, c2, c3];


// ---------------> FUNCIONAMIENTO APP <---------------

//Única funcionalidad que se puede realizar sin estar logueado

const bCuentas = document.getElementById("bCuentas");

bCuentas.addEventListener("click", () =>{

    datos.innerHTML = "";

    let lista = document.createElement("ul");

    lista.innerHTML = "";

    for (let i = 0; i < cuentas.length; i++) {

        let li = document.createElement("li");
        let p = document.createElement("p");
        let cuenta = cuentas[i];

        p.appendChild(document.createTextNode(cuenta));
        li.appendChild(p);
        lista.appendChild(li);
        datos.appendChild(lista);
    }
    
})


//1º comprobamos si la cuenta es válida  
const bLogin = document.getElementById("bLogin");

    bLogin.addEventListener("click", login);

let maxIntentos = 3; 
let intentos = 0; 

let loginInput;

function login() {
  loginInput = document.getElementById("login");

  let cuenta = Cuenta.validarCuenta(loginInput.value);

  if (cuenta) {

    datos.innerHTML = "";

    main(cuenta);
    saludar(cuenta);

    loginInput.value = "";

    cambiarBLogin();
    
  } else {
    intentos++; 

    if (intentos < maxIntentos) {
      alert("El número de cuenta introducido no es correcto. Intentos restantes: " + (maxIntentos - intentos));
      loginInput.value = ""; // Limpiar el campo de entrada
    } else {
      alert("Has alcanzado el número máximo de intentos permitidos");
      // Deshabilitar el campo de entrada después de alcanzar el número máximo de intentos
      loginInput.disabled = true; 
      return false;
    }

    // Colocar el foco en el campo de entrada permitiendo escribir
    // en el campo sin tener que volver a hacer click en él
    loginInput.focus(); 
  }
}

function logout() {

    // Recargamos la página 
    location.reload(); 

  }

// ****** Funciones sueltas para modificar el HTML ******

function mostrarCuenta(cuenta){
    total.innerHTML = "";
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(cuenta.toString()));
    total.appendChild(p);
}

const introDatos = document.getElementById("introDatos");

function cambiarLabel(){

    loginInput.value = "";

    introDatos.innerHTML = "<label>Introduce la cantidad:</label>";

}

function saludar(cuenta){
    let saludo = document.getElementById("saludo");

    saludo.innerHTML = "";

    let h1 = document.createElement("h1");

    h1.style.fontSize = "1em";
    h1.style.marginBottom = "-15px";
    h1.style.marginTop = "-5px";

    h1.appendChild(document.createTextNode("Bienvenido " + cuenta.getNombre()));
    saludo.appendChild(h1);
}

let bOperar;

function cambiarBLogin(){
    const buttonContainer = bLogin.parentNode;

    bOperar = document.createElement("button");

    bOperar.id = "bOperar";
    bOperar.className = "bLogin";
    bOperar.textContent = "OK";

    buttonContainer.replaceChild(bOperar, bLogin);
}

function textoConfirmacion(){
    datos.innerHTML = "";
    let p = document.createElement("p");
    p.appendChild(document.createTextNode("La cuenta se ha actualizado correctamente"));
    datos.appendChild(p);
}

let numCuentaInput;

function agregarInput() {
    const loginContainer = document.getElementById("loginContainer");
  
    if (loginContainer) {

      loginContainer.style.display = "flex";
      loginContainer.style.flexDirection = "column";

      // Creamos el campo de entrada para el número de cuenta
      numCuentaInput = document.createElement("input");
      numCuentaInput.id = "numCuenta";
      numCuentaInput.type = "text";
      numCuentaInput.style.marginBottom = "5px";
  
      // Creamos el elemento de etiqueta (label)
      const label = document.createElement("label");
      label.style.alignItems = "left";
      label.textContent = "Introduce la cuenta de destino:";
      label.htmlFor = "numCuenta";
      label.style.marginBottom = "5px";
  
      // Insertar el nuevo input después del input existente
      loginContainer.insertBefore(numCuentaInput, loginContainer.childNodes[1].nextSibling);
      // Insertar el label después del input existente
      loginContainer.insertBefore(label, loginContainer.childNodes[1].nextSibling);
    } 

  }
  

//Aquí se ejecutan todas las funciones, una vez logueado
function main(cuenta){

    if(cuenta){
        //Declaramos aquí las variables que referencian a los botones
        //para que solo puedan usuarse si estás logueado
        let datos = document.getElementById("datos");
        let total = document.getElementById("total");

        const bSaldo = document.getElementById("bSaldo");
        const bIngresar = document.getElementById("bIngresar");
        const bRetirar = document.getElementById("bRetirar");
        const bTransfer = document.getElementById("bTransfer");
        const bSalir = document.getElementById("bSalir");

        //Mostramos la información del clien en la parte inferior
        //llamaremos a esta función en cada parte del código
        //que altere el saldo de la cuenta
        mostrarCuenta(cuenta);

        bSaldo.addEventListener("click", () =>{
            mostrarCuenta(cuenta);
        });

        //Con esta variable realizamos el seguimiento del evento click
        //para poder verificar si hay una operación anterior y eliminarla
        let operacionActual = null;

        loginInput.value = "";

        bIngresar.addEventListener("click", () => {
            datos.innerHTML = "";
        
            cambiarLabel();
        
            if (operacionActual) {
                bOperar.removeEventListener("click", operacionActual);
            }
        
            operacionActual = () => {
                let cantidad = parseInt(loginInput.value);
                cuenta.ingresarDinero(cantidad);
                textoConfirmacion();
                mostrarCuenta(cuenta);
            };
        
            bOperar.addEventListener("click", operacionActual);
        });

        loginInput.value = "";

        bRetirar.addEventListener("click", () => {
            datos.innerHTML = "";
        
            cambiarLabel();
        
            if (operacionActual) {
                bOperar.removeEventListener("click", operacionActual);
            }
        
            operacionActual = () => {
                let cantidad = parseInt(loginInput.value);
                cuenta.sacarDinero(cantidad);
                textoConfirmacion();
                mostrarCuenta(cuenta);
            };
        
            bOperar.addEventListener("click", operacionActual);
        });

        loginInput.value = "";

        bTransfer.addEventListener("click", () => {
            datos.innerHTML = "";
        
            cambiarLabel();
            agregarInput();
        
            if (operacionActual) {
                bOperar.removeEventListener("click", operacionActual);
            }
        
            operacionActual = () => {
                let cantidad = parseInt(loginInput.value);
                let num = numCuentaInput.value;
                cuenta.transferencia(num, cantidad);
                textoConfirmacion();
                mostrarCuenta(cuenta);
            };
        
            bOperar.addEventListener("click", operacionActual);
        });

        bSalir.addEventListener("click", logout);

    }
}



