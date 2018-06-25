import {Line} from "./line"
import {Request, Response} from "express";
import {serveClosestStops} from "./router/serveClosestStops";
import {showIndex} from "./router/showIndex";
import {serveLine} from "./router/serveLine";
import {showLinemap} from "./router/showLinemap";

const express = require('express')
const app = express()
const parser = require("body-parser");
app.use( parser.json() );
app.use(parser.urlencoded({extended: true}));

app.get('/closestStops', serveClosestStops);
app.get('/', showIndex);
app.get('/line', serveLine);
app.get("/linemap", showLinemap)

app.use(express.static('./workspace/view'))
app.use(express.static('./workspace/public'))

app.listen(3000, () => console.log('Our fantastic app listening on port 3000!'))

module.exports = app;
