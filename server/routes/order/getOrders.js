import { orders } from "./order.js";

const getOrders = (req, res) => {
    res.send(orders);
}

export default getOrders;