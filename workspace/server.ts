import {Busstopmap} from "./busstopmap";
import {Location} from "./location";
import {Line} from "./line"
import {Request, Response} from "express";

const express = require('express')
const app = express()
const parser = require("body-parser");
app.use( parser.json() );
app.use(parser.urlencoded({
    extended: true
}));
app.get('/closestStops', (req, res) => {
    const postcode: string = req.query.postcode;
    const location = new Location();
    location.initByPostcode(postcode)
        .then((): Promise<any[]> => {
                return new Busstopmap(location).getBusesFromPostcode(2);
            }, (err) => {
                console.log("first catch")
                console.log(err)
                throw err
            }
        )
        .catch((err) => {
            console.log("second catch")
            console.log(err)
            throw err
        })
        .then((data)=>{
                            // here we will parse output
            console.log("foo")
            console.log(data);
            res.send(JSON.stringify({status: 200, data: data}))
        })
        .catch((err) => {
            console.log("third catch")
            console.log(err)
            res.send(JSON.stringify({status: 404, data: err}));
        });
})
// app.use(express.json());
// app.use(express.urlencoded());

app.get('/', (req: Request, res: Response)=>{
    let rawPostcode = req.query.postcode;
    console.log(rawPostcode)
    if (rawPostcode == undefined) {
        res.redirect('/index.html')
    } else {
        let postcode = santisePostcode(rawPostcode);
        res.redirect('/index.html?postcode=' + postcode)
    }
})

function santisePostcode(rawPostcode) {
    return rawPostcode.replace(/\s+/g, '');
}

app.get('/line', (req,res)=>{
    let rawLineId = req.query.lineId;
    console.log(rawLineId)
    if (rawLineId == undefined) {
        res.send('empty')
    } else {
        const line = new Line("c2");
        line.getAllStops().then((data)=>{
            res.send({status: 200, data: data});
        }).catch((err)=>{
            res.send({status: 404, data: err});
        })
    }
})

app.get("/linemap", (req, res) => {
    let rawLineId = req.query.lineId;
    console.log(rawLineId)
    if (rawLineId == undefined) {
        res.redirect('/linemap.html')
    } else {
        let lineId = rawLineId;
        res.redirect('/linemap.html?lineId=' + lineId)
    }
})
app.use(express.static('./workspace/view'))

app.use(express.static('./workspace/public'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


module.exports = app;
