
const input = document.querySelector(".añadir-input");
const addBtn = document.querySelector(".añadir-btn");
const ul = document.querySelector("ul");
const vacio = document.querySelector(".vacio");

addBtn.addEventListener("click", e =>{
    let text = input.value; 

    if( text !== ""){
        const li = document.createElement("li");

        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
        li.textContent = text;
        li.appendChild(agregarBtn());
        ul.appendChild(li);

        //Almacenar tareas en un array en el localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(text);
        //Almacenamos el array en el localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        input.value = "";

        vacio.style.display = "none";
    }

});

function agregarBtn(){
    const btnDelete = document.createElement("button");

    btnDelete.innerHTML = '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
    btnDelete.className = "btn btn-danger";

    btnDelete.addEventListener("click", e => {
        const item = e.target.closest("li");

        //Almacenamos el texto de la tarea que se va a eliminar
        const taskText = item.textContent;

        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if(items.length === 0) vacio.style.display = "block";

        //Obtenemos las tareas almacenadas en el localStorage
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        //Encontramos y eliminamos las tareas en el array del localStorage
        const updatedTasks = savedTasks.filter(task => task !== taskText);
        //Almacenamos el array actualizado en el localStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });

    return btnDelete;
}

//Obtenemos las tareas almacenadas en el localStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Pintamos las tareas almacenadas en el localStorage
savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.textContent = task;
    li.appendChild(agregarBtn());
    ul.appendChild(li);
});

if (savedTasks.length > 0) vacio.style.display = "none";