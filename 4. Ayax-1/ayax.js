
// (()=>{

const $table = document.querySelector(".ayax-table"); 

    function mostrarTabla(){

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res =>{
            return res.json();
        })
        .then(json =>{
            json.forEach(el => {
                let $fila = document.createElement("tr");
                let $td = document.createElement("td");

                $td.textContent = el.id;
                $fila.appendChild($td);

                $td = document.createElement("td");
                $td.textContent = el.name;
                $fila.appendChild($td);

                $td = document.createElement("td");
                $td.textContent = el.email;
                $fila.appendChild($td);

                $td = document.createElement("td");
                $td.textContent = el.address.city;
                $fila.appendChild($td);

                $table.appendChild($fila);

            });
        })
        .catch(err =>{
            console.log(err);
        })   
    }

    function buscarUsuario(){
        const $botonBuscar = document.getElementById("button-addon2"),
              $inputBuscar = document.getElementById("textoBuscar"),
              $resultado = document.getElementById("resultado");
        let contador = 0;

              $botonBuscar.addEventListener("click", () =>{
                 const valorBuscado = $inputBuscar.value.toLowerCase(),
                       $filas = $table.getElementsByTagName("tr");
                 let encontrado = false;  

                       for(let $fila of $filas){
                            const $celdas= $fila.getElementsByTagName("td");

                            for(let $celda of $celdas){
                                if($celda.textContent.toLowerCase() == (valorBuscado)){
                                    encontrado = true;
                                    break;
                                }
                            }

                            if(encontrado) break;

                            contador++;
                       }

                       if(encontrado){
                            $resultado.style.color = "blue";
                            $resultado.textContent = valorBuscado + " está en la fila " + contador;
                            contador = 0;
                       }else{
                            $resultado.style.color = "red";
                            $resultado.textContent = "Usuario no encontrado";
                            contador = 0;
                       }

                       $inputBuscar.value = "";  

              });

    }

    document.addEventListener("DOMContentLoaded", e => {
        mostrarTabla();
        buscarUsuario();
    });
      
// })();