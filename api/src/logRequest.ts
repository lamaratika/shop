export function logRequest(req: any) {
    console.info(`${req.method} ${req.url}`);
}
export function logResponse(res: any) {
    console.info(`Response: ${res.statusCode}`);
}
