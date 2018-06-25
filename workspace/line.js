"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var Line = /** @class */ (function () {
    function Line(lineId) {
        this.lineId = lineId;
    }
    Line.prototype.getAllStops = function () {
        var url = this.buildURL();
        return this.promiseStopCoordinates(url);
    };
    Line.prototype.promiseStopCoordinates = function (url) {
        return new Promise(function (resolve) {
            request(url, function (error, response, body) {
                var allResults = JSON.parse(body);
                var lineStrings = allResults.lineStrings[0];
                var stopCoordinates = JSON.parse(lineStrings)[0];
                console.log(stopCoordinates);
                resolve(stopCoordinates);
            });
        });
    };
    Line.prototype.buildURL = function () {
        var baseUrl = "https://api.tfl.gov.uk/Line/";
        var endpoint = "/Route/Sequence/inbound";
        var appId = "app_id=70bf8eaf";
        var appKey = "app_key=f9015c45cebfaf6aee020c196310c4a0";
        var url = baseUrl + this.lineId + endpoint + "?" + appId + "&" + appKey;
        return url;
    };
    return Line;
}());
exports.Line = Line;
//# sourceMappingURL=line.js.map