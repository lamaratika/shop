import type { Server } from "http";
import { createServer } from "http";
import { requestListener } from "./requestListener.js";

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit the process to avoid undefined state
});

process.on("unhandledRejection", (reason, promise) => {
  // eslint-disable-next-line no-console
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit the process to avoid undefined state
});

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
