const envioLista = document.getElementById('maritimo-lista');
const clienteSelect = document.getElementById('cliente');
const tipoProductoSelect = document.getElementById('tipoProducto');
const puertoSelect = document.getElementById('puerto');

async function cargarClientesEnListaDesplegable() {
    const clientes = await obtenerDatos('https://localhost:7273/api/Cliente');

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nombre;
        clienteSelect.appendChild(option);
    });
}

async function cargarTiposProductoEnListaDesplegable() {
    const tiposProducto = await obtenerDatos('https://localhost:7273/api/TipoDeProductoes');

    tiposProducto.forEach(tipoProducto => {
        const option = document.createElement('option');
        option.value = tipoProducto.id;
        option.textContent = tipoProducto.nombre;
        tipoProductoSelect.appendChild(option);
    });
}

async function cargarPuertosEnListaDesplegable() {
    const puertos = await obtenerDatos('https://localhost:7273/api/Puertoes');

    puertos.forEach(puerto => {
        const option = document.createElement('option');
        option.value = puerto.id;
        option.textContent = puerto.nombre;
        puertoSelect.appendChild(option);
    });
}

cargarClientesEnListaDesplegable();
cargarTiposProductoEnListaDesplegable();
cargarPuertosEnListaDesplegable();


async function mostrarEnviosMaritimos() {
    const envios = await obtenerDatos('https://localhost:7273/api/EnvioMaritimoes');

    envioLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

    for (const envio of envios) {
        const clienteNombre = await obtenerNombreCliente(envio.clienteID); // Obtener el nombre del cliente
        const productonombre = await obtenerNombreProducto(envio.tipoProductoID); // Obtener el nombre del cliente
        const puertonombre = await obtenerNombrePuerto(envio.puertoID); // Obtener el nombre del cliente

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${envio.id}</td>
            <td>${clienteNombre}</td> <!-- Mostrar el nombre del cliente -->
            <td>${productonombre}</td>
            <td>${puertonombre}</td>
            <td>${envio.fechaRegistro}</td>
            <td>${envio.fechaEntrega}</td>
            <td>${envio.precioEnvio}</td>
            <td>${envio.numeroFlota}</td>
            <td>${envio.numeroGuia}</td>
            <td>${envio.descuentoAplicado}</td>
            <td>${envio.cantidadProducto}</td>
            <td>
                <button onclick="editarEnvio(${envio.id})">Editar</button>
                <button onclick="eliminarEnvio(${envio.id})">Eliminar</button>
            </td>
        `;
        envioLista.appendChild(row);
    }
}

async function obtenerNombreCliente(clienteID) {
    try {
        const cliente = await obtenerDatos(`https://localhost:7273/api/Cliente/${clienteID}`);
        return cliente.nombre;
    } catch (error) {
        return "SIN CLIENTE";
    }
}

async function obtenerNombreProducto(productoid) {
    try {
        const cliente = await obtenerDatos(`https://localhost:7273/api/TipoDeProductoes/${productoid}`);
        return cliente.nombre;
    } catch (error) {
        return "SIN producto";
    }
}
async function obtenerNombrePuerto(puertoid) {
    try {
        const cliente = await obtenerDatos(`https://localhost:7273/api/Puertoes/${puertoid}`);
        return cliente.nombre;
    } catch (error) {
        return "SIN producto";
    }
}



async function mostrarEnviosMaritimosss() {
    const envios = await obtenerDatos('https://localhost:7273/api/EnvioMaritimoes');

    envioLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

    envios.forEach(envio => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${envio.id}</td>
            <td>${envio.cliente ? envio.cliente.nombre : 'Sin cliente'}</td>
            <td>${envio.tipoProducto ? envio.tipoProducto.nombre : 'Sin tipo de producto'}</td>
            <td>${envio.puerto ? envio.puerto.nombre : 'Sin puerto'}</td>
            <td>${envio.fechaRegistro}</td>
            <td>${envio.fechaEntrega}</td>
            <td>${envio.precioEnvio}</td>
            <td>${envio.numeroFlota}</td>
            <td>${envio.numeroGuia}</td>
            <td>${envio.descuentoAplicado}</td>
            <td>${envio.cantidadProducto}</td>
            <td>
                <button onclick="editarEnvio(${envio.id})">Editar</button>
                <button onclick="eliminarEnvio(${envio.id})">Eliminar</button>
            </td>
        `;
        envioLista.appendChild(row);
    });
}

async function mostrarEnviosMaritimosS() {
    const envios = await obtenerDatos('https://localhost:7273/api/EnvioMaritimoes');

    envioLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

    envios.forEach(envio => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${envio.id}</td>
            <td>${envio.cliente.nombre}</td>
            <td>${envio.tipoProducto.nombre}</td>
            <td>${envio.puerto.nombre}</td>
            <td>${envio.fechaRegistro}</td>
            <td>${envio.fechaEntrega}</td>
            <td>${envio.precioEnvio}</td>
            <td>${envio.numeroFlota}</td>
            <td>${envio.numeroGuia}</td>
            <td>${envio.descuentoAplicado}</td>
            <td>${envio.cantidadProducto}</td>
            <td>
                <button onclick="editarEnvio(${envio.id})">Editar</button>
                <button onclick="eliminarEnvio(${envio.id})">Eliminar</button>
            </td>
        `;
        envioLista.appendChild(row);
    });
}

mostrarEnviosMaritimos();

// Resto del código...

const formNuevoEnvio = document.getElementById('form-nuevo-maritimo');

formNuevoEnvio.addEventListener('submit', async function (event) {
    event.preventDefault();

    const clienteId = clienteSelect.value; // ID del cliente seleccionado
    const tipoProductoId = tipoProductoSelect.value; // ID del tipo de producto seleccionado
    const puertoId = puertoSelect.value; // ID del puerto seleccionado
    const fechaRegistro = document.getElementById('fechaRegistro').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const precioEnvio = parseFloat(document.getElementById('precioEnvio').value);
    const numeroFlota = document.getElementById('numeroFlota').value;
    const numeroGuia = document.getElementById('numeroGuia').value;
    const descuentoAplicado = parseFloat(document.getElementById('descuentoAplicado').value);
    const cantidadProducto = parseInt(document.getElementById('cantidadProducto').value);

    // Crear el objeto de envío marítimo
    const nuevoEnvio = {
        clienteID: clienteId,
        tipoProductoID: tipoProductoId,
        puertoID: puertoId,
        fechaRegistro: fechaRegistro,
        fechaEntrega: fechaEntrega,
        precioEnvio: precioEnvio,
        numeroFlota: numeroFlota,
        numeroGuia: numeroGuia,
        descuentoAplicado: descuentoAplicado,
        cantidadProducto: cantidadProducto
    };

    // Envía el nuevo envío a la API para agregarlo
    const response = await fetch('https://localhost:7273/api/EnvioMaritimoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoEnvio)
    });

    if (response.ok) {
        // Actualiza la lista de envíos marítimos
        mostrarEnviosMaritimos();
        // Cierra el formulario
        cerrarFormularioNuevoEnvio();
    } else {
        console.error('Error al agregar el envío marítimo');
    }
});


function abrirFormularioNuevoEnvio() {
    const formularioNuevoMaritimo = document.getElementById('form-nuevo-maritimo');
    formularioNuevoMaritimo.style.display = 'block';
}

function cerrarFormularioNuevoEnvio() {
    const formularioNuevoMaritimo = document.getElementById('form-nuevo-maritimo');
    formularioNuevoMaritimo.style.display = 'none';
}

// ...

function editarEnvio(id) {
    
}

async function eliminarEnvio(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este Envio?');

    if (!confirmacion) {
        return;
    }

    const response = await fetch(`https://localhost:7273/api/EnvioMaritimoes/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        mostrarEnviosMaritimos(); 
    } else {
        console.error('Error al eliminar el Envio Maritimo');
    }
}


