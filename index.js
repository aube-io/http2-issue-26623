const http2   = require('http2');
const https   = require('https');
const fs      = require('fs');

const index   = fs.readFileSync(__dirname + '/index.html').toString();
const options = {
    allowHTTP1 : true,
    key        : fs.readFileSync(__dirname + '/localhost.key.pem'),
    cert       : fs.readFileSync(__dirname + '/localhost.cert.pem')
};

let http2server = http2.createSecureServer(options,(req,res) => {
    if (req.method === 'POST') {
        let count     = 0;
        let chunkSize = 0;
        req.on('data', (chunk) => { 
            count++;
            chunkSize += chunk.length;
            //console.log('data: ' + count + ':' + chunkSize + ':' + chunk.length);
        });
        req.on('end', () => { 
            console.log('end:' + chunkSize);
            res.end('ok');
        });
        req.on('close', () => { console.log('req:close') });
        req.on('error', () => { console.log('req:error') });

    } else if (req.method === 'GET') {
        res.end(index);
    }
}).listen(1337);

https.createServer(options,(req,res) => {
    if (req.method === 'POST') {
        let count     = 0;
        let chunkSize = 0;
        req.on('data', (chunk) => { 
            count++;
            chunkSize += chunk.length;
            //console.log('data: ' + count + ':' + chunkSize + ':' + chunk.length);
        });
        req.on('end', () => { 
            console.log('total: ' + chunkSize)
            console.log('req:end');
            res.end();
        });
        req.on('close', () => { console.log('req:close') });
        req.on('error', () => { console.log('req:error') });
    } else if (req.method === 'GET') {
        res.end(index);
    }
}).listen(1338);


http2server.setTimeout(0);
http2server.on('close',           _ => { console.log('server:close')            });
http2server.on('connect',         _ => { console.log('server:connect')          });
http2server.on('error',           _ => { console.log('server:error')            });
http2server.on('frameError',      _ => { console.log('server:frameError')       });
http2server.on('goaway',          _ => { console.log('server:goaway')           });
http2server.on('localSettings',   _ => { console.log('server:localSettings')    });
http2server.on('ping',            _ => { console.log('server:ping')             });
http2server.on('remoteSettings',  _ => { console.log('server:remoteSettings')   });
http2server.on('checkContinue',   _ => { console.log('server:checkContinue');   });
http2server.on('request',         _ => { console.log('server:request');         });
http2server.on('session',         _ => { console.log('server:session');         });
http2server.on('sessionError',    _ => { console.log('server:sessionError');    });
http2server.on('timeout',         _ => { console.log('server:timeout');         });
http2server.on('unknownProtocol', _ => { console.log('server:unknownProtocol'); });
http2server.on('stream',        (stream) => { 
    stream.on('close',            _ => { console.log('stream:close');           });
    stream.on('connect',          _ => { console.log('stream:connect');         });
    stream.on('error',            _ => { console.log('stream:error');           });
    stream.on('frameError',       _ => { console.log('stream:frameError');      });
    stream.on('goaway',           _ => { console.log('stream:goaway');          });
    stream.on('localSettings',    _ => { console.log('stream:localSettings');   });
    stream.on('ping',             _ => { console.log('stream:ping');            });
    stream.on('remoteSettings',   _ => { console.log('stream:remoteSettings');  });
    stream.on('stream',           _ => { console.log('stream:stream');          });
    stream.on('timeout',          _ => { console.log('stream:timeout');         });
});

