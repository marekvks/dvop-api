import { orders } from "./order";

export const nextStatus = (req, res) => {
    const id = Number(req.params.id);
    const order = orders.find((order) => order.id === id);
}