// Array de productos
var products = [
    "Laptop",
    "Smartphone",
    "Tablet",
    "Headphones",
    "Keyboard",
    "Mouse",
    'Hola'
  ];

  
  // Función para buscar productos
  function searchProducts() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("productsList");
    var li = ul.getElementsByTagName("li");
  
    // Iterar sobre la lista de productos y ocultar los que no coinciden con la búsqueda
    for (var i = 0; i < li.length; i++) {
      var productName = li[i].textContent || li[i].innerText;
      if (productName.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  
  // Función para mostrar la lista de productos inicial
  function showProducts() {
    var ul = document.getElementById("productsList");
    ul.innerHTML = ''; // Limpiar la lista antes de agregar elementos
    for (var i = 0; i < products.length; i++) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(products[i]));
      ul.appendChild(li);
    }
  }
  
  // Mostrar la lista de productos al cargar la página
  showProducts();


  // Importa el modelo Product definido con Sequelize

// const Product = require("../database/models");

// // Función para buscar y mostrar productos
// function showProducts() {
//   // Busca todos los productos en la base de datos
//   console.log('Mostrando productos...');
//   Product.findAll()
//     .then(products => {
//       // Obtiene solo los nombres de los productos y los guarda en un nuevo array
//       const productNames = products.map(product => product.name);
//       console.log(productNames); // Muestra los nombres de los productos en la consola
//     })
//     .catch(error => console.error('Error fetching products:', error));
// }

// // Mostrar la lista de productos al cargar la página
// showProducts();
  