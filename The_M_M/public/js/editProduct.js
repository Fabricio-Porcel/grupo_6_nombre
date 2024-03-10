window.addEventListener('load', () => {
    let formularioEditarProducto = document.querySelector('#formularioEditarProducto');
    let inputNombreProducto = document.querySelector('#name');
    let inputDescripcionProducto = document.querySelector('#description');
    let inputImagenProducto = document.querySelector('#image');
    let selectCategoria = document.querySelector('#category_id');
    let inputsColoresProducto = document.querySelectorAll('#colour');
    let inputPrecioProducto = document.querySelector('#price');

    console.log(formularioEditarProducto);

    formularioEditarProducto.addEventListener('submit', (event) => {
        event.preventDefault();

        let errores = [];

        // Validar campo nombre
        if (inputNombreProducto.value.trim() === '') {
            errores.push('El nombre del producto es requerido.');
            // Validar que el campo nombre tenga minimo 2 caracteres
        } else if (inputNombreProducto.value.trim().length < 2){
            errores.push('El nombre del producto tiene que tener minimo 2 caracteres')
        }

        // Validar campo descripción
        if (inputDescripcionProducto.value.trim() === '') {
            errores.push('La descripción del producto es requerida.');
            // Validar que la descripción tenga minimo 20 caracteres
        } else if (inputDescripcionProducto.value.trim().length < 20){
            errores.push('La descripción del producto tiene que tener minimo 20 caracteres.')
        }

        // Validar campo imagen
        if (inputImagenProducto.value.trim() === '') {
            errores.push('La imagen del producto es requerida.');
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
            formularioEditarProducto.submit(); // Envío del formulario si no hay errores
        }
    });
});
