
import express, { Request, Response, NextFunction, Router } from 'express';
import { maxageIndex } from '../utils';

export const route = Router();

//index
route.get('/', function (req: Request, res: Response, next: NextFunction) {
    maxageIndex(res);
    next();
});
