import {Busstopmap} from "./busstopmap";
import {BusStop} from "./busstop";
import {Location} from "./location";
import {NextBus} from "./nextBus";

const express = require('express')
const app = express()

app.get('/closestStops', (req, res) => {
    const postcode: string = req.query.postcode;
    const location = new Location();
    location.initByPostcode(postcode)
        .catch((err) => {
            throw err;
        })
        .then((): Promise<any[]> => {
            return new Busstopmap(location).getBusesFromPostcode(2);
        })
        .catch((err) => {
        throw err;
    })
    .then((data)=>{
                        // here we will parse output
        console.log(data);
        res.send(JSON.stringify(data))
    });
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))


module.exports = app;
