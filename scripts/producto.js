const productoLista = document.getElementById('Producto-lista'); 

async function mostrarProducto() {
  const productos = await obtenerDatos('https://localhost:7273/api/TipoDeProductoes');

  productoLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

  productos.forEach(producto => { // Cambio de producto a producto
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.descripcion}</td>
      <td>
        <button onclick="editarProducto(${producto.id})">Editar</button>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </td>
    `;
    productoLista.appendChild(row);
  });
}

mostrarProducto();

async function agregarProducto() {
  const nombre = prompt('Ingrese el nombre del producto:');
  const descripcion = prompt('Ingrese la descripción del producto:');

  if (!nombre || !descripcion) {
    return;
  }

  const nuevoProducto = {
    nombre: nombre,
    descripcion: descripcion,
  };

  const response = await fetch('https://localhost:7273/api/TipoDeProductoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoProducto), 
  });

  if (response.ok) {
    mostrarProducto();
  } else {
    console.error('Error al agregar el nuevo producto');
  }
}

// Resto del código...


async function eliminarProducto(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
  
    if (!confirmacion) {
      return;
    }
  
    const response = await fetch(`https://localhost:7273/api/TipoDeProductoes/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
        mostrarProducto();
    } else {
      console.error('Error al eliminar este producto');
    }
  }
  
  function editarProducto(id) {
    // Aquí podrías abrir un formulario de edición o redirigir a otra página para la edición
    // Implementa esta función según tus necesidades
  }
  
