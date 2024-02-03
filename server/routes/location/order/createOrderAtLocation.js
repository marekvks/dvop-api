import { locations } from '../location.js';
import { orderStatusCodes, generateId, orders } from '../../order/order.js';

const checkValidBody = (product) => product == undefined;

const post = (req, res) => {
    const location = locations.find((location) => location.address === req.params.location);
    const data = req.body;

    if (checkValidBody(data.product)) {
        res.status(400);
        const resBody = {
            "message": "invalid request body."
        }
        res.send(JSON.stringify(resBody));
        return;
    }

    const orderId = generateId();
    const statusCode = 0;
    const order = {
        'id': orderId,
        'product': data.product,
        'status': orderStatusCodes[statusCode]
    }

    orders.push(order);
    location.orders.push(order);

    res.status(201);
    res.send(JSON.stringify(order));
}

export default post;