const bodegaLista = document.getElementById('Bodega-lista'); // Cambio de bodega-lista a Bodega-lista

async function mostrarBodega() {
  const bodegas = await obtenerDatos('https://localhost:7273/api/Bodegas');

  bodegaLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

  bodegas.forEach(bodega => { // Cambio de bodega a bodegas
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bodega.id}</td>
      <td>${bodega.nombre}</td>
      <td>${bodega.direccion}</td>
      <td>
        <button onclick="editarBodega(${bodega.id})">Editar</button>
        <button onclick="eliminarBodega(${bodega.id})">Eliminar</button>
      </td>
    `;
    bodegaLista.appendChild(row);
  });
}

mostrarBodega();

async function agregarBodega() {
  const nombre = prompt('Ingrese el nombre de la bodega:');
  const direccion = prompt('Ingrese la dirección de la bodega:');

  if (!nombre || !direccion) {
    return;
  }

  const nuevoBodega = {
    nombre: nombre,
    direccion: direccion,
  };

  const response = await fetch('https://localhost:7273/api/Bodegas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoBodega), // Cambio de mostrarBodega a nuevoBodega
  });

  if (response.ok) {
    mostrarBodega();
  } else {
    console.error('Error al agregar La nueva Bodega');
  }
}

// Resto del código...


async function eliminarBodega(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta BODEGA?');
  
    if (!confirmacion) {
      return;
    }
  
    const response = await fetch(`https://localhost:7273/api/Bodegas/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      mostrarBodega(); // Recargar la lista de las bodegas después de eliminar uno
    } else {
      console.error('Error al eliminar la bodega');
    }
  }
  
  function editarBodega(id) {
    // Aquí podrías abrir un formulario de edición o redirigir a otra página para la edición
    // Implementa esta función según tus necesidades
  }
  
