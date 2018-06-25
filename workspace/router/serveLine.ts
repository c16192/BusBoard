import {Line} from "../line";

export const serveLine = (req,res)=>{
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
}