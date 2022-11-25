const User = require("../models/User")

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    let userInCookie = req.cookies.userName;
    let userFromCookie = User.findUserByField("username", userInCookie);

    if(userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = userLoggedMiddleware;