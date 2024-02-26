module.exports = function (sequelize, dataTypes) {

        let alias = "Product";

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
                description: {
                        type: dataTypes.STRING,

                },
                image: {
                        type: dataTypes.STRING,
                        allowNull: false
                },
                category_id: {
                        type: dataTypes.INTEGER,
                        allowNull: false
                },
                price: {
                        type: dataTypes.INTEGER,
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