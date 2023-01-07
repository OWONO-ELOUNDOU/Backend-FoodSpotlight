const express = require('express');
const neo4j = require('neo4j-driver');
const database = require('../../config/database');
const router = express.Router();

const driver = neo4j.driver(database.url, neo4j.auth.basic(database.username, database.password));
const session = driver.session();

router.post('/', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var weight = req.body.weight;
    var height = req.body.height;

    const results = session.run(
        'CREATE(personne:user{name: $nameParams, email: $emailParams, password: $pwdParams, weight: $weightParams, height: $heightParams})',
        {nameParams: name, emailParams: email, pwdParams: password, weightParams: weight, heightParams: height}
    );

    results.then(async results => {
        session.close();     
    })

    res.redirect('/');
})

module.exports = router;