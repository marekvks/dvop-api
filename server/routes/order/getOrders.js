import { orders } from "./order";

const getOrders = (req, res) => {
    res.send(orders);
}

export default getOrders;