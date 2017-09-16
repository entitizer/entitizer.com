
require('dotenv').config();

import * as express from 'express';
import { logger } from './logger';
import * as path from 'path';
import { boot } from './boot';
import { mountRoutes } from './routes';
const cookieParser = require('cookie-parser');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.disable('x-powered-by');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.disable('etag');

app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: isProduction ? (1000 * 60 * 15) : 0
}));

app.use(cookieParser());

boot(app);

mountRoutes(app);

app.all('*', function (req, res) {
    res.status(404).end();
});

app.listen(process.env.PORT, () => {
    logger.warn('Listening at %s', process.env.PORT);
});

process.on('unhandledRejection', function (error: Error) {
    logger.error('unhandledRejection: ' + error.message, error);
});

process.on('uncaughtException', function (error: Error) {
    logger.error('uncaughtException: ' + error.message, error);
});
