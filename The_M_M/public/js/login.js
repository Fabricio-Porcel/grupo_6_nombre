window.addEventListener('load', () => {
  let formularioLogin = document.querySelector('#formularioLogin');

  formularioLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    let errores = [];
    
    let inputEmail = document.querySelector('#emailLogin');

    if(inputEmail.value.trim() === ""){
      errores.push ('Se requiere indicar un correo de mail');
    } else {
      // Validación de formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputEmail.value)) {
          errores.push('El formato de correo electrónico no es válido');
      }
      
    }
    
    let inputContraseña = document.querySelector('#contraseña');
  
    if(inputContraseña.value.trim() === ""){
      errores.push ('Se requiere completar con la contraseña');
    } else if (inputContraseña.value.length < 8){
      errores.push ('la contraseña, debe contener al menos 8 caracteres');
    }

    // Mostrar mensajes de error
    let mensajeErrores = document.querySelector('#mensajeErrores');
    if (errores.length > 0) {
      mensajeErrores.innerHTML = '';
      errores.forEach(error => {
        mensajeErrores.innerHTML += `<li class='text-danger'>${error}</li>`;
      });
    } else {
      formularioLogin.submit(); // Envío del formulario si no hay errores
    }
  });
}); 
