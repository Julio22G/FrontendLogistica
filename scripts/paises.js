const paisesLista = document.getElementById('paises-lista');

async function mostrarPaises() {
  const paises = await obtenerDatos('https://localhost:7273/api/Pais');

  paisesLista.innerHTML = ''; // Limpiar la lista antes de agregar los nuevos elementos

  paises.forEach(pais => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pais.id}</td>
      <td>${pais.nombre}</td>
      <td>${pais.codigoIso2}</td>
      <td>
        <button onclick="editarPais(${pais.id})">Editar</button>
        <button onclick="eliminarPais(${pais.id})">Eliminar</button>
      </td>
    `;
    paisesLista.appendChild(row);
  });
}

mostrarPaises();

async function agregarPais() {
  const nombre = prompt('Ingrese el nombre del nuevo país:');
  const codigoIso2 = prompt('Ingrese el código ISO2 del nuevo país:');

  if (!nombre || !codigoIso2) {
    return;
  }

  const nuevoPais = {
    nombre: nombre,
    codigoIso2: codigoIso2,
  };

  const response = await fetch('https://localhost:7273/api/Pais', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoPais),
  });

  if (response.ok) {
    mostrarPaises(); // Recargar la lista de países después de agregar uno nuevo
  } else {
    console.error('Error al agregar el nuevo país');
  }
}

async function eliminarPais(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este país?');
  
    if (!confirmacion) {
      return;
    }
  
    const response = await fetch(`https://localhost:7273/api/Pais/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      mostrarPaises(); // Recargar la lista de países después de eliminar uno
    } else {
      console.error('Error al eliminar el país');
    }
  }
  
  function editarPais(id) {
    // Aquí podrías abrir un formulario de edición o redirigir a otra página para la edición
    // Implementa esta función según tus necesidades
  }
  
