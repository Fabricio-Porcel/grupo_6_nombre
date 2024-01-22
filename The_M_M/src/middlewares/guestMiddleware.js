function guestMiddleware(req, res, next) {
    if(req.session.userLogged){ // si tengo al usuario logeado en sesion quiero redirigirlo a profile
        return res.redirect('/users/profile');
    }
    next();
}

module.exports = guestMiddleware;