"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var BusStop = /** @class */ (function () {
    function BusStop(stopId) {
        this.stopId = stopId;
    }
    BusStop.prototype.sortByTime = function (busSequence) {
        return busSequence;
    };
    BusStop.prototype.getBusSequence = function (num) {
        var baseUrl = "https://api.tfl.gov.uk/StopPoint/";
        var endpoint = "/Arrivals";
        var appId = "app_id=70bf8eaf";
        var appKey = "app_key=f9015c45cebfaf6aee020c196310c4a0";
        var url = baseUrl + this.stopId + endpoint + "?" + appId + "&" + appKey;
        request(url, function (error, response, body) {
            //let result = this.sortByTime(JSON.parse(body));
            console.log(JSON.parse(body));
        });
    };
    return BusStop;
}());
exports.BusStop = BusStop;
//# sourceMappingURL=busstop.js.map