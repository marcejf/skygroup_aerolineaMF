document.getElementById('formpago').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_pago = document.getElementById('id_pago').value;
    let tipo_pago = document.getElementById('tipo_pago').value;
    let numerocuotas = document.getElementById('numerocuotas').value;
    let medio_pago = document.getElementById('medio_pago').value;
    let numero_tarjeta = document.getElementById('numero_tarjeta').value;


    let pago= {
        id_pago: id_pago,
        tipo_pago: tipo_pago,
        numerocuotas: numerocuotas,
        medio_pago:medio_pago,
        numero_tarjeta:   numero_tarjeta,
    };

    agregarpago(pago);
    resetForm();
});

function agregarpago(pago) {
    const tabla = document.getElementById('pagoss');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${pago.id_pago}</td>
        <td>${pago.tipo_pago}</td>
        <td>${pago.numerocuotas}</td>
        <td>${pago.medio_pago}</td>
        <td>${pago.numero_tarjeta}</td>


        <td><button class="btn btn-danger btn-sm" onclick="eliminarpago(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formpago').reset();
}

function eliminarpago(button) {
    if (confirm('¿Está seguro de que desea eliminar el pago?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
