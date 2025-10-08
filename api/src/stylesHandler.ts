import { cssHomePage } from "./cssHomePage.js";

const cssHomePageStyles = cssHomePage();
export function stylesHandler(res: any) {
  res.writeHead(200, { "Content-Type": "text/css" });
  return "";
}
