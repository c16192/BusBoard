"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = require("./workspace/location");
var busstopmap_1 = require("./workspace/busstopmap");
var readlineSync = require('readline-sync');
var Index = /** @class */ (function () {
    function Index() {
    }
    Index.main = function () {
        var stopPostcode = readlineSync.question('Give me a postcode ');
        //let stopId:string = readlineSync.question('Which stop? ');
        var location = new location_1.Location();
        location.initByPostcode(stopPostcode)
            .then(function () {
            new busstopmap_1.Busstopmap().findBusstopsNearby(location, 2);
        });
        //const busstop = new BusStop(stopId);
        //busstop.getBusSequence(5);
        return 0;
    };
    return Index;
}());
exports.Index = Index;
Index.main();
//# sourceMappingURL=index.js.map