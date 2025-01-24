//import Swal from 'sweetalert2';

import { response } from "express";

document.addEventListener('DOMContentLoaded', () => {
    const resgisterpasajero = document.querySelector('#pasajeross')
    resgisterpasajero.addEventListener('submit', async e => {
        e.preventDefault();
        const id_pasajero = e.target.id_pasajero.value;
        const nombres = e.target.nombres.value;
        const apellidos = e.target.apellidos.value;
        const documento = e.target.documento.value;
        const edad = e.target.edad.value;
        const pais_origen = e.target.pais_origen.value;
        const telefono_1 = e.target.telefono_1.value;
        const telefono_2 = e.target.telefono_2.value;
        const email = e.target.email.value;
    
        try {                           //api/v1/pasajeros/register
            const { data } = await axios.post('/api/v1/pasajeros/register', {
                id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono_1, telefono_2, email
            });
        resgisterpasajero.reset();
        Swal.fire({
            icon: 'success',
            title: 'pasajero registrado',
            text: 'El pasajero se  ha sido registrado exitosamente'
        });
        } catch (error) {
            if (error.response) {
                console.error('Error de respuesta del servidor:', error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message || 'Error de respuesta del servidor'
                });
            } else if (error.request) {
                console.error('No  recibió respuesta del servidor:', error.request);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No recibió respuesta del servidor'
                });
            } else {
                console.error('Error al configurar la solicitud:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al configurar la solicitud'
                });
            }
        }
    });
    
    //Obtener los datos de la DB 
    async function loadpasajeros() {
        try {
            const response = await axios.get('/api/v1/pasajero/list');
            const pasajeros = response.data;
            const tableBody = document.getElementById('pasajeross');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            pasajeros.forEach(pasajeros => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pasajeros.id_pasajero}</td>
                    <td>${pasajeros.nombres}</td>
                    <td>${pasajeros.apellidos}</td>
                    <td>${pasajeros.documento}</td>
                    <td>${pasajeros.edad}</td>
                    <td>${pasajeros.pais_origen}</td>
                    <td>${pasajeros.telefono_1}</td>
                    <td>${pasajeros.telefono_2}</td>
                    <td>${pasajeros.email}</td>
                    
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="updatePasajero('${pasajeros.id_pasajero}')">Actualizar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletepasajero('${pasajeros.id_pasajero}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los pasajeros:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al cargar los clientes'
            });
        }
    }
    async function deletepasajero(id_pasajero) {
        const token = localStorage.getItem('token');
        console.log(token);
        try {
            await axios.delete(`/api/v1/pasajero/delete/${id_pasajero}`, {
                headers: {
                    Authorization: `Bearer ${token}`// Enviar el token en los encabezados de la solicitud
                }
                
            });
    
            console.log(' los pasajeros se han seliminado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'pasajero se ha eliminado',
                text: 'El pasajero ha sido eliminado exitosamente'
            });
            loadpasajeros(); // Recargar la lista de pasaero después de eliminar
        } catch (error) {
            console.error('Error al eliminar el pasajero:', error);
            alert('Error al eliminar el pasajero');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al eliminar el pasajero'
            });
        }
    }
    
    // Función para mostrar el formulario con los datos del pasajero a actualizar
    async function updatepasajero(id_pasajero) {
        const token = localStorage.getItem('token');
        const updateFields = {
            nombre: prompt('Nuevo nombre:'),
            apellidos: prompt('Nuevo apellido:'),
            documento: prompt('Nuevo correo documento:'),
            edad: prompt('edad '),
            pais_origen: prompt('pais_origen '),
            telefono_1: prompt('telefono_1'),
            telefono_2: prompt('telefono_2'),
            email: prompt('email ')
        };
    
        try {
            const { data } = await axios.patch(`/api/v1/pasajeros/update${id_pasajero}`, updateFields, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en los encabezados de la solicitud
                }
            });

            console.log('pasajeros se han actualizado con éxito');
            Swal.fire({
                icon: 'success',
                title: 'pasajero actualizado',
                text: 'El pasajero ha sido actualizado exitosamente'
            });
            loadpasajeros(); // Recargar la lista de pasajero después de actualizar
        } catch (error) {
            console.error('Error al actualizar el pasajero:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al actualizar elpasajero'
            });
        }
    }
    
    async function searchPasajero() {
        const searchInput = document.getElementById('searchInput').value;
        try {
            
            const response = await axios.get(`/api/v1/pasajero/search/${encodeURIComponent(searchInput)}`);
            //obtener datos de la respuesta 
            const pasajeros = response.data;

            //vefivoo que la respiesta sea un array
            if (!Array.isArray(pasajeros)) {
                throw new Error('La respuesta no es un array');
            }
            const tableBody = document.getElementById('pasajeross');
            tableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
    
            pasajeros.forEach(pasajero => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pasajero.id_pasajero}</td>
                    <td>${pasajero.nombres}</td>
                    <td>${pasajero.apellidos}</td>
                    <td>${pasajero.documento}</td>
                    <td>${pasajero.edad}</td>
                    <td>${pasajero.pais_origen}</td>
                    <td>${pasajero.telefono_1}</td>
                    <td>${pasajero.telefono_2}</td>
                    <td>${pasajero.email}</td>
                    
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="updatepasajero('${pasajero.id_pasajero}')">Actualizar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletepasajero('${pasajero.id_pasajero}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al buscar el pasajero:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al buscar el pasajero'
            });
        }
    }
    
    // Exponer las funciones globalmente para que puedan ser llamadas desde el HTML
    window.deletepasajero = deletepasajero;
    window.updatepasajero = updatepasajero;
    window.loadpasajeros = loadpasajeros;
    window.searchPasajero = searchPasajero;
    });
    
    
    