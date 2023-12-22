const express = require ('express');
const app = express();
const path = require ('path');
const publicPath = path.resolve(__dirname , '../public');
app.use(express.static(publicPath));

app.listen(3002 , () => console.log("Servidor corriendo en el puerto http://localhost:3002"))

app.get('/' , (req , res) =>{
    res.sendFile(path.resolve(__dirname , './views/home.html'))
});

app.get('/create-account' , (req , res) =>{
    res.sendFile(path.resolve(__dirname, './views/create-account.html'))
});

app.get('/login' , (req , res) =>{
    res.sendFile(path.resolve(__dirname , './views/login.html'))
});