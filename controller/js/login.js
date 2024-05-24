
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


        fetch('https://prueba-czjk.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {

                localStorage.setItem('token', data.token);

                if (!data.user) {
                    // Mostrar el mensaje de error si hay uno
                    const errorMessageElement = document.getElementById('loginErrorMessage');
                    errorMessageElement.textContent = data.msg || 'Error de inicio de sesión. Por favor, intente de nuevo.';
                    errorMessageElement.style.display = 'block'; // Hacer visible el mensaje de error

                }
                if (data.user.adminID !== null) {
                    window.location.href = "/views/admin.html";
                }
                console.log(data)
            })
            .catch((error) => console.error('Error:', error));

    });
});
