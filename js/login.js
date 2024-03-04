
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;


           fetch('https://cronometro.onrender.com/api/empleados/login', {
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
     window.location.href = "/views/admin.html";
          console.log(data)})
        .catch((error) => console.error('Error:', error));

       /*    fetch('https://cronometro.onrender.com/api/auth/new', {
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

          if(data.roll === "profesor"){
            window.location.href = "/views/index.html";
          }
          if(data.roll === "admin"){
            window.location.href = "/admin";
          }
  
          
          console.log(data)})
        .catch((error) => console.error('Error:', error)); */
    });
});
