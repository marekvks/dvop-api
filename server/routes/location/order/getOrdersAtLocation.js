import { locations } from "../location.js";

const getOrderAtLocation = (req, res) => {
    const location = locations.find((location) => location.address === req.params.location);
    res.send(JSON.stringify(location.orders));
}

export default getOrderAtLocation;