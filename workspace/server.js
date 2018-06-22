"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var busstopmap_1 = require("./busstopmap");
var location_1 = require("./location");
var express = require('express');
var app = express();
app.get('/closestStops', function (req, res) {
    var postcode = req.query.postcode;
    var location = new location_1.Location();
    location.initByPostcode(postcode)
        .catch(function (err) {
        throw err;
    })
        .then(function () {
        return new busstopmap_1.Busstopmap(location).getBusesFromPostcode(2);
    })
        .catch(function (err) {
        throw err;
    })
        .then(function (data) {
        // here we will parse output
        console.log(data);
        res.send(JSON.stringify(data));
    });
});
app.get('/', function (req, res) {
    res.sendfile("./workspace/view/index.html");
});
app.use(express.static('./workspace/view'));
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
module.exports = app;
//# sourceMappingURL=server.js.map