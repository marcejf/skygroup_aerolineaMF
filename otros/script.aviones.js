document.getElementById('formavion').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_avion = document.getElementById('id_avion').value;
    let placa = document.getElementById('placa').value;
    let tipo = document.getElementById('tipo').value;
    let capacidad = document.getElementById('capacidad').value;
    let modelo = document.getElementById('modelo').value;
    let estado_avion= document.getElementById('estado_avion').value;

    // Crear el objeto avion
    let avion = {
        id_avion: id_avion,
        placa: placa,
        tipo: tipo,
        capacidad:capacidad,
        modelo: modelo,
        estado_avion: estado_avion
    };

    // Llamar a la función para agregar el avion
    agregaravion(avion);
    resetForm();
});

// Función para agregar un avion la tabla
function agregaravion(avion) {
    const tabla = document.getElementById('avioness');
    const fila = document.createElement('tr');

    // Crear la fila de la tabla con los datos del avion
    fila.innerHTML = `
        <td>${avion.id_avion}</td>
        <td>${avion.placa}</td>
        <td>${avion.tipo}</td>
        <td>${avion.capacidad}</td>
        <td>${avion.modelo}</td>
        <td>${avion.estado_avion}</td>

        <td><button class="btn btn-danger btn-sm" onclick="eliminaravion(this)">Eliminar</button></td>
    `;

    // Agregar la fila a la tabla
    tabla.appendChild(fila);
}

// Función para resetear el formulario
function resetForm() {
    document.getElementById('formavion').reset();
}

// Función para eliminar un avion de la tabla
function eliminaravion(button) {
    if (confirm('¿Está seguro de que desea eliminar este avion?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
