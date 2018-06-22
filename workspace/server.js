"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var busstopmap_1 = require("./busstopmap");
var busstop_1 = require("./busstop");
var location_1 = require("./location");
var express = require('express');
var app = express();
app.get('/closestStops', function (req, res) {
    var postcode = req.query.postcode;
    var location = new location_1.Location();
    location.initByPostcode(postcode)
        .catch(function (err) {
        console.log(err);
        res.send(err);
    })
        .then(function () {
        var busstopmap = new busstopmap_1.Busstopmap();
        busstopmap.findBusstopsNearby(location, 2)
            .then(function () {
            var output = "";
            var resultPromises = [];
            busstopmap.stopIds.forEach(function (stopId) {
                var busstop = new busstop_1.BusStop(stopId);
                var resultPromise = busstop.getBusSequence(5)
                    .then(function (nextBuses) {
                    var busstopName = busstop.stationName;
                    if (busstop.platformName != 'null') {
                        busstopName += " platform " + busstop.platformName;
                    }
                    output += JSON.stringify(busstopName);
                    output += JSON.stringify(nextBuses);
                });
                resultPromises.push(resultPromise);
            });
            Promise.all(resultPromises).then(function (resolve) {
                res.send(output);
            });
        });
    }).catch(function (err) {
        res.send("Unknown error!!!!");
    });
});
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
module.exports = app;
//# sourceMappingURL=server.js.map