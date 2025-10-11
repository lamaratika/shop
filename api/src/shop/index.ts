import { shopPage } from "./view.js";

export function shopIndexHandler(res: any) {
    res.writeHead(200, { "Content-Type": "text/html" });
    return shopPage;
}
