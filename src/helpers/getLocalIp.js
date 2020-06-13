const os = require('os')
const ifaces = os.networkInterfaces();

let address
for (var dev in ifaces) {
  var iface = ifaces[dev].filter(function(details) {
      return details.family === 'IPv4' && details.internal === false;
  });
  if(iface.length > 0) address = iface[0].address;
}

module.exports = address