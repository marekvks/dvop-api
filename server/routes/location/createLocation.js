import { locations } from "./location.js";

const post = (req, res) => {
    console.log(locations);
    const data = req.body;
    const newLocation = {
         'id': locations.length > 0 ? locations[locations.length = 1].id + 1 : 1,
         'address': data.address,
         'orders': []
    };
    if (locations.find(loc => loc.address === newLocation.address)) {
        res.status(400);
        res.send(JSON.stringify({ 'message': 'store with this location already exists!' }));
    } else {
        locations.push(newLocation);
        res.status(201);
        res.send(newLocation);
    }
};

export default post;