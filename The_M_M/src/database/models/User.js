
module.exports = function(sequelize , dataTypes){

    let alias = "User";

    let cols = {
        id : {
                types : dataTypes.INTEGER ,
                primaryKey : true,
                autoIncrement : true
            },
        name : {
                types : dataTypes.STRING,
                allowNull: false
        },
        lastName : {
                types : dataTypes.STRING,
                allowNull: false
        },
        email : {
                types : dataTypes.STRING,
                allowNull: false
        },
        password : {
                types : dataTypes.STRING,
                allowNull: false
        },
        country : {
                types : dataTypes.STRING,
                allowNull: false
        },
        city : {
                types : dataTypes.STRING,
                allowNull: false
        },
        proneNumber : {
                types : dataTypes.INTEGER,
                allowNull: false
        },
        avatar : {
                types : dataTypes.STRING,
                allowNull: false
        }
    }

    let config = {
        tableName : 'users',
        timestamps : false
    };

    let User = sequelize.define( alias , cols , config);

    return User;

}