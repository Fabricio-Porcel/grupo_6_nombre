module.exports = function(sequelize , dataTypes){

    let alias = "Colour";

    let cols = {
        id : {
                types : dataTypes.INTEGER ,
                primaryKey : true,
                autoIncrement : true
            },
        colour : {
                types : dataTypes.STRING,
                allowNull: false
        },
        colour_product_id : {
                types : dataTypes.INTEGER,
                allowNull : false
        
        }
    }

    let config = {
        tableName : 'colours',
        timestamps : false
    }

    let Colour = sequelize.define( alias , cols , config)
    return Colour;

}