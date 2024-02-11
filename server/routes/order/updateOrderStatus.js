import { orders, orderStatusCodes } from "./order.js";

export const checkAvailableStatus = (req, res, next) => {
    const data = req.body;

    if (orderStatusCodes.includes(data.status)) {
        next();
        return;
    }

    const resBody = {
        'message': 'invalid status.'
    }

    res.status(404).send(JSON.stringify(resBody));
}

const updateOrderStatus = (req, res) => {
    const id = Number(req.params.id);
    const order = orders.find((order) => order.id === id);

    const data = req.body;
    order.status = data.status;

    const resBody = {
        "message": "order status changed!"
    }

    res.status(200).send(JSON.stringify(resBody));
}

export default updateOrderStatus;