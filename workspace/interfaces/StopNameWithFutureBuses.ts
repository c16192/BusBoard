import {NextBus} from "./NextBus";

export interface StopNameWithFutureBuses {
    busstopName: string;
    nextBuses: NextBus[]
}