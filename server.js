const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.end('Server running...');
});

server.listen(PORT, () => {
    console.log('server listening on port', PORT);
});
