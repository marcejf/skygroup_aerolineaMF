document.getElementById('formproveedores').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_proveedor = document.getElementById('id_proveedor').value;
    let nombreem = document.getElementById('nombreem').value;
    let rut = document.getElementById('rut').value;
    let categoria = document.getElementById('categoria').value;
    let telefono = document.getElementById('telefono').value;
    let email= document.getElementById('email').value;




    let proveedor = {
        id_proveedor: id_proveedor,
        nombreem: nombreem,
        rut: rut,
        categoria:categoria,
        telefono:   telefono,
        email:email
    };

    agregarproveedor(proveedor);
    resetForm();
});

function agregarproveedor(proveedor) {
    const tabla = document.getElementById('proveedoress');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${proveedor.id_proveedor}</td>
        <td>${proveedor.nombreem}</td>
        <td>${proveedor.rut}</td>
        <td>${proveedor.categoria}</td>
        <td>${proveedor.telefono}</td>
        <td>${proveedor.email}</td>

        <td><button class="btn btn-danger btn-sm" onclick="eliminarproveedor(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formproveedor').reset();
}

function eliminarproveedor(button) {
    if (confirm('¿Está seguro de que desea eliminar el dato?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
