
window.addEventListener('load', () => {
   
    let formularioCrearProducto = document.querySelector('#formularioCrearProducto');
    let inputNombreProducto = document.querySelector('#name');
    let inputDescripcionProducto = document.querySelector('#description');
    let inputImagenProducto = document.querySelector('#image');
    let selectCategoria = document.querySelector('#category_id');
    let inputsColoresProducto = document.querySelectorAll('#colour');
    let inputPrecioProducto = document.querySelector('#price');


    
    formularioCrearProducto.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let errores = [];
        let acceptedExtensions = ['jpg', 'png', 'gif' , 'jpeg'];
        let fileExtension = inputImagenProducto.value.trim().toLowerCase().split('.').pop();

        // Validar campo nombre
        if (inputNombreProducto.value.trim() === '') {
            errores.push('El nombre del producto es requerido.');
            // Validar que el campo nombre tenga mínimo 2 caracteres
        } else if (inputNombreProducto.value.trim().length < 2){
            errores.push('El nombre del producto tiene que tener mínimo 2 caracteres.')
        }

        // Validar campo descripción
        if (inputDescripcionProducto.value.trim() === '') {
            errores.push('La descripción del producto es requerida.');
            // Validar que la descripción tenga mínimo 20 caracteres
        } else if (inputDescripcionProducto.value.trim().length < 20){
            errores.push('La descripción del producto tiene que tener mínimo 20 caracteres.')
        }

        // Validar campo imagen
        if (inputImagenProducto.value.trim() === '') {
            errores.push('La imagen del producto es requerida.');
        } else if (!acceptedExtensions.includes(fileExtension)) {
                errores.push('La extensión de la imagen no es válida. Solo se permiten archivos JPG, JPEG, PNG y GIF.');
            }

        // Validar selección de categoría
        if (selectCategoria.value === '') {
            errores.push('Debes seleccionar una categoría.');
        }

        // Validar al menos un color seleccionado
        let coloresSeleccionados = Array.from(inputsColoresProducto).filter(input => input.checked);
        if (coloresSeleccionados.length === 0) {
            errores.push('Debes seleccionar al menos un color.');
        }

        // Validar campo precio
        if (inputPrecioProducto.value.trim() === '') {
            errores.push('El precio del producto es requerido.');
        } else if (isNaN(inputPrecioProducto.value)) {
            errores.push('El precio del producto debe ser un número válido.');
        }

        // Mostrar mensajes de error
        let mensajeErrores = document.querySelector('#mensajeErrores');
        if (errores.length > 0) {
            mensajeErrores.innerHTML = '';
            errores.forEach(error => {
                mensajeErrores.innerHTML += `<li class='text-danger'>${error}</li>`;
            });
        } else {
            formularioCrearProducto.submit(); // Envío del formulario si no hay errores
        }
    });
    // Validar con focusout el nombre del producto
    inputNombreProducto.addEventListener('focusout', () => {
        let errores = [];

        if (inputNombreProducto.value.trim() === '') {
            errores.push('El nombre del producto es requerido.');
            // Validar que el campo nombre tenga mínimo 2 caracteres
        } else if (inputNombreProducto.value.trim().length < 2){
            errores.push('El nombre del producto tiene que tener mínimo 2 caracteres.')
        }

        // Mostrar mensajes de error
        let mensajeErrores = document.querySelector('#mensajeErrores');
        if (errores.length > 0) {
            mensajeErrores.innerHTML = '';
            errores.forEach(error => {
                mensajeErrores.innerHTML += `<li class='text-danger'>${error}</li>`;
            });
        }else {
            mensajeErrores.innerHTML = '';
        }
    });
    //Validar con focusout la descripcion del producto
    inputDescripcionProducto.addEventListener('focusout', () => {
        let errores = [];

        // Validar campo descripción
        if (inputDescripcionProducto.value.trim() === '') {
            errores.push('La descripción del producto es requerida.');
            // Validar que la descripción tenga mínimo 20 caracteres
        } else if (inputDescripcionProducto.value.trim().length < 20){
            errores.push('La descripción del producto tiene que tener mínimo 20 caracteres.')
        }

        // Mostrar mensajes de error
        let mensajeErrores = document.querySelector('#mensajeErrores');
        if (errores.length > 0) {
            mensajeErrores.innerHTML = '';
            errores.forEach(error => {
                mensajeErrores.innerHTML += `<li class='text-danger'>${error}</li>`;
            });
        }else {
            mensajeErrores.innerHTML = '';
        }
    });
    //Validar con focusout la imagen del producto
    inputImagenProducto.addEventListener('focusout', () => {
        let acceptedExtensions = ['jpg', 'png', 'gif' , 'jpeg'];
        let fileExtension = inputImagenProducto.value.trim().toLowerCase().split('.').pop();
        
        
        
        let errores = [];
        // Validar campo imagen
        if (inputImagenProducto.value.trim() === '') {
            errores.push('La imagen del producto es requerida.');
        } else if (!acceptedExtensions.includes(fileExtension)) {
            errores.push('La extensión de la imagen no es válida. Solo se permiten archivos JPG, JPEG, PNG y GIF.');
        }
        

        // Mostrar mensajes de error
        let mensajeErrores = document.querySelector('#mensajeErrores');
        if (errores.length > 0) {
            mensajeErrores.innerHTML = '';
            errores.forEach(error => {
                mensajeErrores.innerHTML += `<li class='text-danger'>${error}</li>`;
            });
        } else {
            mensajeErrores.innerHTML = '';
        }
    });
     //Validar con focusout al precio del producto
     inputPrecioProducto.addEventListener('focusout', () => {
        let errores = [];
        // Validar campo imagen
        // Validar campo precio
        if (inputPrecioProducto.value.trim() === '') {
            errores.push('El precio del producto es requerido.');
        } else if (isNaN(inputPrecioProducto.value)) {
            errores.push('El precio del producto debe ser un número válido.');
        }
        

        // Mostrar mensajes de error
        let mensajeErrores = document.querySelector('#mensajeErrores');
        if (errores.length > 0) {
            mensajeErrores.innerHTML = '';
            errores.forEach(error => {
                mensajeErrores.innerHTML += `<li class='text-danger'>${error}</li>`;
            });
        } else {
            mensajeErrores.innerHTML = '';
        }
    });

    

});


