import express from "express";

import { logRequest } from "../../middleware/logger";
import getOrders from "./getOrders";
import updateOrderStatus from "./updateOrderStatus";

const router = express.Router();

export const orderStatusCodes = {
    'ordered': 0,
    'processed': 1,
    'ready to pickup': 2,
    'completed': 3,
}

let ids = 0;

export const generateId = () => {
    ids++;
    return ids;
}

export const orders = [];

const checkValidOrder = (req, res, next) => {
    const id = Number(req.params.id);
    if (orders.includes((order) => order.id === id)) {
        next();
        return;
    }

    res.status(404);
    res.end();
}

router.get('/', logRequest, getOrders);
router.patch('/:id/updateStatus', logRequest, checkValidOrder, updateOrderStatus);

export default router;