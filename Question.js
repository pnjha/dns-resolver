const _ = require("lodash");

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
      const labelLengthHex = label.length.toString(16).padStart(2, "0");
      let labelHex = "";
      for (let i = 0; i < label.length; i++) {
        labelHex += label.charCodeAt(i).toString(16).padStart(2, "0");
      }
      encodedDomain += labelLengthHex + labelHex;
    }
    encodedDomain += (0).toString(16).padStart(2, "0");
    return encodedDomain;
  }
  decodeDomainHex(encodedDomainHex) {
    let domain = "";
    for (let i = 0; i < encodedDomainHex.length; ) {
      const length = parseInt(encodedDomainHex.substring(i, i + 2), 16);
      if (length === 0) {
        break;
      }
      const labelHex = encodedDomainHex.substring(i + 2, i + 2 + length * 2);
      for (let j = 0; j < labelHex.length; j += 2) {
        domain += String.fromCharCode(parseInt(labelHex.substring(j, j + 2), 16));
      }
      domain += ".";
      i += 2 + length * 2;
    }
    return domain;
  }
  get question_hex() {
    return `${this.encoded_domain}${this.qtype.toString(16).padStart(4, "0")}${this.qclass
      .toString(16)
      .padStart(4, "0")}`;
  }
}

module.exports = Question;
