import { locations } from '../location.js';
import { orderStatusCodes, generateId, orders } from '../../order/order.js';

const post = (req, res) => {
    const location = locations[`${req.params.location}`];
    const data = req.body;

    const orderId = generateId();
    const order = {
        'id': orderId,
        'product': data.product,
        'status': orderStatusCodes.ordered
    }

    orders.push(order);
    location.orders.push(order);

    res.status(201);
    res.send(JSON.stringify(order));
}

export default post;