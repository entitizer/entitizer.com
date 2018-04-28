
import { Request, Response, Router } from 'express';
import { maxageIndex } from '../utils';
import * as project from '../project';

export const route = Router();

//index
route.get('/', function (req: Request, res: Response) {
    maxageIndex(res);
    res.locals.site.head.canonical = 'http://' + project.host + '/';
    res.locals.api = {
        url: process.env.API_URL,
    };
    res.render('index');
});
