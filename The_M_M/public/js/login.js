window.addEventListener('load', () => {
  let formularioLogin = document.querySelector('#formularioLogin');
  let ulErrores = document.querySelector('#mensajeErrores');

  formularioLogin.addEventListener("submit", function (e) {
    // e.preventDefault();

    let errores = [];
    
    let inputEmail = document.querySelector('#emailLogin');
    const emailFormato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (inputEmail.value.trim() === "") {
      errores.push('Se requiere indicar un correo electrónico');
  } else if(!emailFormato.test(inputEmail.value.trim())){
      // Validación de formato de correo electrónico
    
          errores.push('El formato de correo electrónico no es válido');
    
  }

    let inputContraseña = document.querySelector('#contraseña');
    if(inputContraseña.value.trim() === ""){
    errores.push ('Se requiere completar con la contraseña');
  } else if (inputContraseña.value.length < 8) {
    errores.push('La contraseña debe tener como máximo 8 caracteres');
  }
  
  // me falta hacer que la conraseña coincida con la base de datos

 // si errores.length es mayor a cero, entonces cancelo el envío del formulario
//  if (errores.length > 0 ){
//     e.preventDefault();
//     for (let i = 0; i < errores.length; i++) {

//         ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
//     }
//   }

// agregar al listado (inicialmente vacio) los errores como elementos <li>
// Si el array no está vacio, tenemos errores
  if (errores.length > 0 ){
    e.preventDefault();
    ulErrores.innerHTML=""
    errores.forEach(error =>{
     ulErrores.innerHTML+= "<li>" + error + "</li>"
    })
    
  }
  
});
});
