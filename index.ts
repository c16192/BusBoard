import {BusStop} from "./workspace/busstop"
const readlineSync = require('readline-sync');

export class Index {
    public static main(): number {

        let stopId:string = readlineSync.question('Which stop? ');
        const busstop = new BusStop(stopId);
        busstop.getBusSequence(5);

        return 0;
    }
}

Index.main();