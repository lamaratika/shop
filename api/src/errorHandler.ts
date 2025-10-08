export function errorHandler(res: any) {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Internal Server Error" }));
}
