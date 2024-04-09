window.addEventListener('load', () => {
console.log("form validation")
let form = document.querySelector('.section-ProfileEdit')
let errorsHTML = document.querySelector('.errores')

// const paises = ['Argentina','Colombia','Uruguay','Peru','Ecuador'];

// let select = document.querySelector("#select");

// paises.forEach(pais => {
//     select.innerHTML += "<option value="+ pais +">"+ pais +"</option>";
// });

form.addEventListener('submit',(event)=>{
    
    let errorList = [];

        //nombre
        let name = document.querySelector("#name")    
        if (name.value === "") {
            errorList.push('Completa el campo de nombre');
        } 
        // else if (!/^[A-Z][a-z]*$/.test(name.value)) {
        //     errorList.push('El nombre debe comenzar con mayúscula');
        // }
        //apellido
        let lastName = document.querySelector("#lastName")    
        if (lastName.value === "") {
            errorList.push('Completa el campo de apellido')
        } 
        // else if (!/^[A-Z][a-z]*$/.test(name.value)) {
        //     errorList.push('El apellido debe comenzar con mayúscula');
        // }
        //email
        let email = document.querySelector("#emailEditar")    
        if (email.value === "") {
            errorList.push('Completa el campo de email')
        }
        // numero de telefono 
        let phoneNumber = document.querySelector("#phoneNumber")    
        if (phoneNumber.value === "") {
            errorList.push('Completa el campo de numero de telefono')
        }
        // Pais
       let country = document.querySelector("#country")    
       if (country.value === "") {
        errorList.push('Completa el campo de numero de Pais')
        }
        // Ciudad
       let city = document.querySelector("#city")    
       if (city.value === "") {
        errorList.push('Completa el nombre de la Ciudad')
        }
        //Avatar
        let avatar = document.querySelector("#avatar")    
        if (avatar.value === "") {
         errorList.push('Debes subir imagen del perfil')
         }

        if (errorList.length > 0) {
            event.preventDefault()
            errorsHTML.innerHTML = "";
            errorList.forEach(error => {
                errorsHTML.innerHTML += "<li>" + error + "</li>"
            });
            
        } 
        // else{
        //     errorsHTML.innerHTML = "Se guardó satisfactoriamente";   
        // }
        console.log("Se envio el formulario!");

})

}
);