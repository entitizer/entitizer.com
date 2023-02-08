import path from "path";
export const i18n = require("i18n");

i18n.configure({
  locales: ["en"],
  directory: path.join(__dirname, "..", "locales"),
  cookie: "ul",
  queryParameter: "ul"
});

export function boot(app: any) {
  app.use(i18n.init);
}
