
import { Request, Response, Router } from 'express';
import { maxageIndex } from '../utils';

export const route = Router();

//index
route.get('/', function (req: Request, res: Response) {
    maxageIndex(res);
    res.render('index');
});
