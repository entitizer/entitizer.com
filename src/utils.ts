import moment from "moment";

export { moment };

const NO_CACHE = "private, max-age=0, no-cache";
const PUBLIC_CACHE = "public, max-age=";
const CACHE_CONTROL = "Cache-Control";
/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
export function maxage(res: any, maxage: number) {
  // maxage = 0;
  var cache = NO_CACHE;
  if (maxage > 0) {
    cache = PUBLIC_CACHE + maxage * 60;
    //res.set('Expires', new Date(Date.now() + (maxage * 60 * 1000)).toUTCString());
  }
  res.set(CACHE_CONTROL, cache);
}

export function maxageRedirect(res: any) {
  maxage(res, 60 * 12);
}

export function maxageIndex(res: any) {
  maxage(res, 60 * 2);
}
