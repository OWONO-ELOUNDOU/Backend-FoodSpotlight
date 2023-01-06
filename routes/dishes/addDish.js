const express = require('express');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver');
const database = require('../../config/database');
const router = express.Router();

const driver = neo4j.driver(database.url, neo4j.auth.basic(database.username, database.password));
const session = driver.session();

router.post('/', function(req, res) {
    var name = req.body.name;
    var quantity = req.body.quantity;

    const results = session.run(
        'CREATE(dishes:plats{name: $nameParams, quantity: $quantityParams})',
        {nameParams: name, quantityParams: quantity}
    );

    results.then(async results => {
        session.close();     
    })

    res.redirect('/');
})

module.exports = router;