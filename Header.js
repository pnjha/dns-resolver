const _ = require("lodash");

/*
refer https://datatracker.ietf.org/doc/html/rfc1035#section-4.1.1

The header contains the following fields:

                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      ID                       |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |QR|   Opcode  |AA|TC|RD|RA|   Z    |   RCODE   |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    QDCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ANCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    NSCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ARCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

ID              A 16 bit identifier assigned by the program that
                generates any kind of query.  This identifier is copied
                the corresponding reply and can be used by the requester
                to match up replies to outstanding queries.

QR              A one bit field that specifies whether this message is a
                query (0), or a response (1).

OPCODE          A four bit field that specifies kind of query in this
                message.  This value is set by the originator of a query
                and copied into the response.  The values are:

                0               a standard query (QUERY)

                1               an inverse query (IQUERY)

                2               a server status request (STATUS)

                3-15            reserved for future use

RCODE           Response code - this 4 bit field is set as part of
                responses.  The values have the following
                interpretation:

                0               No error condition

                1               Format error - The name server was
                                unable to interpret the query.

                2               Server failure - The name server was
                                unable to process this query due to a
                                problem with the name server.

                3               Name Error - Meaningful only for
                                responses from an authoritative name
                                server, this code signifies that the
                                domain name referenced in the query does
                                not exist.

                4               Not Implemented - The name server does
                                not support the requested kind of query.

                5               Refused - The name server refuses to
                                perform the specified operation for
                                policy reasons.  For example, a name
                                server may not wish to provide the
                                information to the particular requester,
                                or a name server may not wish to perform
                                a particular operation (e.g., zone
                                transfer) for particular data.

                6-15            Reserved for future use.

*/

class Header {
  constructor(options) {
    this.id = parseInt(process.env.HEADER_ID, 10);
    this.z = 0;
    this.qr = _.get(options, "qr", 0b0);
    this.opcode = _.get(options, "opcode", 0b0);
    this.aa = _.get(options, "aa", 0b0);
    this.tc = _.get(options, "tc", 0b0);
    this.rd = _.get(options, "rd", 0b1);
    this.ra = _.get(options, "ra", 0b0);
    this.rcode = _.get(options, "rcode", 0b0);
    this.qdcount = _.get(options, "qdcount", 0x0001);
    this.ancount = _.get(options, "ancount", 0x0000);
    this.nscount = _.get(options, "nscount", 0x0000);
    this.arcount = _.get(options, "arcount", 0x0000);
  }
  get header_hex() {
    let header = this.id.toString(16).padStart(4, "0");
    header += (
      (this.qr << 15) +
      (this.opcode << 11) +
      (this.aa << 10) +
      (this.tc << 9) +
      (this.rd << 8) +
      (this.ra << 7) +
      (this.z << 4) +
      this.rcode
    )
      .toString(16)
      .padStart(4, "0");
    header += this.qdcount.toString(16).padStart(4, "0");
    header += this.ancount.toString(16).padStart(4, "0");
    header += this.nscount.toString(16).padStart(4, "0");
    header += this.arcount.toString(16).padStart(4, "0");
    return header;
  }
}

module.exports = Header;
