import type { Server } from 'http';
import { createServer} from 'http';

// Main function to start the server. Returns the Server instance.
function main(): Server {
  const port = Number(process.env.PORT ?? 3000);

  const server: Server = createServer((req: any, res: any) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');



    if (req.url === '/health') {
      res.end('OK');
    } else {
      res.end('Hello, World!\n');
    }
  });

  // Start listening synchronously (no await). Caller receives the Server instance.
  server.listen(port);

  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);

  return server;
}

export { main };