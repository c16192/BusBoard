const request = require('request');

interface nextBus {
    line: string;
    timeToArrive: number;
}

export class BusStop {
    constructor(public stopId: string){}

    private sortByTime(busSequence){
        busSequence.sort(function(a, b) {
            return a.timeToStation - b.timeToStation;
        })
        return busSequence
    }

    public getBusSequence(num: number){
        const baseUrl:string = "https://api.tfl.gov.uk/StopPoint/";
        const endpoint:string = "/Arrivals";
        const appId:string = "app_id=70bf8eaf";
        const appKey:string = "app_key=f9015c45cebfaf6aee020c196310c4a0"
        let url:string = baseUrl + this.stopId + endpoint + "?" + appId + "&" + appKey;


        request(url, (error, response, body) => {
            let allResults = this.sortByTime(JSON.parse(body))
            const nextBuses = this.formatResults(allResults.slice(0,5));

            console.log(nextBuses)
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
