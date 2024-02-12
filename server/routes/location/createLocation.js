import { locations } from "./location.js";

const checkExistingAddress = (address) => locations.find(loc => loc.address === address) !== undefined;

const checkRequestBody = (data) => data.address === undefined || data.address.length <= 0;

const post = (req, res) => {
    const data = req.body;

    if (checkRequestBody(data) || checkExistingAddress(data.address)) {
        res.status(400);
        const resBody = {
            'message': 'invalid request body or store with this location already exists.'
        }
        res.send(JSON.stringify(resBody));
        return;
    }

    const newLocation = {
         'id': locations.length > 0 ? locations[locations.length - 1].id + 1 : 1,
         'address': data.address.trim(),
         'orders': []
    };

    locations.push(newLocation);
    res.status(201);
    res.send(newLocation);
};

export default post;