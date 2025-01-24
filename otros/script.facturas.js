document.getElementById('formfactura').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_factura= document.getElementById('id_factura').value;
    let fecha_factura = document.getElementById('fecha_factura').value;
    let cantidad = document.getElementById('cantidad').value;
    let descripcion = document.getElementById('descripcion').value;
    let valor = document.getElementById('valor').value;


    let factura = {
        id_factura: id_factura,
       fecha_factura:fecha_factura,
       cantidad:cantidad,
       descripcion:descripcion,
       valor:   valor
    };

    agregarfactura(factura);
    resetForm();
});

function agregarfactura(factura) {
    const tabla = document.getElementById('facturass');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${factura.id_factura}</td>
        <td>${factura.fecha_factura}</td>
        <td>${factura.cantidad}</td>
        <td>${factura.descripcion}</td>
        <td>${factura.valor}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarfactura(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formfactura').reset();
}

function eliminarfactura(button) {
    if (confirm('¿Está seguro de que desea eliminar esta factura?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
