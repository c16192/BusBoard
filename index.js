"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var busstop_1 = require("./workspace/busstop");
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
            var busstopmap = new busstopmap_1.Busstopmap();
            busstopmap.findBusstopsNearby(location, 2).then(function () {
                busstopmap.stopIds.forEach(function (stopId) {
                    var busstop = new busstop_1.BusStop(stopId);
                    busstop.getBusSequence(5).then(function (nextBuses) {
                        var busstopName = busstop.stationName;
                        if (busstop.platformName != 'null') {
                            busstopName += " platform " + busstop.platformName;
                        }
                        console.log(busstopName);
                        console.log(nextBuses);
                    });
                });
            });
        });
        return 0;
    };
    return Index;
}());
exports.Index = Index;
Index.main();
//# sourceMappingURL=index.js.map