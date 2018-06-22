const request = require('request');
import {nextBus} from "./nextBus";

export class BusStop {
    public stationName: string;
    public platformName: string;
    constructor(public stopId: string){}

    private sortByTime(busSequence){
        busSequence.sort(function(a, b) {
            return a.timeToStation - b.timeToStation;
        })
        return busSequence
    }

    public getBusSequence(num: number): Promise<nextBus[]>{
        return new Promise((resolve)=>{
            const baseUrl:string = "https://api.tfl.gov.uk/StopPoint/";
            const endpoint:string = "/Arrivals";
            const appId:string = "app_id=70bf8eaf";
            const appKey:string = "app_key=f9015c45cebfaf6aee020c196310c4a0"
            let url:string = baseUrl + this.stopId + endpoint + "?" + appId + "&" + appKey;


            request(url, (error, response, body) => {
                let allResults = this.sortByTime(JSON.parse(body))
                this.stationName = allResults[0].stationName;
                this.platformName = allResults[0].platformName;
                const nextBuses = this.formatResults(allResults.slice(0,5));

                resolve(nextBuses)
            });
        });
    }

    public formatResults(result: any[]): nextBus[]{
        const nextBuses: nextBus[]= [];
        result.forEach((item)=>{
            nextBuses.push({line: item.lineName, timeToArrive: item.timeToStation})
        })
        return nextBuses;
    }

}
