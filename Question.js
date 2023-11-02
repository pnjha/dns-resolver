const _ = require("lodash");
const { hexToBinary } = require("./common");

class Question {
  constructor(options) {
    this.domain = options.domain;
    this.qtype = _.get(options, "qtype", 0x0001); // https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.2
    this.qclass = _.get(options, "qclass", 0x0001); // https://datatracker.ietf.org/doc/html/rfc1035#section-3.2.4
  }
  get encoded_domain() {
    const labels = this.domain.split(".");
    let encodedDomain = "";
    for (const label of labels) {
      const labelLengthBinary = label.length.toString(16).padStart(2, "0");
      let labelBinary = "";
      for (let i = 0; i < label.length; i++) {
        labelBinary += label.charCodeAt(i).toString(16).padStart(2, "0");
      }
      encodedDomain += labelLengthBinary + labelBinary;
    }
    encodedDomain += (0).toString(16).padStart(2, "0");
    return encodedDomain;
  }
  decodeDomainHex(encodedDomainHex) {
    const domainBin = hexToBinary(encodedDomainHex);
    let domain = "";
    for (let i = 0; i < domainBin.length; ) {
      const length = parseInt(domainBin.substring(i, i + 8), 2);
      console.log(length);

      const labelBin = domainBin.substring(i + 8, i + 8 + length * 8);
      console.log(labelBin);
      for (let j = 0; j < labelBin.length; j += 8) {
        console.log(parseInt(labelBin.substring(j, j + 8), 2));
        domain += String.fromCharCode(parseInt(labelBin.substring(j, j + 8), 2));
      }
      domain += ".";
      i += 8 + length * 8;
    }
    return domain;
  }
  get question_hex() {
    const encodedDomain = this.encoded_domain;
    return `${encodedDomain.toString(16)}${this.qtype.toString(16).padStart(4, "0")}${this.qclass
      .toString(16)
      .padStart(4, "0")}`;
  }
}

module.exports = Question;
