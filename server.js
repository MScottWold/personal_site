const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Basic server for testing on mobile
*/

http.createServer(function (req, res) {
  const baseURL = 'http://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  const filename = '.' + reqUrl.pathname;
  const ext = path.extname(filename);
  console.log('requesting' + filename);
  fs.readFile(filename, function (err, data) {

    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }

    switch (ext) {
      case '.html':
        res.writeHead(200, { 'Content-Type': 'text/html' });
        break;
      case '.js':
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        break;
      case '.css': 
        res.writeHead(200, { 'Content-Type': 'text/css' });
        break;
      case '.jpg': 
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        break;
      case '.png': 
        res.writeHead(200, { 'Content-Type': 'image/vnd.microsoft.icon' });
        break;
      case '.ico': 
        res.writeHead(200, { 'Content-Type': 'image/png' });
        break;
      default:
        res.writeHead(200, { 'Content-Type': 'text/plain' })
    }
    res.write(data);
    return res.end();
  })
}).listen(3000);
console.log('server started')