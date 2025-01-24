document.getElementById('formreservas').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_reserva = document.getElementById('id_reserva').value;
    let fecha_emision = document.getElementById('fecha_emision').value;
    let fecha_reserva = document.getElementById('fecha_reserva').value;
    let estado_reserva = document.getElementById('estado_reserva').value;
    let valor = document.getElementById('valor').value;


    let reserva = {
        id_reserva: id_reserva,
        fecha_emision: fecha_emision,
        fecha_reserva: fecha_reserva,
        estado_reserva:estado_reserva,
        valor: valor
    };

    agregarreserva(reserva);
    resetForm();
});

function agregarreserva(reserva) {
    const tabla = document.getElementById('reservass');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${reserva.id_reserva}</td>
        <td>${reserva.fecha_emision}</td>
        <td>${reserva.fecha_reserva}</td>
        <td>${reserva.estado_reserva}</td>
        <td>${reserva.valor}</td>

        <td><button class="btn btn-danger btn-sm" onclick="eliminarreserva(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formreservas').reset();
}

function eliminarreserva(button) {
    if (confirm('¿Está seguro de que desea eliminar el dato?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
