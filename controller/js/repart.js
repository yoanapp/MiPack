$(document).ready(function() {
    // Función para actualizar la tabla con los datos recibidos
    function updateTable(data) {
        // Aquí va el código para actualizar la tabla con los datos recibidos
        // Por ejemplo, si los datos son una lista de empleados, podrías hacer algo como esto:
        var tableBody = $('.line[target="true"]');
        tableBody.empty(); // Limpia la tabla antes de agregar los nuevos datos
        data.forEach(function(empleado) {
            var row = `
            <tr id="${empleados._id}">
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
                <button type="button" class="btn color-text" id="revisar_${empleados._id}"><em>Revisar</em></button>
            </td>
            <td>
                  <button type="button" class="btn color-red" id="buton_${empleados._id}" onclick="logButtonId(this.id)"><em>Eliminar</em></button>
              </td>
          </tr>
            `;
            tableBody.append(row);
        });
    }

    // Event listeners para los botones del sidebar
    $('#btn-empleados').click(function() {
        $.ajax({
            url: 'https://cronometro.onrender.com/api/empleados/', // Reemplaza esto con la URL real
            type: 'GET',
            success: function(data) {
                updateTable(data);
            },
            error: function(error) {
                console.error('Error al cargar los empleados:', error);
            }
        });
    });

    // Agrega más event listeners para los otros botones del sidebar
    // Asegúrate de reemplazar 'btn-empleados' con el ID correcto y 'ruta/a/los/empleados' con la URL real
});
