import { orders, orderStatusCodes } from "./order.js";

export const nextStatus = (req, res) => {
    const id = Number(req.params.id);
    const order = orders.find((order) => order.id === id);

    const currentStatus = order.status;
    const currentStatusCode = orderStatusCodes.indexOf(currentStatus);

    const nextStatusCode = Math.min(orderStatusCodes.length - 1, currentStatusCode + 1);
    const nextStatus = orderStatusCodes[nextStatusCode];

    order.status = nextStatus;
    console.log(nextStatusCode, nextStatusCode);
    console.log(order.status);

    const resBody = {
        "message": "order status changed!"
    }

    res.status(200);
    res.send(JSON.stringify(resBody));
}

export const prevStatus = (req, res) => {
    const id = Number(req.params.id);
    const order = orders.find((order) => order.id === id);

    const currentStatus = order.status;
    const currentStatusCode = orderStatusCodes.indexOf(currentStatus);

    const nextStatusCode = Math.max(0, currentStatusCode - 1);
    const nextStatus = orderStatusCodes[nextStatusCode];

    order.status = nextStatus;

    const resBody = {
        "message": "order status changed!"
    }

    res.status(200);
    res.send(JSON.stringify(resBody));
}