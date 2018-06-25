"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var line_1 = require("../line");
exports.serveLine = function (req, res) {
    var rawLineId = req.query.lineId;
    console.log(rawLineId);
    if (rawLineId == undefined) {
        res.send('empty');
    }
    else {
        var line = new line_1.Line("c2");
        line.getAllStops().then(function (data) {
            res.send({ status: 200, data: data });
        }).catch(function (err) {
            res.send({ status: 404, data: err });
        });
    }
};
//# sourceMappingURL=serveLine.js.map