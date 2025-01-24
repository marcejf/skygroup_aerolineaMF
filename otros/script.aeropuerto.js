document.getElementById('formaeropuertos').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_aeropuerto = document.getElementById('id_aeropuerto').value;
    let nombre = document.getElementById('nombre').value;
    let codigo = document.getElementById('codigo').value;
    let ciudad = document.getElementById('ciudad').value;
    let pais = document.getElementById('pais').value;

    // Crear el objeto aeropuerto
    let aeropuerto = {
        id_aeropuerto: id_aeropuerto,
        nombre: nombre,
        codigo: codigo,
        ciudad: ciudad,
        pais: pais
    };

    // Llamar a la función para agregar el aeropuerto
    agregaraeropuerto(aeropuerto);
    resetForm();
});

// Función para agregar un aeropuerto a la tabla
function agregaraeropuerto(aeropuerto) {
    const tabla = document.getElementById('aeropuertoss');
    const fila = document.createElement('tr');

    // Crear la fila de la tabla con los datos del aeropuerto
    fila.innerHTML = `
        <td>${aeropuerto.id_aeropuerto}</td>
        <td>${aeropuerto.nombre}</td>
        <td>${aeropuerto.codigo}</td>
        <td>${aeropuerto.ciudad}</td>
        <td>${aeropuerto.pais}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarAeropuerto(this)">Eliminar</button></td>
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(fila);
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('formaeropuertos').reset();
}

// Función para eliminar un aeropuerto de la tabla
function eliminarAeropuerto(button) {
    if (confirm('¿Está seguro de que desea eliminar este aeropuerto?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
