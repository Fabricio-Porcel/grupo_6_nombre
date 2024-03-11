window.addEventListener('load',() => {
 let formularioLogin = document.querySelector('.formulario-registro');
 formularioLogin.addEventListener("submit", function(e){
    e.preventDefault();
  
    let errores = [];
    let inputEmail = document.querySelector('#email');

    if(inputEmail.value.trim === ""){
      errores.push ('Se requiere indicar un correo de mail');
    } else {
      // Validación de formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputEmail.value)) {
          errores.push('El formato de correo electrónico no es válido');
       } else {
        // Validación de existencia en la base de datos (esto me falta)
       
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
