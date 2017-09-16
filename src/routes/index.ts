
import { route as homeRoute } from './home';
import { root } from '../middlewares/root';

export function mountRoutes(app: any) {
    app.use(root);
    app.use(homeRoute);
}