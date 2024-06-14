const http = require('http');
const url = require('url');
const Promise = require('promise');

const checkSiteAvailability = (uri) => {
  const address = url.parse(uri);
  const parts = uri.split('/');
  const options = {
    host: address.protocol !== null ? address.host : parts[0],
    method: 'HEAD',
    path: address.protocol !== null ? address.pathname : parts.slice(1).join('/'),
    port: 443
  };

  const req = http.request(options);
  req.end();

  return new Promise((resolve) => {
    let connected = false;
    req.on('response', (res) => {
      connected = res.statusCode < 500;
      resolve(connected);
    });

    req.on('error', () => {
      resolve(false);
    });
  });
};

module.exports = checkSiteAvailability;
