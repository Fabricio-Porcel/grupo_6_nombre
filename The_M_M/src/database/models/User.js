
module.exports = function (sequelize, dataTypes) {

        let alias = "User";

        let cols = {
                id: {
                        type: dataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                },
                name: {
                        type: dataTypes.STRING,
                        allowNull: false
                },
                lastName: {
                        type: dataTypes.STRING,
                        allowNull: false
                },
                email: {
                        type: dataTypes.STRING,
                        allowNull: false
                },
                password: {
                        type: dataTypes.STRING,
                        allowNull: false
                },
                country: {
                        type: dataTypes.STRING,
                        allowNull: false
                },
                city: {
                        type: dataTypes.STRING,
                        allowNull: false
                },
                phoneNumber: {
                        type: dataTypes.INTEGER,
                        allowNull: false
                },
                avatar: {
                        type: dataTypes.STRING,
                        allowNull: false
                }
        }

        let config = {
                tableName: 'users',
                timestamps: false
        };

        let User = sequelize.define(alias, cols, config);

        return User;

}