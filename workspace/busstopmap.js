"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var busstop_1 = require("./busstop");
var request = require('request');
var Busstopmap = /** @class */ (function () {
    function Busstopmap(location) {
        var _this = this;
        this.location = location;
        this.getBusesFromPostcode = function (num) {
            return _this.findBusstopsNearby(num)
                .then(_this.getNextBusesPromises);
        };
        this.getNextBusesPromises = function () {
            var resultPromises = [];
            _this.stopIds.forEach(function (stopId) {
                var nextBuses = new busstop_1.BusStop(stopId).getNextBuses();
                resultPromises.push(nextBuses);
            });
            return Promise.all(resultPromises);
        };
    }
    Busstopmap.prototype.findBusstopsNearby = function (num) {
        var url = this.buildURL();
        return this.setStopIds(url, num);
    };
    Busstopmap.prototype.setStopIds = function (url, num) {
        var _this = this;
        return new Promise(function (resolve) {
            request(url, function (error, response, body) {
                var busstops = JSON.parse(body).stopPoints;
                var nearestBusstops = _this.sortByDistance(busstops).slice(0, num);
                _this.stopIds = nearestBusstops.map(function (stop) { return stop.id; });
                resolve();
            });
        });
    };
    Busstopmap.prototype.buildURL = function () {
        var baseurl = "https://api.tfl.gov.uk/StopPoint";
        var stopType = "stopTypes=NaptanPublicBusCoachTram";
        var url = baseurl
            + "?"
            + stopType
            + "&lon="
            + this.location.lng.toString()
            + "&lat="
            + this.location.lat.toString();
        return url;
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