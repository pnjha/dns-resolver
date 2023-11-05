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
  const server = new DnsServer();
  // const responseHex = await server.executeQuery(query);
  const responseHex =
    "00168180000100020000000003646e7306676f6f676c6503636f6d0000010001c00c0001000100000131000408080808c00c0001000100000131000408080404";
  // const responseHex =
  //   "00168080000100020000000003646e7306676f6f676c6503636f6d0000010001c00c0001000100000214000408080808c00c0001000100000214000408080404";
  console.log({ responseHex });
  const { header: deocdedHeader, length: headerLength } = header.decodeHeader(responseHex);
  console.log({ deocdedHeader, headerLength });
  const decodedQuestionSection = question.decodeQuestionHex(responseHex.substring(headerLength, responseHex.length));
  console.log({ decodedQuestionSection });
}
// 00160100000100000000000003646e7306676f6f676c6503636f6d0000010001
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
