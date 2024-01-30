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
            'messager': 'Location not found.'
        }));
    }
    next();
}

router.get('/', logRequest, checkValidLocation, getLocations);
router.post('/', logRequest, createLocation);
router.get('/:location', logRequest, checkValidLocation, getLocation);
router.patch('/:location', logRequest, checkValidLocation, updateLocation);
router.delete('/:location', logRequest, checkValidLocation, deleteLocation);
router.get('/:location/order', logRequest, checkValidLocation, getOrderAtLocation);
router.post('/:location/order', logRequest, checkValidLocation, createOrderAtLocation);

export default router;