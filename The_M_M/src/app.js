const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.resolve(__dirname , '../public');
app.use(express.static(publicPath));

//treaemos la constante de routes

const mainRoutes = require('./routes/mainRoutes');

app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname, "views"));

app.listen(3010, () =>{
    console.log('Servidor corriendo en puerto http://localhost:3010')
})


app.use('/', mainRoutes);


app.use('/Carrito-de-compras' , mainRoutes);

app.use('/Detalle-Producto' , mainRoutes);

app.use('/login' , mainRoutes);

app.use('/register' , mainRoutes);






// app.get('/Carrito-de-compras' , (req , res) =>{
//     res.sendFile(path.resolve(__dirname , './views/productCart.html'))
// });

// app.get('/Detalle-Producto' , (req , res) => {
//     res.sendFile(path.resolve(__dirname , './views/productDetail.html'))
// });

// app.get('/login' , (req , res) =>{
//     res.sendFile(path.resolve(__dirname , './views/login.html'))
// });

// app.get('/register' , (req , res) =>{
//     res.sendFile(path.resolve(__dirname , './views/register.html'))
// });
