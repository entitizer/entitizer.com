import { Request, Response, Router } from "express";
import { maxageIndex } from "../utils";
import * as project from "../project";

export const route = Router();

//index
route.get("/", function (_req: Request, res: Response) {
  maxageIndex(res);
  res.locals.site.head.canonical = "http://" + project.host + "/";
  res.render("index");
});
