import { homePage } from "./getHomepagePath.js";

export function indexHandler(res: any) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(homePage);
}
