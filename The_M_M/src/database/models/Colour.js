module.exports = function (sequelize, dataTypes) {

    let alias = "Colour";

    let cols = {
        id: {
            types: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        colour: {
            types: dataTypes.STRING,
            allowNull: false
        },
        product_id: {
            types: dataTypes.INTEGER,
            allowNull: false

        }
    }

    let config = {
        tableName: 'colours',
        timestamps: false
    }

    let Colour = sequelize.define(alias, cols, config);

    Colour.associate = function (models) {
        Colour.belongsToMany(models.Product, {
            as: "products",
            through: 'colour_product',
            foreignKey: 'colour_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }



    return Colour;

}