import { Request, NextFunction } from "express";
const _package = require("../../package.json");
import { moment } from "../utils";
import { format } from "util";
import * as project from "../project";
import { Config } from "../config";
const entipicUrl = require("entipic.url");

const util = {
  moment: moment,
  format: format,
  entipicUrl
};

export function root(_req: Request, res: any, next: NextFunction) {
  res.locals.project = project;

  res.locals.culture = {
    language: res.locale,
    lang: res.locale
  };

  res.locals.site = {
    version: _package.version,
    name: project.name,
    head: {
      title: project.name,
      description: project.description
    }
  };

  res.locals.util = util;

  res.locals.Config = Config;

  next();
}
