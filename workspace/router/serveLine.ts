import {Line} from "../line";

export const serveLine = (req,res)=>{
    let lineId = req.query.lineId;
    console.log(lineId)
    if (lineId == undefined) {
        res.send('empty')
    } else {
        const line = new Line(lineId);
        line.getAllStops().then((data)=>{
            res.send({status: 200, data: data});
        }).catch((err)=>{
            res.send({status: 404, data: err});
        })
    }
}