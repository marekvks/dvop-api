import { orders } from './order.js';

const getOrder = (req, res) => {
    const id = Number(req.params.id);
    const order = orders.find(order => order.id === id);

    res.status(200).send(JSON.stringify(order));
}

export default getOrder;