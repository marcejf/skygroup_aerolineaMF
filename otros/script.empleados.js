document.getElementById('formempleado').addEventListener('submit', function (e) {
    e.preventDefault();

    let id_empleado = document.getElementById('id_empleado').value;
    let nombresem = document.getElementById('nombresem').value;
    let apellidosem = document.getElementById('apellidosem').value;
    let pais_origen = document.getElementById('pais_origen').value;
    let telefono_1 = document.getElementById('telefono_1').value;
    let telefono_2= document.getElementById('telefono_2').value;
    let email= document.getElementById('email').value;
    let cargo= document.getElementById('cargo').value;
    let salario= document.getElementById('salario').value;
    let fecha_contrato= document.getElementById('fecha_contrato').value;




    let empleado = {
        id_empleado: id_empleado,
        nombresem: nombresem,
        apellidosem: apellidosem,
        pais_origen:pais_origen,
        telefono_1:   telefono_1,
        telefono_2:   telefono_2,
        email:email,
        cargo:cargo,
        salario: salario,
        fecha_contrato:fecha_contrato
    };

    agregarempleado(empleado);
    resetForm();
});

function agregarempleado(empleado) {
    const tabla = document.getElementById('empleadoss');
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${empleado.id_empleado}</td>
        <td>${empleado.nombresem}</td>
        <td>${empleado.apellidosem}</td>
        <td>${empleado.pais_origen}</td>
        <td>${empleado.telefono_1}</td>
        <td>${empleado.telefono_2}</td>
        <td>${empleado.emai}</td>
        <td>${empleado.cargo}</td>
        <td>${empleado.salario}</td>
        <td>${empleado.fecha_contrato}</td>


        <td><button class="btn btn-danger btn-sm" onclick="eliminarempleado(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
}

function resetForm() {
    document.getElementById('formempleado').reset();
}

function eliminaravion(button) {
    if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
        const fila = button.parentNode.parentNode;
        fila.parentNode.removeChild(fila);
    }
}
