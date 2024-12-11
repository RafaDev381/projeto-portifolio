var adicionar = document.getElementById("addTaskBtn");

adicionar.addEventListener("click", function() {
    var texto = document.getElementById("taskInput");
    var lista = document.getElementById("taskList");
    var tarefa = document.createElement("li");
    var remover = document.createElement("button");

    tarefa.innerHTML = texto.value;
    lista.appendChild(tarefa);
    tarefa.appendChild(remover);
    remover.addEventListener("click", function() {
        lista.removeChild(tarefa);
    })
})