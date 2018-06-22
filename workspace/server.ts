import {Busstopmap} from "./busstopmap";
import {BusStop} from "./busstop";
import {Location} from "./location";
import {nextBus} from "./nextBus";

const express = require('express')
const app = express()

app.get('/closestStops', (req, res) => {
    const postcode: string = req.query.postcode;
    const location = new Location();
    location.initByPostcode(postcode)
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
        .then(() => {
            const busstopmap = new Busstopmap();
            busstopmap.findBusstopsNearby(location, 2)
                .then(() => {
                    let output = "";
                    const resultPromises: Promise<any>[] = [];
                    busstopmap.stopIds.forEach((stopId) => {
                        const busstop = new BusStop(stopId);
                        const resultPromise = busstop.getBusSequence(5)
                            .then((nextBuses: nextBus[]) => {
                                let busstopName: string = busstop.stationName;
                                if (busstop.platformName != 'null') {
                                    busstopName += " platform " + busstop.platformName;
                                }
                                output += JSON.stringify(busstopName);
                                output += JSON.stringify(nextBuses);
                            });
                        resultPromises.push(resultPromise);
                    })
                    Promise.all(resultPromises).then((resolve) => {
                        res.send(output);
                    })
                });

        }).catch((err)=>{
            res.send("Unknown error!!!!");
    })
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))


module.exports = app;
