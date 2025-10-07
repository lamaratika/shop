import http from "node:http"

function main() {
    console.log("test")

    const server = http.createServer()

    server.listen(3000, () => {
        console.log("Server listening on port 3000")
    })
}

main()