import express from "express";

import { logRequest } from "../../middleware/logger.js";
import getOrders from "./getOrders.js";
import { nextStatus as nextOrderStatus, prevStatus as prevOrderStatus } from "./updateOrderStatus.js";
import deleteOrder from "./deleteOrder.js";

const router = express.Router();

export const orderStatusCodes = [
    'ordered',
    'processed',
    'ready to pickup',
    'completed'
]

let ids = 0;

export const generateId = () => {
    ids++;
    return ids;
}

export const orders = [];

const checkValidOrder = (req, res, next) => {
    const id = Number(req.params.id);
    console.log(id, typeof id);
    if (orders.find((order) => order.id === id)) {
        next();
        return;
    }

    res.status(404);
    const resBody = {
        "message": "invalid id."
    }
    res.send(JSON.stringify(resBody));
}

router.get('/', logRequest, getOrders);
router.patch('/:id/nextStatus', logRequest, checkValidOrder, nextOrderStatus);
router.patch('/:id/prevStatus', logRequest, checkValidOrder, prevOrderStatus);
router.delete('/:id', logRequest, checkValidOrder, deleteOrder);

export default router;