require("dotenv").config();
const _ = require("lodash");
const Header = require("./Header");
const Question = require("./Question");
const { binaryToHex, hexToBinary } = require("./common");

async function resolve(domainName) {
  if (_.isEmpty(domainName)) {
    throw new Error("domain name cannot be empty");
  }
  const header = new Header({});
  const headerHex = header.header_hex;
  const question = new Question({ domain: domainName });
  const questionHex = question.question_hex;
  const query = `${headerHex}${questionHex}`;
  console.log(query);
  // console.log(query.length);
  // console.log(binaryToHex(query));

  // console.log(question.decodeDomainHex("03c9bb98367dfbf3ecca078f7ed00"));
  console.log(question.encoded_domain);
  console.log(question.decodeDomainHex(question.encoded_domain));
}

// ("0016 0100 0001 0000 0000 0000 03c9bb98367dfbf3ecca078f7ed00 0001 0001");
// ("0016 0100 0001 0000 0000 0000 03646e7306676f6f676c6503636f6d00 0001 0001");
// ("0016 0100 0001 0000 0000 0000 03646e7306676f6f676c6503636f6d00 0001 0001");
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
