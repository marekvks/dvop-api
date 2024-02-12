import express from "express";

import { logRequest } from "../../middleware/logger.js";
import getOrders from "./getOrders.js";
import updateOrderStatus from "./updateOrderStatus.js";
import { checkAvailableStatus } from "./updateOrderStatus.js";
import getOrder from "./getOrder.js";
import deleteOrder from "./deleteOrder.js";
import getAvailableOrderStatus from "./getAvailableStatuses.js";

const router = express.Router();

export const orderStatusCodes = [
    'processing',
    'ready',
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
router.get('/availableStatuses', logRequest, getAvailableOrderStatus);
router.get('/:id', logRequest, checkValidOrder, getOrder);
router.patch('/:id/status', logRequest, checkValidOrder, checkAvailableStatus, updateOrderStatus);
router.delete('/:id', logRequest, checkValidOrder, deleteOrder);

export default router;