const http = require('https');
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('<h2>Hello World, Node!</h2>');
  res.end();
});

server.listen(${port}, () => console.log('Server running...'));
