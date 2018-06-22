"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var Busstopmap = /** @class */ (function () {
    function Busstopmap() {
    }
    Busstopmap.prototype.findBusstopsNearby = function (location, num) {
        var _this = this;
        return new Promise(function (resolve) {
            var baseurl = "https://api.tfl.gov.uk/StopPoint";
            var stopType = "stopTypes=NaptanPublicBusCoachTram";
            var url = baseurl
                + "?"
                + stopType
                + "&lon="
                + location.lng.toString()
                + "&lat="
                + location.lat.toString();
            request(url, function (error, response, body) {
                var busstops = JSON.parse(body).stopPoints;
                var nearestBusstops = _this.sortByDistance(busstops).slice(0, num);
                var nearestBusstopIds = nearestBusstops.map(function (stop) { return stop.id; });
                _this.stopIds = nearestBusstopIds;
                resolve();
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