/* import http from 'http'; // importing the built-in http module
const server = http.createServer((request, response) => {
    response.end("Hello NodeJS");
});

server.listen(3001, '127.0.0.1', () => {
    console.log("Server started on PORT :3001");
}); */

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Ebal Baranov.');
});

app.post('/', (req, res) => {
    res.send('Got the POST request.');
});

app.put('/', (req, res) => {
    res.send('Got the PUT request at /user.');
});

app.delete('/', (req, res) => {
    res.send('Got the DELETE request at /user.');
});

app.listen(port, () => {
    console.log('Example app listening on port ', port);
});