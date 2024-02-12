import { orderStatusCodes } from "./order.js";

const getAvailableOrderStatus = (req, res) => {
    res.status(200).send(JSON.stringify(orderStatusCodes));
}

export default getAvailableOrderStatus;