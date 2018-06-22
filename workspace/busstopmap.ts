import {Location} from "./location"
import {NextBus} from "./nextBus";
import {BusStop} from "./busstop";

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
                const nearestBusstopIds = nearestBusstops.map((stop)=>{return stop.id})
                this.stopIds = nearestBusstopIds
                resolve();
            });

        })
    }

    public getBusesFromPostcode(num: number): Promise<any[]> {
        return this.findBusstopsNearby(num)
            .then((): Promise<any[]> => {
                const resultPromises: Promise<any>[] = [];
                this.stopIds.forEach((stopId) => {
                    const nextBuses = new BusStop(stopId).getNextBuses();
                    resultPromises.push(nextBuses);
                });
                return Promise.all(resultPromises).then((data): any[] => {
                    return data;
                })
            });
    }

    public sortByDistance(busstops: any){
        busstops.sort((a,b) => {
            return a.distance - b.distance
        })
        return busstops
    }
}