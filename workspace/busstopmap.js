"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var busstop_1 = require("./busstop");
var request = require('request');
var Busstopmap = /** @class */ (function () {
    function Busstopmap(location) {
        this.location = location;
    }
    Busstopmap.prototype.findBusstopsNearby = function (num) {
        var _this = this;
        return new Promise(function (resolve) {
            var baseurl = "https://api.tfl.gov.uk/StopPoint";
            var stopType = "stopTypes=NaptanPublicBusCoachTram";
            var url = baseurl
                + "?"
                + stopType
                + "&lon="
                + _this.location.lng.toString()
                + "&lat="
                + _this.location.lat.toString();
            request(url, function (error, response, body) {
                var busstops = JSON.parse(body).stopPoints;
                var nearestBusstops = _this.sortByDistance(busstops).slice(0, num);
                var nearestBusstopIds = nearestBusstops.map(function (stop) { return stop.id; });
                _this.stopIds = nearestBusstopIds;
                resolve();
            });
        });
    };
    Busstopmap.prototype.getBusesFromPostcode = function (num) {
        var _this = this;
        return this.findBusstopsNearby(num)
            .then(function () {
            var resultPromises = [];
            _this.stopIds.forEach(function (stopId) {
                var nextBuses = new busstop_1.BusStop(stopId).getNextBuses();
                resultPromises.push(nextBuses);
            });
            return Promise.all(resultPromises).then(function (data) {
                return data;
            });
        });
    };
    Busstopmap.prototype.sortByDistance = function (busstops) {
        busstops.sort(function (a, b) {
            return a.distance - b.distance;
        });
        return busstops;
    };
    return Busstopmap;
}());
exports.Busstopmap = Busstopmap;
//# sourceMappingURL=busstopmap.js.map