export function healthHandler(res: any) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return JSON.stringify({ status: "ok" });
}
