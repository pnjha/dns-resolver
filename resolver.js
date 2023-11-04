require("dotenv").config();
const _ = require("lodash");
const Header = require("./Header");
const Question = require("./Question");
const DnsServer = require("./DnsServer");

async function resolve(domainName) {
  if (_.isEmpty(domainName)) {
    throw new Error("domain name cannot be empty");
  }
  const header = new Header({});
  const headerHex = header.header_hex;
  const question = new Question({ domain: domainName });
  const questionHex = question.question_hex;
  const query = `${headerHex}${questionHex}`;
  console.log(question.encoded_domain);
  console.log(question.decodeDomainHex(question.encoded_domain));
  const server = new DnsServer();
  const responseHex = await server.executeQuery(query);
  console.log(responseHex);
}

async function run() {
  const domainName = process.argv[2];
  const ip = await resolve(domainName);
  console.log(`Domain Name: ${domainName}; IP address: ${ip}`);
}

run()
  .then()
  .catch((err) => {
    console.log(`resolution failed due to err ${err}`);
  });
