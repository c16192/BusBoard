"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var Location = /** @class */ (function () {
    function Location() {
    }
    Location.prototype.initByPostcode = function (postcode) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var baseurl = "http://api.postcodes.io/postcodes/";
            var url = baseurl + postcode;
            request(url, function (error, response, body) {
                var result = JSON.parse(body);
                _this.lng = result.result.longitude;
                _this.lat = result.result.latitude;
                resolve();
            });
        });
    };
    return Location;
}());
exports.Location = Location;
//# sourceMappingURL=location.js.map