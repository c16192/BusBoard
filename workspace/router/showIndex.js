"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showIndex = function (req, res) {
    var postcode = req.query.postcode;
    console.log(postcode);
    if (postcode == undefined) {
        res.redirect('/index.html');
    }
    else {
        res.redirect('/index.html?postcode=' + postcode);
    }
};
//# sourceMappingURL=showIndex.js.map