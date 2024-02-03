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
    'origin': ['http://localhost:8080', 'http://localhost:3000']
}));

app.use('/location', locationRouter);
app.use('/order', orderRouter);

app.listen(port, () => console.log('Server running on port', port, '!'));