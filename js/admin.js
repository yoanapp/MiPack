
document.getElementById('validationCustom04').addEventListener('change', function() {
    var selectedRole = this.value;
    var userField = document.getElementById('userField');
    var passwordField = document.getElementById('passwordField');

    if (selectedRole === 'admin' || selectedRole === 'repartidor') {
        userField.style.display = 'block';
        passwordField.style.display = 'block';
    } else {
        userField.style.display = 'none';
        passwordField.style.display = 'none';
    }
});

    document.getElementById('validationCustom01').addEventListener('change', function() {
        var inputValue = this.value;
        console.log(inputValue); // Aquí puedes reemplazar console.log con cualquier acción que necesites realizar con el valor del input
    });


async function logButtonId(buttonId) {
    // Reemplazar el prefijo "buton_" con una cadena vacía para obtener el ID del trabajador
    var cleanId = buttonId.replace('buton_', '');
    console.log(cleanId);

    // Construir la URL para la solicitud DELETE
    const url = `https://cronometro.onrender.com/api/trabajadores/${cleanId}`;

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud DELETE
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token || '',
            },
        });
        const element = document.getElementById(cleanId);
        if (element) {
            element.parentNode.removeChild(element);
        }
        if (!response.ok) {
            throw new Error('Error al eliminar el trabajador');
        }

        console.log('Trabajador eliminado con éxito');
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    const fetchData = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://cronometro.onrender.com/api/paquetes/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token || '',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los trabajadores');
            }

            const data = await response.json();
            const trabajadoresContainer = document.querySelector('.line[target="true"]');

            data.trabajadores.forEach((trabajador) => {
                const cardHTML = `
                    <tr id="${trabajador.id}">
                            <td class="py-1" style="width: 50px; height: 50px;" >
                                <img src="../assets/img/team/profile-pic 12.png" alt="image" class="rounded-circle" style="border: 2px solid #80808080; width: 50px; height: 50px;"/>
                            </td>
                            <td>
                                 <em>${trabajador.nombre}</em>
                                 <br>
                                 <small class="username-gray">${trabajador.
                             peso}</small>
                            </td>
                           
                            <td>
                                <button type="button" class="btn color-text" ><em>Revisar</em></button>
                            </td>
                            <td>
    <button type="button" class="btn color-red" id="buton_${trabajador.id}" onclick="logButtonId(this.id)"><em>Eliminar</em></button>
</td>
                          </tr>
                `;

                trabajadoresContainer.insertAdjacentHTML('beforeend', cardHTML);
            });

        } catch (error) {
            console.error('Error:', error);
        } finally {
            console.log('Fin de la carga');
        }
    };

    fetchData();
});

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    // Obtener el valor del campo de búsqueda
    const searchValue = document.getElementById('searchInput').value;

    // Construir la URL para la solicitud GET
    const url = `https://cronometro.onrender.com/api/trabajadores?nombre=${encodeURIComponent(searchValue)}`;

    try {
        // Realizar la solicitud GET
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al buscar el trabajador');
        }

        // Procesar la respuesta
        const data = await response.json();

        // Mostrar los resultados de la búsqueda
        console.log(data);
        // Aquí puedes agregar el código para mostrar los resultados en la interfaz de usuario

    } catch (error) {
        console.error('Error:', error);
    }
});


