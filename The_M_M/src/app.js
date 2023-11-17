const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.resolve(__dirname , '../public');
app.use(express.static(publicPath));

app.listen(3010, () =>{
    console.log('Servidor corriendo en puerto http://localhost:3010')
})

app.get('/' , (req , res) =>{
    res.sendFile(path.resolve(__dirname , './views/index.html'))
})

app.get('/Carrito-de-compras' , (req , res) =>{
    res.sendFile(path.resolve(__dirname , './views/productCart.html'))
});

app.get('/Detalle-Producto' , (req , res) => {
    res.sendFile(path.resolve(__dirname , './views/productDetail.html'))
});

app.get('/login' , (req , res) =>{
    res.sendFile(path.resolve(__dirname , './views/login.html'))
});

app.get('/registro' , (req , res) =>{
    res.sendFile(path.resolve(__dirname , './views/register.html'))
});
