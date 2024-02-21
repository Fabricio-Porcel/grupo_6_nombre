module.exports = function (sequelize, dataTypes) {

        let alias = "Product";

        let cols = {
                id: {
                        types: dataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                },
                name: {
                        types: dataTypes.STRING,
                        allowNull: false
                },
                description: {
                        types: dataTypes.STRING,

                },
                image: {
                        types: dataTypes.STRING,
                        allowNull: false
                },
                category_id: {
                        types: dataTypes.INTEGER,
                        allowNull: false
                },
                price: {
                        types: dataTypes.INTEGER,
                        allowNull: false
                },
                colour_id: {
                        type: dataTypes.INTEGER,
                        allowNull: false
                }

        }

        let config = {
                tableName: 'products',
                timestamps: false
        }

        let Product = sequelize.define(alias, cols, config);

        Product.associate = function (models) {
                Product.belongsTo(models.Category, {
                        as: "categories",
                        foreignKey: 'category_id'
                })
        };

        Product.associate = function (models) {
                Product.belongsToMany(models.Colour, {
                        as: "colours",
                        through: 'colour_product',
                        foreignKey: 'product_id',
                        otherKey: 'colour_id',
                        timestamps: false
                })
        };



        return Product;
}