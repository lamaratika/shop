import type { Server } from "http";
import { createServer } from "http";
import { cssHomePage } from "./cssHomePage.js";
import { errorHandler } from "./errorHandler.js";
import { faviconHandler } from "./faviconHandler.js";
import { indexHandler } from "./indexHandler.js";
import { notFoundHandler } from "./notFoundHandler.js";
import { healthHandler } from "./healthHandler.js";

const cssHomePageStyles = cssHomePage();

function logRequest(req: any) {
  console.info(`${req.method} ${req.url}`);
}

function logResponse(res: any) {
  console.info(`Response: ${res.statusCode}`);
}

function unknownHandler(res: any) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

function stylesHandler(res: any) {
  res.writeHead(200, { "Content-Type": "text/css" });
  return "";
}

function badRequestHandler(res: any) {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Bad Request" }));
}

function requestListener(req: any, res: any) {
  logRequest(req);
  switch (req.method) {
    case "GET":
      break;
    case "HEAD":
      res.writeHead(200);
      return;
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
    case "/favicon.ico":
      response = faviconHandler(res);
    case "/styles.css":
      response = stylesHandler(res);
      return;
    case "/health":
      response = healthHandler(res);
      return;
    case "/not-found":
      response = notFoundHandler(res);
    case "/error":
      response = errorHandler(res);
    default:
      badRequestHandler(res);
      logResponse(res);
      unknownHandler(res);
  }
}

// Main function to start the server. Returns the Server instance.
function main(): Server {
  const port = Number(process.env.PORT ?? 3000);

  const server: Server = createServer(requestListener);

  // Start listening synchronously (no await). Caller receives the Server instance.
  server.listen(port);

  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);

  return server;
}

export { main };
