export const SITE_URL = "https://bustrafficfever.org";
export const SITE_NAME = "BusTrafficFever.org";
export const GAME_NAME = "Bus Traffic Fever";
export const GAME_DEVELOPER = "GOODROID,Inc.";
export const APP_STORE_URL = "https://apps.apple.com/us/app/bus-traffic-fever/id6759763476";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=jp.co.goodroid.hyper.busflow";
export const DOWNLOAD_COUNT = "1M+";
export const RATING_VALUE = "4.8";
export const RATING_COUNT = "1000000";
export const OG_IMAGE = "/Bus-Traffic-Fever.jpg";

export const gameDescription =
  "Bus Traffic Fever is a parking jam puzzle where every bus move matters. Clear traffic, collect passengers, and solve satisfying color-sorting brain teasers.";

export const gameKeywords = [
  "Bus Traffic Fever",
  "Bus Traffic Fever walkthrough",
  "Bus Traffic Fever level guide",
  "Bus Traffic Fever solution",
  "Bus Traffic Fever tips",
  "parking jam puzzle",
  "bus puzzle game",
  "color sorting puzzle",
  "GOODROID,Inc.",
];

export function canonical(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const withSlash = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return `${SITE_URL}${withSlash}`;
}
