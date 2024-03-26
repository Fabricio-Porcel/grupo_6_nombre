// const User = require('../modules/Users');

// function userLoggedMiddleware(req, res, next) {
//     res.locals.isLogged = false;

//     let emailInCookie = req.cookies.userEmail;
//     let userFromCookie = User.findByField('email', emailInCookie);

//     if (userFromCookie) {
//         req.session.userLogged = userFromCookie;
        
//     }

//     if (req.session.userLogged) {
//         res.locals.isLogged = true;
//         res.locals.userLogged = req.session.userLogged;
        
//     }

   

//     next();

// }


// module.exports = userLoggedMiddleware;

const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie) {
        try {
            const userFromDB = await db.User.findOne({ where: { email: emailInCookie } });
            if (userFromDB) {
                req.session.userLogged = userFromDB.toJSON();
            }
        } catch (error) {
            console.error('Error al obtener usuario de la base de datos:', error);
        }
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;
