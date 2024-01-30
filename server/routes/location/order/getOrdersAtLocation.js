import { locations } from "../location.js";

const getOrderAtLocation = (req, res) => {
    const location = locations[`${req.params.location}`];
    res.send(JSON.stringify(location.orders));
}

export default getOrderAtLocation;