import {BusStop} from "./workspace/busstop"
import {Location} from "./workspace/location"
import {Busstopmap} from "./workspace/busstopmap";
const readlineSync = require('readline-sync');

export class Index {
    public static main(): number {

        let stopPostcode:string = readlineSync.question('Give me a postcode ');
        //let stopId:string = readlineSync.question('Which stop? ');
        const location = new Location();
        location.initByPostcode(stopPostcode)
            .then( ()=> {
                new Busstopmap().findBusstopsNearby(location, 2);
            }
            )
        //const busstop = new BusStop(stopId);
        //busstop.getBusSequence(5);
        return 0;
    }
}

Index.main();