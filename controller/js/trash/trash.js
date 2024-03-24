
document.addEventListener('DOMContentLoaded', async function () {
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    sidebarItems.forEach(item => {
        item.addEventListener('click', async function () {
            const section = this.getAttribute('data-section');

            try {
                const response = await fetch(`https://cronometro.onrender.com/api/${section}/`);
                const data = await response.json();
                updateTable(data);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});


    function updateTable(data) {
        // Aquí va el código para actualizar la tabla con los datos recibidos
        const tableBody = document.querySelector('.line[target="true"]');
        tableBody.innerHTML = ''; // Vacía la tabla
   // Verifica que data.empleados exista y sea un array
//   if (data.empleados && Array.isArray(data.//empleados)) {
//   data.empleados.forEach((empleado) => {
        // Tu código para generar y agregar el HTML de cada empleado
//    });`
//} else {
//    console.error('data.empleados no es un array o //no existe');
//}
        data.empleados.forEach((empleados) => {
            const cardHTML = `
                <tr id="${empleados._id}">
                    <td class="py-1" style="width: 50px; height: 50px;">
                        <img src="../assets/img/team/profile-pic 12.png" alt="image" class="rounded-circle" style="border: 2px solid #80808080; width: 50px; height: 50px;"/>
                    </td>
                    <td>
                        <em>${empleados.nombre}</em>
                        <br>
                        <small class="username-gray">${empleados.rol}</small>
                    </td>
                    <td>
                        <button type="button" class="btn color-text" id="revisar_${empleados._id}"><em>Revisar</em></button>
                    </td>
                    <td>
                        <button type="button" class="btn color-red" id="buton_${empleado._id}" onclick="logButtonId(this.id)"><em>Eliminar</em></button>
                    </td>
                </tr>
            `;

            tableBody.insertAdjacentHTML('beforeend', cardHTML);
        });
    }





document.addEventListener('DOMContentLoaded', function () {

    const fetchData = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://cronometro.onrender.com/api/empleados/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token || '',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los empleados');
            }

            const data = await response.json();
            const trabajadoresContainer = document.querySelector('.line[target="true"]');

            data.empleados.forEach((empleados) => {
                const cardHTML = `
                    <tr id="${empleados.id}">
                            <td class="py-1" style="width: 50px; height: 50px;" >
                                <img src="../assets/img/team/profile-pic 12.png" alt="image" class="rounded-circle" style="border: 2px solid #80808080; width: 50px; height: 50px;"/>
                            </td>
                            <td>
                                 <em>${empleados.nombre}</em>
                                 <br>
                                 <small class="username-gray">${empleados.
                        rol}</small>
                            </td>
                           
                            <td>
                                <button type="button" class="btn color-text" ><em>Revisar</em></button>
                            </td>
                            <td>
                                  <button type="button" class="btn color-red" id="buton_${empleados.id}" onclick="logButtonId(this.id)"><em>Eliminar</em></button>
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





document.addEventListener('DOMContentLoaded', async function () {
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    sidebarItems.forEach(item => {
        item.addEventListener('click', async function () {
            const section = this.getAttribute('data-section');

            try {
                const response = await fetch(`https://prueba-czjk.onrender.com/api/${section}`);
                const data = await response.json();
                updateTable(data);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});


    function updateTable(data) {
        // Aquí va el código para actualizar la tabla con los datos recibidos
        const tableBody = document.querySelector('.line[target="true"]');
        tableBody.innerHTML = ''; // Vacía la tabla
   // Verifica que data.empleados exista y sea un array
   if (data.listarTrabajador && Array.isArray(data.listarTrabajador)) {
    data.listarTrabajador.forEach((empleado) => {
        // Tu código para generar y agregar el HTML de cada empleado
    });
} else {
    console.error('listarTrabajador no es un array o no existe');
}
        data.listarTrabajador.forEach((empleados) => {
            const cardHTML = `
                <tr id="${empleados._id}">
                    <td class="py-1" style="width: 50px; height: 50px;">
                        <img src="../assets/img/team/profile-pic 12.png" alt="image" class="rounded-circle" style="border: 2px solid #80808080; width: 50px; height: 50px;"/>
                    </td>
                    <td>
                        <em>${empleados.nombre}</em>
                        <br>
                        <small class="username-gray">${empleados.rol}</small>
                    </td>
                    <td>
                        <button type="button" class="btn color-text" id="revisar_${empleados._id}"><em>Revisar</em></button>
                    </td>
                    <td>
                        <button type="button" class="btn color-red" id="buton_${empleados._id}" onclick="logButtonId(this.id)"><em>Eliminar</em></button>
                    </td>
                </tr>
            `;

            tableBody.insertAdjacentHTML('beforeend', cardHTML);
        });
    }


    document.getElementById('searchForm').addEventListener('submit', async function (event) {
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
            // Agregar el código para mostrar los resultados en la interfaz de usuario
    
        } catch (error) {
            console.error('Error:', error);
        }
    
    });

    
    ocupacion: document.getElementById('validationCustom04').value,
        direccion: {
            calle: document.getElementById('calle').value,
            municipio: document.getElementById('validationCustom03').value,
            numero: document.getElementById('numero').value,
            provincia: document.getElementById('validationCustom06').value
        },
        rol: document.getElementById('validationCustom04').value,