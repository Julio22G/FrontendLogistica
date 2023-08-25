const clientesLista = document.getElementById('clientes-lista');

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


async function mostrarClientes() {
    const clientes = await obtenerDatos('https://localhost:7273/api/Cliente');

    clientesLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

    clientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.mail}</td> <!-- Corregir a cliente.mail -->
            <td>
                <button onclick="editarCliente(${cliente.id})">Editar</button>
                <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        clientesLista.appendChild(row);
    });
}

mostrarClientes();

const formNuevoCliente = document.getElementById('form-nuevo-cliente');

formNuevoCliente.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const noDocumento = document.getElementById('noDocumento').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const paisId = paisSelect.value; // ID del país seleccionado

    // Crear el objeto cliente
    const nuevoCliente = {
        nombre: nombre,
        direccion: direccion,
        noDocumento: noDocumento,
        telefono: telefono,
        mail: email,
        paisID: paisId
    };

    // Envía el nuevo cliente a la API para agregarlo
    const response = await fetch('https://localhost:7273/api/Cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCliente)
    });

    if (response.ok) {
        // Actualiza la lista de clientes
        mostrarClientes();
        // Cierra el formulario
        cerrarFormularioNuevoCliente();
    } else {
        console.error('Error al agregar el cliente');
    }
});


function abrirFormularioNuevoCliente() {
    const formularioNuevoCliente = document.getElementById('formulario-nuevo-cliente');
    formularioNuevoCliente.style.display = 'block';
}

function cerrarFormularioNuevoCliente() {
    const formularioNuevoCliente = document.getElementById('formulario-nuevo-cliente');
    formularioNuevoCliente.style.display = 'none';
}

// ...

function editarCliente(id) {
    // Código para editar el cliente
}

async function eliminarCliente(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este Cliente?');

    if (!confirmacion) {
        return;
    }

    const response = await fetch(`https://localhost:7273/api/Cliente/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        mostrarClientes(); // Recargar la lista de clientes después de eliminar uno
    } else {
        console.error('Error al eliminar el cliente');
    }
}

