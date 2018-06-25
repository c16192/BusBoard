import {StopNameWithFutureBuses} from "./interfaces/StopNameWithFutureBuses";
import {NextBus} from "./interfaces/NextBus";
import {BusesForStop} from "./interfaces/BusesForStop";

const request = require('request');

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

    public getAllNextBuses(num: number): Promise<NextBus[]>{
            let url = this.buildURL();
            return this.promiseNextBuses(url);
        }


    private promiseNextBuses(url): Promise<NextBus[]> {
        return new Promise((resolve)=>{
            request(url, (error, response, body) => {
                let allResults = this.sortByTime(JSON.parse(body))
                this.stationName = allResults[0].stationName;
                this.platformName = allResults[0].platformName;
                const nextBuses = this.formatResults(allResults.slice(0, 5));
                resolve(nextBuses)
            });
        });
    }

    private buildURL() {
        const baseUrl: string = "https://api.tfl.gov.uk/StopPoint/";
        const endpoint: string = "/Arrivals";
        const appId: string = "app_id=70bf8eaf";
        const appKey: string = "app_key=f9015c45cebfaf6aee020c196310c4a0"
        let url: string = baseUrl + this.stopId + endpoint + "?" + appId + "&" + appKey;
        return url;
    }

    public getNextBuses(): Promise<StopNameWithFutureBuses> {
        return this.getAllNextBuses(5)
            .then(this.getBusesForStop);
    }

    private getBusesForStop = (nextBuses: NextBus[]): BusesForStop => {
        let busstopName: string = this.stationName;
        if (this.platformName != 'null') {
        busstopName += " platform " + this.platformName;
    }
    return {"busstopName": busstopName,"nextBuses": nextBuses};
    }

    public formatResults(result: any[]): NextBus[]{
        const nextBuses: NextBus[]= [];
        result.forEach((item)=>{
            nextBuses.push({line: item.lineName, timeToArrive: item.timeToStation})
        })
        return nextBuses;
    }

}
