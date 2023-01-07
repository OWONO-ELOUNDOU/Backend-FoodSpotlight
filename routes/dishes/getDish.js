const express = require('express');
const neo4j = require('neo4j-driver');
const database = require('../../config/database');
const router = express.Router();

const driver = neo4j.driver(database.url, neo4j.auth.basic(database.username, database.password));
const session = driver.session();

router.get('/', function(req, res) {
    session
        .run('MATCH(n:plats) RETURN n LIMIT 25')
        .then(function(result){
            var dishArr = [];
            result.records.forEach(function(record){
                console.log(record._fields[0].properties);
                dishArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name,
                    Qty: record._fields[0].properties.Qty,
                    date: record._fields[0].properties.date,
                    disease: record._fields[0].properties.disease
                });
            });
            console.log(dishArr);
            
            /*
            res.render('index', {
                dishes: dishArr
            });
            */
        })
        .catch(function(err){
            console.log(err);
        });
})

module.exports = router;