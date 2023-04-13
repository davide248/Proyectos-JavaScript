//VARIABLES
const botonNumero = document.querySelectorAll('[data-numero]');
const botonOperador = document.querySelectorAll('[data-operador]');
const botonIgual = document.querySelector('[data-igual]');
const botonBorrarTodo = document.querySelector('[data-borrar-todo]');
const botonBorrar = document.querySelector('[data-borrar]');
const textoValorSuperior = document.querySelector('[data-valor-superior]');
const textoValorInferior = document.querySelector('[data-valor-inferior]');


//CLASE CALCULADORA
class Calculadora{
    constructor(textoValorInferior, textoValorSuperior){
        this.textoValorInferior = textoValorInferior;
        this.textoValorSuperior = textoValorSuperior;
        this.valorInferior = "";
        this.valorSuperior = "";
        this.operador = undefined;
    }

    agregarNumero(numero){
        if(numero === "." && this.valorInferior.includes(".")){
            return;
        }
        this.valorInferior += numero;
    }

    imprimirDisplay(){
        this.textoValorInferior.innerText = this.valorInferior;
        this.textoValorSuperior.innerText = this.valorSuperior;
    }

    borrar(){
        this.valorInferior = this.valorInferior.slice(0, -1);
    }

    elegirOperacion(operador){
        //Si está vacío, no hacemos nada
         if(this.valorInferior == ""){
            return;
         }else if(this.valorSuperior != ""){
            this.realizarCalculo();
         }
         this.operador = operador;
         //Intercambio
         this.valorSuperior = this.valorInferior;
         this.valorInferior = "";
    }

    realizarCalculo(){
        let resultado; 
        let floatValorSup = parseFloat(this.valorSuperior);
        let floatValorInf = parseFloat(this.valorInferior);

        if(isNaN(floatValorSup) || isNaN(floatValorInf)){
            return;
        }
        
        switch(this.operador){
            case "+":
                resultado = floatValorSup + floatValorInf;
                break;
            case "-":
                resultado = floatValorSup - floatValorInf;
                break;
            case "*":
                resultado = floatValorSup * floatValorInf;
                break;
            case "÷":
                resultado = floatValorSup / floatValorInf;
                break;
            default:
                return;
        }

        this.valorInferior = resultado;
        this.operador = undefined;
        this.valorSuperior = "";
    }

    limpiarDisplay(){
        this.valorInferior = "";
        this.valorSuperior = "";
        this.operador = undefined;
    }

}


const calculadora = new Calculadora(textoValorInferior, textoValorSuperior);


//EVENTOS
botonNumero.forEach(boton =>{
    boton.addEventListener('click', () =>{
        calculadora.agregarNumero(boton.innerText);
        calculadora.imprimirDisplay();
    });
});

botonBorrar.addEventListener('click', () =>{
    calculadora.borrar();
    calculadora.imprimirDisplay();
});

botonOperador.forEach(boton =>{
    boton.addEventListener('click', () =>{
        calculadora.elegirOperacion(boton.innerText);
        calculadora.imprimirDisplay();
    });
});

botonIgual.addEventListener('click', () =>{
    calculadora.realizarCalculo();
    calculadora.imprimirDisplay();
});

botonBorrarTodo.addEventListener('click', () =>{
    calculadora.limpiarDisplay();
    calculadora.imprimirDisplay();
});
