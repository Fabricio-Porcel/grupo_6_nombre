window.addEventListener('load',() => {
  let formularioRegistro = document.querySelector('#formularioRegistro');
 
  formularioRegistro.addEventListener("submit", function(e){
   e.preventDefault();
 
   let errores = [];
 
   let inputNombre = document.querySelector('#nombre');
 
   if(inputNombre.value.trim() === ""){
     errores.push ('Introduzca su nombre');
   } 
    if (inputNombre.value.length < 2){
     errores.push ('el campo de nombre debe tener al menos 2 caracteres');
   }
   
   let inputApellido = document.querySelector('#apellido');
 
   if(inputApellido.value.trim() === ""){
     errores.push ('Introduzca su apellido');
   }
     if (inputApellido.value.length < 2){
     errores.push ('el campo de apellido debe tener al menos 2 caracteres');
   }
 
   let inputEmail = document.querySelector('#email');
 
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
   }  else if (inputContraseña.value.length < 8){
     errores.push ('la contraseña, debe contener al menos 8 caracteres');
   } else {
     // Validación de contraseña con mayúsculas, minúsculas, número y carácter especial
     const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
     if (!contraseñaRegex.test(inputContraseña.value)) {
         errores.push('La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial');
     }
   }
   // Validación de formato de archivo de imagen 
   let inputFileImage = document.querySelector('#avatar');
   if (inputFileImage.value.trim() !== "") {
       const extensionesPermitidas = /\.(jpg|jpeg|png|gif)$/i;
       if (!extensionesPermitidas.test(inputFileImage.value)) {
           errores.push('La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF)');
       }
   }
 
   
 // Mostrar mensajes de error
 let mensajeErrores = document.querySelector('#mensajeErrores');
 if (errores.length > 0) {
     mensajeErrores.innerHTML = '';
     errores.forEach(error => {
         mensajeErrores.innerHTML += `<li class='text-danger'>${error}</li>`;
     });
 } else {
     formularioRegistro.submit(); // Envío del formulario si no hay errores
 }
 });
 }); 