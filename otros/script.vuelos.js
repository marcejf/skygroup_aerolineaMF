document.getElementById('formvuelo').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_vuelo = document.getElementById('id_vuelo').value;
    let origen_vuelo = document.getElementById('origen_vuelo').value;
    let destino_vuelo = document.getElementById('destino_vuelo').value;
    let fecha_salida = document.getElementById('fecha_salida').value;
    let fecha_llegada = document.getElementById('fecha_llegada').value;


    let vuelo = {
        id_vuelo: id_vuelo,
        origen_vuelo: origen_vuelo,
        destino_vuelo: destino_vuelo,
        fecha_salida:fecha_salida,
        fecha_llegada: fecha_llegada
    };

    agregarvuelo(vuelo);
    resetForm();
});

function agregarvuelo(vuelo) {
    const tabla = document.getElementById('vueloss');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${vuelo.id_vuelo}</td>
        <td>${vuelo.origen_vuelo}</td>
        <td>${vuelo.destino_vuelo}</td>
        <td>${vuelo.fecha_salida}</td>
        <td>${vuelo.fecha_llegada}</td>

        <td><button class="btn btn-danger btn-sm" onclick="eliminarvuelo(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formvuelo').reset();
}

function eliminarvuelo(button) {
    if (confirm('¿Está seguro de que desea eliminar el dato?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
