import { locations } from "./location.js";
import { orders } from "../order/order.js";

const deleteLocation = (req, res) => {
    const location = locations.find((location) => location.address === req.params.location);
    const locaitonIndex = locations.indexOf(location);

    location.orders.forEach(order => {
        const index = orders.indexOf(order);
        orders.splice(index, 1);
    });

    locations.splice(locaitonIndex, 1);

    const resBody = {
        'message': 'Successfully deleted a location'
    }

    res.status(200).send(JSON.stringify(resBody));
}

export default deleteLocation;