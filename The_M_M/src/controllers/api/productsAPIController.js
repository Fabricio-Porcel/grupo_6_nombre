const fs = require('fs')
const path = require('path');

const db = require("../../database/models");
const productsFilePath = path.join(__dirname, '../../data/productsDataBase.json');
const basePath = "http://localhost:3011"

const productsAPIController = {
    'list': (req, res) => {
        console.log("mati", req, res)
        try {
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

            return res.status(200).json({
                total: products.length,
                products: products,
                status: 200
            });
        } catch (error) {
            console.error("Error reading products file:", error);
            return res.status(500).json({
                error: "Internal server error",
                status: 500
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await db.Product.findByPk(productId);
 
            if (!product) {
                return res.status(404).json({
                    error: "Product not found",
                    status: 404
                });
            }
            const categories = await db.Category.findAll()
            const category = categories.filter((cat) => cat.id === product.category_id)[0]

            const response = {
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: `${basePath + product.image}`, // Supongo que req.file.filename contiene el nombre del archivo de imagen*/
                category_id: category.name,
                price: product.price
                /*coloresProducto: db.Product.Colors.map(color => color.name)*/
            };
 
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error retrieving product:", error);
            return res.status(500).json({
                error: "Internal server error",
                status: 500
            });
        }
    },
    'exampleTest': async (req, res) => {
        try {
            return res.status(200).json({
                title: "example bla",
                status: 200
            });
        } catch {
            return res.status(404).json({
                error: "example bla",
                status: 400
            });
        }
    }
};

    

module.exports = productsAPIController

