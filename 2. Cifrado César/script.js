
let textResultado = document.getElementById("resultado");
const boton = document.getElementById("boton");
const valorCifrado = 5;

function cifrar(){

     //Debemos incializarlo dentro la función para que capture correctamente su valor
    let textOriginal = document.getElementById("original").value;

    let asciiValor;
    let asciiValorValido;
    let resultado = [];

        for (let i = 0; i < textOriginal.length; i++) {
            
            //Convertimos cada caracter a código ASCII y luego le sumamos el cifrado
            asciiValor = textOriginal.charCodeAt(i);

            //Comprobamos que no nos salgamos del abecedario
            if(asciiValor >= 65 && asciiValor <= 90){
                if(asciiValor + valorCifrado > 90){
                    asciiValorValido =  asciiValor + valorCifrado - 26;
                }else{
                    asciiValorValido = asciiValor + valorCifrado;
                }
            }else if(asciiValor >= 97 && asciiValor <= 122){
                if(asciiValor + valorCifrado > 122){
                    asciiValorValido = asciiValor + valorCifrado - 26;
                }else{
                    asciiValorValido = asciiValor + valorCifrado;
                }
            }

            //Borramos el resultado anterior si no fuera la primera ejecución
            textResultado.innerHTML = "";

            //Volvemos a obtener los caracteres y lo alamcenamos en un array
            resultado += String.fromCharCode(asciiValorValido);

        } 

        let p = document.createElement("p");
        p.appendChild(document.createTextNode(resultado));
        textResultado.appendChild(p);

        //Borramos el contenido anterior del input una vez realizado el cifrado
        document.getElementById("original").value = "";
  
}

boton.addEventListener("click", cifrar); //Pasamos la funcion sin paréntesis

