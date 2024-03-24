
document.getElementById('validationCustom04').addEventListener('change', function () {
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

// Función para validar el campo de nombre
function validateNombre() {
    var nombre = document.getElementById('validationCustom01');
    var nombreRegex = /^[a-zA-Z\s]*$/; // Expresión regular para solo letras y espacios
    if (!nombreRegex.test(nombre.value)) {
        nombre.setCustomValidity('El nombre no debe contener números ni caracteres especiales.');
        nombre.classList.add('is-invalid');
        
    } else {
        nombre.setCustomValidity('');
        nombre.classList.remove('is-invalid');
    }
}

// Función para validar el campo de apellido
function validateApellido() {
    var apellido = document.getElementById('validationCustom02');
    var nombreRegex = /^[a-zA-Z\s]*$/; // Expresión regular para solo letras y espacios
    if (!nombreRegex.test(apellido.value)) {
        apellido.setCustomValidity('El apellido no debe contener números ni caracteres especiales.');
        apellido.classList.add('is-invalid');
    } else {
        apellido.setCustomValidity('');
        apellido.classList.remove('is-invalid');
    }
}

// Agregar el evento 'input' a los campos de nombre y apellido
document.getElementById('validationCustom01').addEventListener('input', validateNombre);
document.getElementById('validationCustom02').addEventListener('input', validateApellido);

// Función para validar todos los campos antes de enviar el formulario
function validateForm() {
    // Llama a las funciones de validación para cada campo
    validateNombre();
    validateApellido();
    // Agrega aquí las funciones de validación para los demás campos

    // Verifica si hay errores de validación
    var form = document.getElementById('empleadoForm');
    if (!form.checkValidity()) {
        // Si hay errores, muestra un mensaje y evita el envío del formulario
        event.preventDefault();
        alert('Por favor, corrija los errores antes de enviar el formulario.');
    } else {
   
        this.submit();
    }
}


async function logButtonId(buttonId) {
    // Reemplazar el prefijo "buton_" con una cadena vacía para obtener el ID del trabajador
    var cleanId = buttonId.replace('buton_', '');
    console.log(cleanId);

    // Construir la URL para la solicitud DELETE
    const url = `https://prueba-czjk.onrender.com/api/traba/${cleanId}`;

    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud DELETE
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-Token': token || '',
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


document.addEventListener('DOMContentLoaded', function () {

    fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://prueba-czjk.onrender.com/api/traba', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-Token': token || '',
                },
            });
    
            const data = await response.json();
            const trabajadoresContainer = document.querySelector('.line[target="true"]');
    
            
            // Verifica si data.listarTrabajador existe y es un array antes de iterar
            if (Array.isArray(data.result)) {
                data.result.forEach((empleados) => {
                    
               
                const cargo = empleados.adminID !== null ? 'Administrador' : 'Repartidor';

                    const cardHTML = `
                        <tr id="${empleados.ci}">
                                <td class="py-1" style="width: 50px; height: 50px;" >
                                    <img src="../assets/img/team/profile-pic 12.png" alt="image" class="rounded-circle" style="border: 2px solid #80808080; width: 50px; height: 50px;"/>
                                </td>
                                <td>
                                     <em>${empleados.nombre}</em>
                                     <br>
                                     <small class="username-gray">${cargo}</small>
                                </td>
                                
                                <td>
                                    <button type="button" class="btn color-text" ><em>Revisar</em></button>
                                </td>
                                <td>
                                     <button type="button" class="btn color-red" id="buton_${empleados.ci}" onclick="logButtonId(this.id)"><em>Eliminar</em></button>
                                    </td>
                                  </tr>
                     `;
    
                    trabajadoresContainer.insertAdjacentHTML('beforeend', cardHTML);
                });
            } else {
                console.error('data.result no es un array o es undefined');
            }
    
        } catch (error) {
            console.error('Error:', error);
        } finally {
            console.log('Fin de la carga');
        }
    };

    fetchData();
});


document.getElementById('empleadoForm').addEventListener('submit', function (event) {

    event.preventDefault();


    const trabajador = {
        
        nombre: document.getElementById('validationCustom01').value,
        ci: document.getElementById('identityCardNumber').value,
        apellido: document.getElementById('validationCustom02').value,
        telefono: document.getElementById('validationCustom05').value,
        foto: document.getElementById('validationCustom08').value,
        descripcion: document.getElementById('description').value,
        sexo: document.getElementById('validationCustom03').value
      
    };

    const token = localStorage.getItem('token');
    // Realizar la solicitud POST para crear el empleado
    fetch('https://prueba-czjk.onrender.com/api/traba', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-Token': token || '',

        },
        body: JSON.stringify(trabajador)
    })
        .then(response => response.json())
        .then(data => {

           
            console.log('Empleado creado con éxito:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función para obtener los datos del empleado por ID
    async function obtenerDatosEmpleado(id) {
        // Realiza una solicitud GET a tu API para obtener los datos del empleado
        const response = await fetch(`https://cronometro.onrender.com/api/empleados/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token || '',
                // Asegúrate de incluir cualquier token de autenticación necesario
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener los datos del empleado');
        }
        const empleado = await response.json();
        return empleado;
    }

    // Función para mostrar el modal con los datos del empleado
    async function mostrarModalEmpleado(id) {
        try {
            const empleado = await obtenerDatosEmpleado(id);
            document.getElementById('empleadoNombre').textContent = empleado.nombre;
            document.getElementById('empleadoRol').textContent = empleado.rol;
            // Llena los demás campos según sea necesario

            $('#empleadoModal').modal('show');
        } catch (error) {
            console.error('Error al mostrar el modal:', error);
        }
    }

    // Agregar event listeners a los botones "Revisar"
    document.querySelectorAll('[id^="revisar_"]').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.id.replace('revisar_', '');
            mostrarModalEmpleado(id);
        });
    });
});


