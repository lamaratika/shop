export function errorHandler(res: any) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return JSON.stringify({ error: "Internal Server Error" });
}
