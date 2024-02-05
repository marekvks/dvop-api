import { orders } from "./order.js";
import { locations } from "../location/location.js";

const deleteOrder = (req, res) => {
    const id = Number(req.params.id);

    const order = orders.find(o => o.id === id);
    const orderIndex = orders.indexOf(order);
    orders.splice(orderIndex, 1);

    const location = locations.find(loc => {
        return loc.orders.find(o => o.id === id);
    });
    const orderIndexAtLocation = location.orders.indexOf(order);
    location.orders.splice(orderIndexAtLocation, 1);

    const resBody = {
        "message": "order successfully deleted."
    }

    res.status(200);
    res.send(resBody);
}

export default deleteOrder;