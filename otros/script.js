//funcion para agregar cliente

document.getElementById('formpasajero').addEventListener('submit', function(e){
    e.preventDefault();
    let id_pasajero = document.getElementById('id_pasajero').value;
    let nombres = document.getElementById('nombres').value;
    let apellidos = document.getElementById('apellidos').value;
    let documento = document.getElementById('documento').value;
    let edad = document.getElementById('edad').value;
    let pais_de_origen = document.getElementById('pais_de_origen').value;
    let telefono_1 = document.getElementById('telefono_1').value;
    let telefono_2 = document.getElementById('telefono_2').value;
    let email = document.getElementById('email').value;

    //crear el objeto que va  arecoger la informacion
 
let pasajero = {
    id_pasajero: id_pasajero,
    nombres: nombres,
    apellidos: apellidos,
    documento: documento,
    edad: edad,
    pais_de_origen: pais_de_origen,
    telefono_1: telefono_1,
    telefono_2: telefono_2,
    email: email,
}

 agregarPasajero(pasajero);
 resetForm();
});

//agregar cliente

function agregarPasajero(pasajeros){
    const tabla = document.getElementById('pasajeross');
    const fila = document.createElement('tr');

 // id  clientes          esto es para generar numeros aleatorios  <td>${Math.floor(Math.random() * 10000)}</td>

    const idpasajero= pasajeros.id_pasajero;

    fila.innerHTML = `
        <td>${(pasajeros.id_pasajero)}</td>
        <td>${(pasajeros.nombres)}</td>
        <td>${(pasajeros.apellidos)}</td>
        <td>${(pasajeros.documento)}</td>
        <td>${(pasajeros.edad)}</td>
        <td>${(pasajeros.pais_de_origen)}</td>
        <td>${(pasajeros.telefono_1)}</td>
        <td>${(pasajeros.telefono_2 ||'N/A')}</td>
        <td>${(pasajeros.email)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarPasajero(${idpasajero}, this)">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
}
function resetForm(){
    document.getElementById('formpasajero').reset();

}

/* function eliminarPasajero(idpasajero, button){
    fetch(`http://127.0.0.1:5500/eliminar_pasajero/${idpasajero}`, {
        method: 'DELETE'
    })
    
    .then (response => {
        if (response.ok){
            const fila = button.parentNode.parentNode;
            fila.parentNode.removeChild(fila);
        } else { 
            console.error('Error al eliminar el Cliente');
        }
    })
    .catch(error => console.error('Error:', error));
} */


function eliminarPasajero(id_Pasajero, button){
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    alert(`Esta seguro de eliminar el Registro?c.`);
}