"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var busstop_1 = require("./workspace/busstop");
var readlineSync = require('readline-sync');
var Index = /** @class */ (function () {
    function Index() {
    }
    Index.main = function () {
        var stopId = readlineSync.question('Which stop? ');
        var busstop = new busstop_1.BusStop(stopId);
        busstop.getBusSequence(5);
        return 0;
    };
    return Index;
}());
exports.Index = Index;
Index.main();
//# sourceMappingURL=index.js.map