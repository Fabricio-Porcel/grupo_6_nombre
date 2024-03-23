const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const path = require('path');
const methodOverride = require('method-override') // para usar los metodos PUT y DELETE

const publicPath = path.resolve(__dirname , '../public');
app.use(express.static(publicPath));
app.use(session({
    secret: "Nuestro mensaje secreto",
    resave: false,
    saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

//treaemos la constante de routes

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes')
const usersRoutes = require('./routes/usersRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

//Aquí llamo a la ruta de las api
const apiUsersRoutes = require('./routes/api/apiUsersRoutes')

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname, "views"));
app.use(methodOverride('_method'));// para usar los metodos PUT y DELETE

app.listen(3011, () =>{
    console.log('Servidor corriendo en puerto http://localhost:3011')
})


app.use('/', mainRoutes);


app.use('/Carrito-de-compras' , mainRoutes);

app.use('/users' , usersRoutes);

app.use('/products' , productsRoutes);

app.use('/categories', categoryRoutes);

app.use('/api/products', apiUsersRoutes )









