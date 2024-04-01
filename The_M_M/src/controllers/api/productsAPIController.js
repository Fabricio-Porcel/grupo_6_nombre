const fs = require('fs')
const path = require('path');

const db = require("../../database/models");
const productsFilePath = path.join(__dirname, '../../data/productsDataBase.json');
const basePath = "http://localhost:3011"

const productsAPIController = {
    'list': (req, res) => {
        Products.findAll({
            include: ['categories']
        })
        .then(products => {
            let count = products.length;
            let countByCategory = {};
            let productList = [];
            for (let product of products) {
                productList.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    categories: product.categories.map(category => category.name),
                    detail: `/api/products/${product.id}`
                });
                for (let category of product.categories) {
                    countByCategory[category.name] = countByCategory[category.name] ? countByCategory[category.name] + 1 : 1;
                }
            }

            let response = {
                count: count,
                countByCategory: countByCategory,
                products: productList
            };
            res.json(response);
        })
        .catch(error => res.status(200).json({ error: "Internal server error" }));
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

