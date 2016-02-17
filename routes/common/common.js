exports.checkSession = function(path, pg, connectionString, id, callback) {
    var data = {};
    var queryText = "SELECT count(id) from access.session where id = $1";
    var queryValues = [id];
    pg.connect(connectionString, function(err, client, done) {
        client.query(queryText, queryValues, function(err, result) {
            data = result.rows;
            done();
            callback(err, data);
        });
    });
    return data;
};