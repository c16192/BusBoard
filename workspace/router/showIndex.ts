import {Request, Response} from "express";

export const showIndex = (req: Request, res: Response)=>{
    let postcode = req.query.postcode;
    console.log(postcode)
    if (postcode == undefined) {
        res.redirect('/index.html')
    } else {
        res.redirect('/index.html?postcode=' + postcode)
    }
}