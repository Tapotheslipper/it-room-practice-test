import http from 'http'; // importing the built-in http module
const server = http.createServer((request, response) => {
    response.end("Hello NodeJS");
});

server.listen(3001, '127.0.0.1', () => {
    console.log("Server started on PORT :3001");
});