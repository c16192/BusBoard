"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = require("../location");
var busstopmap_1 = require("../busstopmap");
exports.serveClosestStops = function (req, res) {
    var postcode = req.query.postcode;
    var location = new location_1.Location();
    location.initByPostcode(postcode)
        .then(function () {
        return new busstopmap_1.Busstopmap(location).getBusesFromPostcode(2);
    })
        .then(function (data) {
        res.send(JSON.stringify({ status: 200, data: data }));
    })
        .catch(function (err) {
        res.send(JSON.stringify({ status: 404, data: err }));
    });
};
//# sourceMappingURL=serveClosestStops.js.map