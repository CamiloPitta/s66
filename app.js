// Importación módulos

const express = require('express')
const session = require('express-session')
const path = require('path')
const cookies = require('cookie-parser')
const router = require('./src/routes/index.routes')
const actividadesRouter = require('./src/routes/actividades.routes')
const reservasRouter = require('./src/routes/reservas.routes')

//para usar put y delete
const methodOverride = require('method-override')
//Middleware global/nivel app
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')

// Definición app
const app = express()

//Solicita para poder hacer el login y que quede cargada de manera global y asi usar el session en todas las vistas
app.use(session({
    secret: 'Shh, is a secret',
    resave: false,
    saveUninitialized: false
}));

app.use(cookies()); 

app.use(userLoggedMiddleware);

// Indicar que la carpeta public es de recursos estáticos

app.use(express.static(path.join(__dirname, '/public')))
// Indica que se pueden codificar archivos y enviar al Back
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'))
//templete engine

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')

// Poner a correr el servidor en el puerto 3001

app.listen(process.env.PORT || 3005, () => {
    console.log('3005')
})

// Vistas
app.use('/', router);

app.use('/actividades', actividadesRouter)

app.use ('/carrito', reservasRouter)
console.log('noice')