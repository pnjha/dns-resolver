const _ = require("lodash");
const udp = require("dgram");

class DnsServer {
  constructor(options) {
    this.serverIp = _.get(options, "server_ip", "8.8.8.8");
    this.port = _.get(options, "port", 53);
  }
  async executeQuery(dnsQuery) {
    const client = udp.createSocket("udp4");
    const data = Buffer.from(dnsQuery, "hex");
    return new Promise((resolve, reject) => {
      client.send(data, 0, data.length, this.port, this.serverIp, function (error) {
        if (error) {
          console.log(error);
          client.close();
          reject(error);
        } else {
          console.log("Data sent !!!");
          client.on("message", async (msg, info) => {
            console.log(`Received ${msg.length} bytes from ${info.address}:${info.port}`);
            client.close();
            resolve(msg.toString("hex"));
          });
        }
      });
    });
  }
}

module.exports = DnsServer;
