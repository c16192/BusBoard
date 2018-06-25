import {NextBus} from "./NextBus";
export interface BusesForStop {
    busstopName: string;
    nextBuses: NextBus[]
}