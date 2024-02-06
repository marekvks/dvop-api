import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors'
import { logRequest } from './middleware/logger.js';
import locationRouter from './routes/location/location.js';
import orderRouter from './routes/order/order.js';

const app = express();
const port = process.env.BACKEND_PORT;

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(cors({
    'origin': ['http://localhost:8080', 'http://localhost:5173']
}));

app.use('/location', logRequest, locationRouter);
app.use('/order', logRequest, orderRouter);

app.all('*', logRequest, (req, res) => {
    const resBody = {
        "message": "not found"
    }
    res.status(404).send(JSON.stringify(resBody));
});

app.listen(port, () => console.log('Server running on port', port, '!'));