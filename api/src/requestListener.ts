import { badRequestHandler, unknownHandler } from "./badRequestHandler.js";
import { errorHandler } from "./errorHandler.js";
import { faviconHandler } from "./faviconHandler.js";
import { healthHandler } from "./healthHandler.js";
import { indexHandler } from "./indexHandler.js";
import { logRequest, logResponse } from "./logRequest.js";
import { notFoundHandler } from "./notFoundHandler.js";
import { stylesHandler } from "./stylesHandler.js";

export function requestListener(req: any, res: any) {
  logRequest(req);
  switch (req.method) {
    case "GET":
    case "POST":
    case "PUT":
    case "DELETE":
    case "PATCH":
  }

  let response = "";

  switch (req.url) {
    case "/":
    case "/index":
      response = indexHandler(res);
      break;
    case "/favicon.ico":
      response = faviconHandler(res);
      break;
    case "/styles.css":
      response = stylesHandler(res);
      break;
    case "/health":
      response = healthHandler(res);
      break;
    case "/not-found":
      response = notFoundHandler(res);
      break;
    case "/error":
      response = errorHandler(res);
      break;
    default:
      badRequestHandler(res);
      unknownHandler(res);
      break;
  }

  logResponse(res);

  res.end(response);
}
