const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.resolve(__dirname , '../public');
app.use(express.static(publicPath));

//treaemos la constante de routes

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes')
const usersRoutes = require('./routes/usersRoutes');

app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname, "views"));

app.listen(3010, () =>{
    console.log('Servidor corriendo en puerto http://localhost:3010')
})


app.use('/', mainRoutes);


app.use('/Carrito-de-compras' , mainRoutes);

app.use('/users' , usersRoutes);

app.use('/products' , productsRoutes);









