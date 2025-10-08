export function unknownHandler(res: any) {
  res.writeHead(404, { "Content-Type": "application/json" });
  return JSON.stringify({ error: "Unknown Request" });
}
export function badRequestHandler(res: any) {
  res.writeHead(400, { "Content-Type": "application/json" });
  return JSON.stringify({ error: "Bad Request" });
}
