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
          errores.push('El formato de correo electrónico no es válido');
      }
      
    }
    
    let inputContraseña = document.querySelector('#contraseña');

  if(inputContraseña.value.trim === ""){
    errores.push ('Se requiere completar con la contraseña');
  } 

  // me falta hacer que la conraseña coincida con la base de datos

}
 // si errores.length es mayor a cero, entonces cancelo el envío del formulario
 if (errores.length > 0 ){
    e.preventDefault();
    let ulErrores = document.querySelector('#errores');
    for (let i = 0; i < errores.length; i++) {

        ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
    }
  }
  

    
})
});
