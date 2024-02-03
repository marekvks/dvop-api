import { locations } from "./location.js";

const deleteLocation = (req, res) => {
    const location = locations.find((location) => location.address === req.params.location);
    const locaitonIndex = locations.indexOf(location);
    locations.splice(locaitonIndex, 1);
    res.status(200);
    const resBody = {
        'message': 'Successfully deleted a location'
    }
    res.send(JSON.stringify(resBody));
}

export default deleteLocation;