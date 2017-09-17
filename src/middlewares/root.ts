
import { Request, NextFunction } from 'express';
const _package = require('../../package.json');
import { moment } from '../utils';
import { format } from 'util';
import * as project from '../project';

const util = {
	moment: moment,
	format: format
};

export function root(req: Request, res: any, next: NextFunction) {
	res.locals.project = project;

	const culture = res.locals.culture = {
		language: res.locale,
		lang: res.locale
	};

	res.locals.site = {
		version: _package.version,
		name: project.name,
		head: {}
	};

	res.locals.util = util;

	next();
};