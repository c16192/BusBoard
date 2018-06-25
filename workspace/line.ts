import {NextBus} from "./nextBus";
const request = require('request');

export class Line {
    constructor(public lineId: string){}

    public getAllStops(): Promise<number[][]>{
        return new Promise((resolve)=>{
            const baseUrl:string = "https://api.tfl.gov.uk/Line/";
            const endpoint:string = "/Route/Sequence/inbound"
            const appId:string = "app_id=70bf8eaf";
            const appKey:string = "app_key=f9015c45cebfaf6aee020c196310c4a0"
            let url:string = baseUrl + this.lineId + endpoint + "?" + appId + "&" + appKey;

            request(url, (error, response, body) => {
                let allResults = JSON.parse(body)
                let lineStrings = allResults.lineStrings[0]
                let stopCoordinates:number[][] = JSON.parse(lineStrings)[0]
                console.log(stopCoordinates)
                resolve(stopCoordinates)
            });
        });
    }

}