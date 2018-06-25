import {Location} from "./location"
import {NextBus} from "./nextBus";
import {BusStop, StopNameWithFutureBuses} from "./busstop";

const request = require('request');

export class Busstopmap {
    public stopIds: string[]

    constructor(public location: Location){}

    public findBusstopsNearby(num: number):Promise<void> {
        return new Promise((resolve)=>{
            const baseurl = "https://api.tfl.gov.uk/StopPoint";
            const stopType = "stopTypes=NaptanPublicBusCoachTram";
            const url = baseurl
                + "?"
                + stopType
                + "&lon="
                + this.location.lng.toString()
                + "&lat="
                + this.location.lat.toString();

            request(url, (error, response, body) => {
                const busstops = JSON.parse(body).stopPoints;
                const nearestBusstops = this.sortByDistance(busstops).slice(0, num)
                this.stopIds = nearestBusstops.map((stop) => stop.id)
                resolve();
            });

        })
    }

    public getBusesFromPostcode(num: number): Promise<StopNameWithFutureBuses[]> {
        return this.findBusstopsNearby(num)
            .then((): Promise<StopNameWithFutureBuses[]> => {
                const resultPromises: Promise<StopNameWithFutureBuses>[] = [];
                this.stopIds.forEach((stopId) => {
                    const nextBuses = new BusStop(stopId).getNextBuses();
                    resultPromises.push(nextBuses);
                });
                return Promise.all(resultPromises)
            });
    }

    public sortByDistance(busstops: any){
        busstops.sort((a,b) => {
            return a.distance - b.distance
        })
        return busstops
    }
}