import type { Server } from "http";
import { createServer } from "http";
import { resolve, normalize } from "path";
import pug from "pug";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

function getHomepagePath(folder: string): string {
  const viewsPath = normalize(resolve(folder, "../views"));
  const homePagePath = viewsPath + "/home/index.pug";
  return homePagePath;
}
const __dirname = dirname(fileURLToPath(import.meta.url));
const homePagePath = getHomepagePath(__dirname);

const homePage = pug.compileFile(homePagePath, { pretty: true })({
  title: "Home",
});

function healthHandler(res: any) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok" }));
}

function notFoundHandler(res: any) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

function indexHandler(res: any) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(homePage);
}

function faviconHandler(res: any) {
  res.writeHead(204);
  res.end();
}

function errorHandler(res: any) {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Internal Server Error" }));
}

function cssHomePage(): string {
  return `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  header {
    background-color: #4CAF50;
    color: white;
    padding: 10px 0;
    text-align: center;
  }
  main {
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
  }
  h1 {
    color: #4CAF50;
  }
  a {
    color: #4CAF50;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  footer {
    text-align: center;
    padding: 10px 0;
    background-color: #f4f4f4;
    color: #777;
    position: fixed;
    width: 100%;
    bottom: 0;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  }
  `;
}
const cssHomePageStyles = cssHomePage();

console.log("stzles", cssHomePageStyles);

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
    case "/styles.css":
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(cssHomePageStyles);
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
