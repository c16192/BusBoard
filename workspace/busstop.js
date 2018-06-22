"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var BusStop = /** @class */ (function () {
    function BusStop(stopId) {
        this.stopId = stopId;
    }
    BusStop.prototype.sortByTime = function (busSequence) {
        busSequence.sort(function (a, b) {
            return a.timeToStation - b.timeToStation;
        });
        return busSequence;
    };
    BusStop.prototype.getAllNextBuses = function (num) {
        var _this = this;
        return new Promise(function (resolve) {
            var baseUrl = "https://api.tfl.gov.uk/StopPoint/";
            var endpoint = "/Arrivals";
            var appId = "app_id=70bf8eaf";
            var appKey = "app_key=f9015c45cebfaf6aee020c196310c4a0";
            var url = baseUrl + _this.stopId + endpoint + "?" + appId + "&" + appKey;
            request(url, function (error, response, body) {
                var allResults = _this.sortByTime(JSON.parse(body));
                _this.stationName = allResults[0].stationName;
                _this.platformName = allResults[0].platformName;
                var nextBuses = _this.formatResults(allResults.slice(0, 5));
                resolve(nextBuses);
            });
        });
    };
    BusStop.prototype.getNextBuses = function () {
        var _this = this;
        return this.getAllNextBuses(5)
            .then(function (nextBuses) {
            var busstopName = _this.stationName;
            if (_this.platformName != 'null') {
                busstopName += " platform " + _this.platformName;
            }
            return { "busstopName": busstopName, "nextBuses": nextBuses };
        });
    };
    BusStop.prototype.formatResults = function (result) {
        var nextBuses = [];
        result.forEach(function (item) {
            nextBuses.push({ line: item.lineName, timeToArrive: item.timeToStation });
        });
        return nextBuses;
    };
    return BusStop;
}());
exports.BusStop = BusStop;
//# sourceMappingURL=busstop.js.map