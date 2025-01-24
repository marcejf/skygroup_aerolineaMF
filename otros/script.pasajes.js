document.getElementById('formpasajes').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_pasaje = document.getElementById('id_pasaje').value;
    let fecha_compra = document.getElementById('fecha_compra').value;
    let clase = document.getElementById('clase').value;


    let pasaje= {
        id_pasaje: id_pasaje,
        fecha_compra:fecha_compra,
        clase: clase
    };

    agregarpasaje(pasaje);
    resetForm();
});

function agregarpasaje(pasaje) {
    const tabla = document.getElementById('pasajess');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${pasaje.id_pasaje}</td>
        <td>${pasaje.fecha_compra}</td>
        <td>${pasaje.clase}</td>

        <td><button class="btn btn-danger btn-sm" onclick="eliminarpasaje(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formpasajes').reset();
}

function eliminarpasaje(button) {
    if (confirm('¿Está seguro de que desea eliminar ??')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
