"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var line_1 = require("../line");
exports.serveLine = function (req, res) {
    var lineId = req.query.lineId;
    console.log(lineId);
    if (lineId == undefined) {
        res.send('empty');
    }
    else {
        var line = new line_1.Line(lineId);
        line.getAllStops().then(function (data) {
            res.send({ status: 200, data: data });
        }).catch(function (err) {
            res.send({ status: 404, data: err });
        });
    }
};
//# sourceMappingURL=serveLine.js.map