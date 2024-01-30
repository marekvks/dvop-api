import { locations } from "./location.js";

const get = (req, res) => {
    res.send(locations);
};

export default get;