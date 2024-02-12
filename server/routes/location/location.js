import express from 'express';
import { logRequest } from '../../middleware/logger.js';
import getLocations from './getLocations.js';
import createLocation from './createLocation.js';
import getLocation from './getLocation.js';
import updateLocation from './updateLocation.js';
import deleteLocation from './deleteLocation.js';
import getOrderAtLocation from './order/getOrdersAtLocation.js';
import createOrderAtLocation from './order/createOrderAtLocation.js';

export const locations = [];

const router = express.Router();

const checkValidLocation = (req, res, next) => {
    if (!locations.find(location => location.address === req.params.location)) {
        res.status(404);
        res.send(JSON.stringify({
            'messager': 'location not found.'
        }));
    }
    next();
}

export const checkCompletedOrders = (req, res, next) => {
    const location = locations.find(location => location.address === req.params.location);

    if (location.orders.find(order => order.status !== 'completed')) {
        const resBody = {
            'message': 'all orders in this location must be completed or deleted before you can delete this location.'
        }
        res.status(400).send(resBody);
        return;
    }
    next();
}

router.get('/', logRequest, getLocations);
router.post('/', logRequest, createLocation);
router.get('/:location', logRequest, checkValidLocation, getLocation);
router.patch('/:location', logRequest, checkValidLocation, updateLocation);
router.delete('/:location', logRequest, checkValidLocation, checkCompletedOrders, deleteLocation);
router.get('/:location/order', logRequest, checkValidLocation, getOrderAtLocation);
router.post('/:location/order', logRequest, checkValidLocation, createOrderAtLocation);

export default router;