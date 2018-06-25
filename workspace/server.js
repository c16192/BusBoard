"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var busstopmap_1 = require("./busstopmap");
var location_1 = require("./location");
var express = require('express');
var app = express();
var parser = require("body-parser");
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));
app.get('/closestStops', function (req, res) {
    var postcode = req.query.postcode;
    var location = new location_1.Location();
    location.initByPostcode(postcode)
        .then(function () {
        return new busstopmap_1.Busstopmap(location).getBusesFromPostcode(2);
    }, function (err) {
        console.log("first catch");
        console.log(err);
        throw err;
    })
        .catch(function (err) {
        console.log("second catch");
        console.log(err);
        throw err;
    })
        .then(function (data) {
        // here we will parse output
        console.log("foo");
        console.log(data);
        res.send(JSON.stringify({ status: 200, data: data }));
    })
        .catch(function (err) {
        console.log("third catch");
        console.log(err);
        res.send(JSON.stringify({ status: 404, data: err }));
    });
});
// app.use(express.json());
// app.use(express.urlencoded());
function santisePostcode(rawPostcode) {
    return rawPostcode.replace(/\s+/g, '');
}
app.get('/', function (req, res) {
    var rawPostcode = req.query.postcode;
    console.log(rawPostcode);
    if (rawPostcode == undefined) {
        res.redirect('/index.html');
    }
    else {
        var postcode = santisePostcode(rawPostcode);
        res.redirect('/index.html?postcode=' + postcode);
    }
});
app.use(express.static('./workspace/view'));
app.use(express.static('./workspace/public'));
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
module.exports = app;
//# sourceMappingURL=server.js.map