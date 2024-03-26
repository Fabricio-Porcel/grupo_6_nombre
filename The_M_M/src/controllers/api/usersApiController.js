const path = require('path');

const db = require("../../database/models");

const usersApiController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();
            const usersData = users.map(user => ({
                id: user.id,
                name: user.name,
                lastName : user.lastName,
                email: user.email,
                detail : 'http://localhost:3011/api/users/' + user.id
            }));
            return res.status(200).json({
                url: 'http://localhost:3011/api/users',
                total: usersData.length,
                data: usersData,
                status: 200
            });
        } catch (error) {
            console.error("Error al obtener la lista de usuarios:", error);
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    },
    show: async (req , res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            const avatarUrl = user.avatar ? `http://localhost:3011/img/users/${user.avatar}` : null;
    
            const userData = {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                country: user.country,
                city: user.city,
                phoneNumber: user.phoneNumber,
                avatar: avatarUrl
            };
    
            return res.status(200).json({
                data: userData,
                status: 200
            });
        } catch (error) {
            console.error("Error al obtener el detalle del usuario:", error);
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
       
    }
}


module.exports = usersApiController;