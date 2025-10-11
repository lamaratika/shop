import { badRequestHandler, unknownHandler } from "./badRequestHandler.js";
import { errorHandler } from "./errorHandler.js";
import { faviconHandler } from "./faviconHandler.js";
import { healthHandler } from "./healthHandler.js";
import { indexHandler } from "./indexHandler.js";
import { logRequest, logResponse } from "./logRequest.js";
import { notFoundHandler } from "./notFoundHandler.js";
import { stylesHandler } from "./stylesHandler.js";
import { shopIndexHandler } from "./shop/index.js";
import { get} from "./shop/view.js"

export function requestListener(req: any, res: any) {
    let response = "";
    logRequest(req);
    function runSwitchHandlers() {
        switch (req.url) {
            case "/":
            case "/index":
                console.info("Serving index page");
                response = indexHandler(res);
                break;
            case "/favicon.ico":
                console.info("Serving favicon");
                response = faviconHandler(res);
                break;
            case "/globals.css":
                console.info("Serving styles");
                response = stylesHandler(res);
                break;
            case "/styles.css":
                console.info("Serving styles");
                response = stylesHandler(res);
                break;
            case "/health":
                console.info("Serving health check");
                response = healthHandler(res);
                break;
            case "/not-found":
                console.error("Serving not found");
                response = notFoundHandler(res);
                break;
            case "/error":
                console.error("Serving error");
                response = errorHandler(res);
                break;

            /**
             * Shop
             */
            case "/shop":
                console.info("Server shop page");
                response = shopIndexHandler(res);
                break;
            default:
                console.error("Error on request");
                badRequestHandler(res);
                unknownHandler(res);
                break;
        }
    }

    console.info(`Handling ${req.method} request for ${req.url}`);
    try {
        runSwitchHandlers();
        logResponse(res);
    } catch (error) {
        console.error("Error handling request:", error);
        response = JSON.stringify({ error: "Internal Server Error" });
    }

    res.end(response);
}
