import type { Server } from 'http';
const http = require('http');

function main(): Server {
  const port = Number(process.env.PORT ?? 3000);

  const server: Server = http.createServer((req: any, res: any) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello from API server\n');
  });

  // Start listening synchronously (no await). Caller receives the Server instance.
  server.listen(port);

  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);

  return server;
}

// CommonJS export so this file works with the project's current "type": "commonjs"
module.exports = { main };
