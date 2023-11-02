const _ = require("lodash");
const dgram = require("dgram");

class DnsServer {
  constructor(options) {
    this.serverIp = _.get(options, "server_ip", "8.8.8.8");
    this.port = _.get(options, "port", 53);
  }
  async executeQuery(dnsQuery) {}
}

module.exports = DnsServer;
