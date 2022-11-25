//Importación de módulos

let express=require("express");
let path=require("path");

//Definición de app

let app=express();

//Indicar que la carpeta public es de recursos estáticos

app.use(express.static(path.join(__dirname, './public')));

// Poner a correr el servidor en el puerto 3001

app.listen(process.env.PORT || 3001, () => {
    console.log('Servidor corriendo en puerto 3001')
})

// Vista home

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})