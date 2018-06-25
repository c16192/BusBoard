const request = require('request')

export class Location {
    public lng;
    public lat;

    public initByPostcode(postcode: string): Promise<void>{
        return new Promise((resolve, reject) =>{
            const baseurl = "http://api.postcodes.io/postcodes/"
            const url = baseurl + postcode;

            request(url, (error, response, body) => {
                const result = JSON.parse(body);
                if(result.status == 200){
                    this.lng = result.result.longitude;
                    this.lat = result.result.latitude;
                    resolve()
                } else if(result.status == 404) {
                    console.log("rejected in initByPostcode")
                    reject(result.error)
                } else {
                    reject("Unknown error occurred");
                }
            });
        })

    }
}