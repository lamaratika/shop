import { homePage } from "./getHomepagePath.js";

export function shopIndexHandler(res: any) {
  res.writeHead(200, { "Content-Type": "text/html" });
  return homePage;
}
