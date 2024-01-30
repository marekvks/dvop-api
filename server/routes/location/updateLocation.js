import { locations } from "./location";

const patch = (req, res) => {
    const location = locations.find((location) => location.address === req.params.location);
    const data = req.body;
    location.address = data.address ? data.address : location.address;
    res.status(200);
    res.send(JSON.stringify(location));
}

export default patch;