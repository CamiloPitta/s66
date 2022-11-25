// este middleware verifica si hay alguien logueado si no es asi nos dirige al login si alguien trata de ingresar a profile por medio de la URL
function authMiddlewares (req, res, next) {
    if (!req.session.userLogged){
        return res.redirect('/login')
    }
    next();
}

module.exports = authMiddlewares;