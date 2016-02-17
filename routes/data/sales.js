var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
var commonFun = require(path.join(__dirname, '../', 'common', 'common'));

/* POST users listing. */
router.post('/', function(req, res) {
    var results = [];
    var data = {session: req.body.session, saleid: req.body.saleid};
    commonFun.checkSession(path, pg, connectionString, data.session, function(err, user){
        if(user[0].count == 1){
            console.log("Session OK");
            pg.connect(connectionString, function(err, client, done) {
                // SQL Query > Select Data
                var columns = "s.id as sale_id, s.rel_network, s.reservation_id, s.merchantid, s.rel_access," + 
                                "s.local_value, s.currency_code, s.unique_product_id, s.payout_code, s.rel_invoice," + 
                                "s.active, s.cancel_stamp, s.cancel_reasonid, s.cancel_reason, s.cancel_api_hash," + 
                                "s.stamp, s.checkout_date, s.mvd, s.nvd, s.applied_merchant_commission," + 
                                "s.applied_merchant_commission_type, s.value, s.currency_ratio, s.usd_value,"  +
                                "s.merchant_commission, s.usd_merchant_commission, s.affiliate_commission," + 
                                "s.usd_affiliate_commission, s.network_commission_type, s.network_commission_value, " +
                                "s.affiliate_ref, s.tracking_ref, s.pre_affiliate_id, s.browser, s.platform," + 
                                "s.browser_version, s.ip_address, s.country_code, s.referrer, s.tracking_referrer," +
                                "sl.id as salelog_id, sl.rel_access, to_char(sl.stamp,'DD/MM/YYYY HH24:MI') AS salelog_stamp,"+
                                "sl.comments, (s.stamp - s.click_stamp) as click_difference";
                var from = " FROM affilired.sale AS s LEFT JOIN affilired.salelog AS sl ON s.id = sl.rel_sale";

                var query = client.query("SELECT " + columns + from + " WHERE s.id =($1)", [data.saleid]);
                
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
        }else{
            console.log("Session Expired");
            res.setHeader('Access-Control-Allow-Origin','*');
            return res.json("Session Expired");
        }
    });
});
module.exports = router;