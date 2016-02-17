var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', 'config'));

/* GET users listing. */
router.get('/:session', function(req, res, next) {
	var results = [];
	var session = req.params.session;
    pg.connect(connectionString, function(err, client, done) {

    	var query = client.query("SELECT * from access.session where id =($1)", [session]);
    	query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            res.setHeader('Access-Control-Allow-Origin','*');
            return res.json(results);
        });
        
        if(err) {
          console.log(err);
        }

    });
});

/* POST users listing. */
router.post('/', function(req, res) {
    var results = [];
    var data = {session: req.body.session};
    pg.connect(connectionString, function(err, client, done) {
    	var query = client.query("SELECT * from access.session where id =($1)", [data.session]);
    	query.on('row', function(row) {
            results.push(row);
        });
    	
        query.on('end', function() {
            client.end();
            res.setHeader('Access-Control-Allow-Origin','*');
            return res.json(results);
        });
        
        if(err) {
          console.log(err);
        }

    });
});
module.exports = router;
