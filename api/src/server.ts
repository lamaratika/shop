import type { Server } from "http";
import { createServer } from "http";

function healthHandler(res: any) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok" }));
}

function notFoundHandler(res: any) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

function indexHandler(res: any) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Welcome to the API" }));
}

function faviconHandler(res: any) {
  res.writeHead(204);
  res.end();
}

function errorHandler(res: any) {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Internal Server Error" }));
}

function requestListener(req: any, res: any) {
  switch (req.method) {
    case "GET":
      break;
    case "HEAD":
      res.writeHead(200);
      res.end();
      return;
    case "POST":
    case "PUT":
    case "DELETE":
    case "PATCH":
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Method Not Allowed" }));
      return;
  }
  switch (req.url) {
    case "/":
    case "/index":
      indexHandler(res);
      return;
    case "/favicon.ico":
      faviconHandler(res);
      return;
    case "/health":
      healthHandler(res);
      return;
    case "/not-found":
      notFoundHandler(res);
      return;
    case "/error":
      errorHandler(res);
      return;
    default:
      notFoundHandler(res);
      break;
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
