import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { uid } from 'uid';

const app = express();
const port = process.env.BACKEND_PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = (fileName, text) => {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
    const pathToFile = path.join(logsDir, `${fileName}.log`);
    fs.appendFileSync(pathToFile, text);
}

const logRequest = (req, res, next) => {
    const message = `${new Date().toLocaleString()}\t${uid(16)} ${req.method} ${req.path}`;
    log('request', message + '\n');
    next();
}

const locations = [];

app.use(express.json());

app.get('/location', logRequest, (req, res) => {
    res.send(locations);
});

app.post('/location', logRequest, async (req, res) => {
    const data = req.body;
    const newLocation = {
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
});

app.options('/location', logRequest, (req, res) => {
    res.send(JSON.stringify({
            'address': 'address',
            'orders': []
        }));
});

app.get('/location/:location', logRequest, (req, res) => {
    const location = locations.find(loc => loc.address === req.params.location);
    if (location) {
        res.send(JSON.stringify(location));
    } else {
        res.status(404);
        res.send(JSON.stringify({
            'message': 'location not found!'
        }))
    }
});

app.listen(port, () => console.log('Server running on port', port, '!'));