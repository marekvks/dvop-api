import path from 'path';
import fs from 'fs';
import { uid } from 'uid';
import { __dirname } from '../app.js';

const log = (fileName, text) => {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
    const pathToFile = path.join(logsDir, `${fileName}.log`);
    fs.appendFileSync(pathToFile, text);
}

export const logRequest = (req, res, next) => {
    const message = `${new Date().toLocaleString()}\t${uid(16)} ${req.method} ${req.path}`;
    log('request', message + '\n');
    next();
}