document.getElementById('formequipaje').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_equipaje = document.getElementById('id_equipaje').value;
    let tipoeq = document.getElementById('tipoeq').value;
    let peso = document.getElementById('peso').value;


    let equipaje = {
        id_equipaje: id_equipaje,
        tipoeq: tipoeq,
        peso: peso
    };

    agregarequipaje(equipaje);
    resetForm();
});

function agregarequipaje(equipaje) {
    const tabla = document.getElementById('equipajess');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${equipaje.id_equipaje}</td>
        <td>${equipaje.tipoeq}</td>
        <td>${equipaje.peso}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarequipaje(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formequipaje').reset();
}

function eliminarequipaje(button) {
    if (confirm('¿Está seguro de que desea eliminar este equipaje?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
