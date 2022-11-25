// este middleware verifica si hay alguien logeado si es asi mantiene al asuario en su login si no puede ir a la vista de register o de login

function guestMiddlewares (req, res, next) {
    if (req.session.userLogged){
        return res.redirect('/profile')
    }
    next();
}

module.exports = guestMiddlewares;