"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showLinemap = function (req, res) {
    var lineId = req.query.lineId;
    console.log(lineId);
    if (lineId == undefined) {
        res.redirect('/linemap.html');
    }
    else {
        res.redirect('/linemap.html?lineId=' + lineId);
    }
};
//# sourceMappingURL=showLinemap.js.map