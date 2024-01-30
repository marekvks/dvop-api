import { locations } from "./location.js";

const get = (req, res) => {
    const location = locations.find(location => location.address === req.params.location);
    res.send(JSON.stringify(location));
};

export default get;