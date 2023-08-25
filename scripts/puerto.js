const puertosLista = document.getElementById('puerto-lista');

const paisSelect = document.getElementById('pais');

// Función para cargar las opciones de países en la lista desplegable
async function cargarPaisesEnListaDesplegable() {
    const paises = await obtenerDatos('https://localhost:7273/api/Pais');

    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais.id;
        option.textContent = pais.nombre;
        paisSelect.appendChild(option);
    });
}

// Llama a esta función para cargar los países cuando se inicia la página
cargarPaisesEnListaDesplegable();


async function mostrarPuertos() {
    const puertos = await obtenerDatos('https://localhost:7273/api/Puertoes');

    puertosLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

    puertos.forEach(puerto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${puerto.id}</td>
            <td>${puerto.nombre}</td>
            <td>${puerto.ubicacion}</td> 
            <td>
                <button onclick="editarPuerto(${puerto.id})">Editar</button>
                <button onclick="eliminarPuerto(${puerto.id})">Eliminar</button>
            </td>
        `;
        puertosLista.appendChild(row);
    });
}

mostrarPuertos();

const formNuevoPuerto = document.getElementById('form-nuevo-puerto');

formNuevoPuerto.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const paisId = paisSelect.value; // ID del país seleccionado

    // Crear el objeto Puerto
    const nuevoPuerto = {
        nombre: nombre,
        ubicacion: ubicacion,
        paisID: paisId
    };

    // Envía el nuevo puerto a la API para agregarlo
    const response = await fetch('https://localhost:7273/api/Puertoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPuerto)
    });

    if (response.ok) {
        // Actualiza la lista de Puerto
        mostrarPuertos();
        // Cierra el formulario
        cerrarFormularioNuevoPuerto();
    } else {
        console.error('Error al agregar el puerto');
    }
});


function abrirFormularioNuevoPuerto() {
    const formularioNuevoPuerto = document.getElementById('formulario-nuevo-puerto');
    formularioNuevoPuerto.style.display = 'block';
}

function cerrarFormularioNuevoPuerto() {
    const formularioNuevoPuerto = document.getElementById('formulario-nuevo-puerto');
    formularioNuevoPuerto.style.display = 'none';
}

// ...

function editarPuerto(id) {
    // Código para editar el Puerto
}

async function eliminarPuerto(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este Puerto?');

    if (!confirmacion) {
        return;
    }

    const response = await fetch(`https://localhost:7273/api/Puertoes/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        mostrarPuertos(); // Recargar la lista de Puertos después de eliminar uno
    } else {
        console.error('Error al eliminar el Puerto');
    }
}

