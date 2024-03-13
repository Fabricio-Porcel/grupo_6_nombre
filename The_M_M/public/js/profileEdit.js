window.addEventListener('load', () => {

let form = document.querySelector('.section-ProfileEdit')


form.addEventListener('submit',(e)=>{
    let errores = document.querySelector('ul.errores')
    // e.preventDefault();

    let errorList = [];

        //nombre
        let name = document.querySelector("#name")    
        if (name.value === "") {
            errorList.push('completa el campo de nombre')
        }
        //apellido
        let lastName = document.querySelector("#lastName")    
        if (lastName.value === "") {
            errorList.push('completa el campo de apellido')
        }
        //email
        let email = document.querySelector("#email")    
        if (email.value === "") {
            errorList.push('completa el campo de email')
        }
        //numero de telefono
        let phoneNumber = document.querySelector("#phoneNumber")    
        if (phoneNumber.value === "") {
            errorList.push('completa el campo de numero de telefono')
        }
        //Pais
       let country = document.querySelector("#country")    
       if (country.value === "") {
        errorList.push('completa el campo de numero de Pais')
        }
        //Ciudad
       let city = document.querySelector("#city")    
       if (city.value === "") {
        errorList.push('completa el campo de numero de Ciudad')
        }
        //Avatar
        let avatar = document.querySelector("#avatar")    
        if (avatar.value === "") {
         errorList.push('debes subir imagen del perfil')
         }



        if (errorList.length > 0) {
            e.preventDefault()
            errores.innerHTML = ""
            errorList.forEach(error => {
                errores.innerHTML += "<li>" + error + "</li>"
            });
            
        } 
        // else{
        //     errores.innerHTML = "Se guardó satisfactoriamente";   
        // }
})

});