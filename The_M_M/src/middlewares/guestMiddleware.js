function guestMiddleware(req, res, next) {
    // console.log("Estado de la sesión:", req.session);
    if(req.session.userLogged){ // si tengo al usuario logeado en sesion quiero redirigirlo a profile
        return res.redirect('/users/profile');
    }
    next();
}

module.exports = guestMiddleware;