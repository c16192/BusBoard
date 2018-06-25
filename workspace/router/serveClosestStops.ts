import {Location} from "../location";
import {Busstopmap} from "../busstopmap";
import {StopNameWithFutureBuses} from "../interfaces/StopNameWithFutureBuses";
export const serveClosestStops = (req, res) => {
    const postcode: string = req.query.postcode;
    const location = new Location();
    location.initByPostcode(postcode)
        .then((): Promise<StopNameWithFutureBuses[]> => {
                return new Busstopmap(location).getBusesFromPostcode(2);
            }
        )
        .then((data: StopNameWithFutureBuses[])=>{
            res.send(JSON.stringify({status: 200, data: data}))
        })
        .catch((err) => {
            res.send(JSON.stringify({status: 404, data: err}));
        });
}