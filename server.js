const http = require('http')

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('X-Powered-By', 'NodeJS')
    const { url, method } = request
    // if (method == "GET") {
    //     response.end('Hello')
    // }
    // if (method == "POST") {
    //     let body = []
    //     request.on('data', (chunk) => {
    //         body.push(chunk)
    //     })
    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString()
    //         const name = JSON.parse(body)
    //         response.end(`Hai, ${body}`)
    //     })
    // }
    // if (method == "POST") {
    //     response.end('Bonjour')
    // }
    if (url == "/") {
        if (method == "GET") {
            response.statusCode = 200
            response.end(JSON.stringify({
                message: "Ini adalah homepage"
            }))
        }
        else {
            response.statusCode = 400
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan request ${method}`
            }))
        }
    }
    else if (url == "/about") {
        if (method == "GET") {
            response.statusCode = 200
            response.end(JSON.stringify({
                message: "Halo! ini adalah halaman about"
            }))
        }
        else if (method == "POST") {
            let body = []
            request.on('data', (chunk) => {
                body.push(chunk)
            })
            request.on('end', () => {
                body = Buffer.concat(body).toString()
                const { name } = JSON.parse(body)
                response.statusCode = 200
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`
                }))
            })
        }
        else {
            response.statusCode = 400
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan request ${method}`
            }))
        }
    }
    else {
        response.statusCode = 404
        response.end(JSON.stringify({
            message: "Halaman tidak ditemukan!"
        }))
    }
}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`)
})