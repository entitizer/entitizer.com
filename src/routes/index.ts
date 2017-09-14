
import { route as homeRoute } from './home';
// const middlewares = require('../middlewares');

export function mountRoutes(app: any) {
    // app.use(middlewares.root);
    // app.use(middlewares.stats);

    app.use(homeRoute);
}