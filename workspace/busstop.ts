const request = require('request');

export class BusStop {
    constructor(public stopId: string){}

    public sortByTime(busSequence){
        return busSequence;
    }

    public getBusSequence(num: number){
        const baseUrl:string = "https://api.tfl.gov.uk/StopPoint/";
        const endpoint:string = "/Arrivals";
        const appId:string = "app_id=70bf8eaf";
        const appKey:string = "app_key=f9015c45cebfaf6aee020c196310c4a0"
        let url:string = baseUrl + this.stopId + endpoint + "?" + appId + "&" + appKey;
        request(url, function (error, response, body) {
            //let result = this.sortByTime(JSON.parse(body));
            console.log(JSON.parse(body));
            });
    }
}