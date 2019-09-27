let http = require('http');
let proxy = require('http-proxy');

let proxyServer = proxy.createProxyServer({target:'http://localhost/'});
proxyServer.listen(9191);

let server = http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write('Proxy Request was Successful!' + '\n' + JSON.stringify(req.headers, true, 2));

    res.end();

});
server.listen(9898);