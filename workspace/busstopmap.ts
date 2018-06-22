import {Location} from "./location"
const request = require('request');

export class Busstopmap {
    public stopIds: string[]
    public findBusstopsNearby(location: Location, num: number) {
        const baseurl = "https://api.tfl.gov.uk/StopPoint";
        const stopType = "stopTypes=NaptanPublicBusCoachTram";
        const url = baseurl
            + "?"
            + stopType
            + "&lon="
            + location.lng.toString()
            + "&lat="
            + location.lat.toString();

        request(url, (error, response, body) => {
            const busstops = JSON.parse(body).stopPoints;
            const nearestBusstops = this.sortByDistance(busstops).slice(0, num)
            const nearestBusstopIds = nearestBusstops.map((stop)=>{return stop.id})
            this.stopIds = nearestBusstopIds
        });
    }
    public sortByDistance(busstops: any){
        busstops.sort((a,b) => {
            return a.distance - b.distance
        })
        return busstops
    }
}