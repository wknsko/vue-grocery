const express = require("express");
const productRouter = express.Router();
const fs = require('fs');
const dataPath = './details/products.json';

const saveProductData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
}

const getProcductData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
}

productRouter.post('/product/add', (req, res) => {
    let existProducts = getProcductData();
    const newProductId = Math.floor(100000 + Math.random() * 900000)

    existProducts[newProductId] = req.body;

    console.log(existProducts);
    saveProductData(existProducts);
    res.send({ success: true, msg: 'account added successfully' })
});

productRouter.get('/product/list', (req, res) => {
    const products = getProcductData();
    res.send(products);
})

productRouter.put('/account/:id', (req, res) => {
    let existProducts = getProcductData();
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const productId = req.params['id'];
        existProducts[productId] = req.body;
        saveProductData(existProducts);
        res.send(`product with id ${productId} has been updates`)
    }, true)
});

productRouter.delete('/product/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let existProducts = getProcductData();
        const productId = req.params['id'];
        delete existProducts[productId];
        saveProductData(existProducts);
        res.send(`products with id ${productId} has been deleted`);
    })
});

module.exports = productRouter;