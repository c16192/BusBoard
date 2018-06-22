import {BusStop} from "./workspace/busstop"
import {Location} from "./workspace/location"
import {Busstopmap} from "./workspace/busstopmap";
import {nextBus} from "./workspace/nextBus";

const readlineSync = require('readline-sync');

export class Index {
    public static main(): number {

        let stopPostcode:string = readlineSync.question('Give me a postcode ');
        //let stopId:string = readlineSync.question('Which stop? ');
        const location = new Location();
        location.initByPostcode(stopPostcode)
            .then( ()=> {
                const busstopmap = new Busstopmap();
                busstopmap.findBusstopsNearby(location, 2).then(()=>{
                    busstopmap.stopIds.forEach((stopId)=>{
                        const busstop = new BusStop(stopId);
                        busstop.getBusSequence(5).then((nextBuses: nextBus[])=>{
                            let busstopName:string = busstop.stationName;
                            if(busstop.platformName != 'null'){
                                busstopName += " platform " +  busstop.platformName;
                            }
                            console.log(busstopName);
                            console.log(nextBuses);
                        });
                    });
                })
            }
            )
        return 0;
    }
}

Index.main();