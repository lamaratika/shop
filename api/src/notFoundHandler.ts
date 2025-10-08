export function notFoundHandler(res: any) {
  res.writeHead(404, { "Content-Type": "application/json" });
  return JSON.stringify({ error: "Not Found" });
}
