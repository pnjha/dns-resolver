function binaryToHex(binData) {
  let data = binData;
  const dataLength = binData.length;
  const padLength = dataLength % 4;
  if (padLength !== 0) {
    data = data.padStart(dataLength + 4 - padLength, "0"); // why is conversion needed? why is this padding not causing any issue?
  }
  let hexData = "";
  for (let i = 0; i < data.length; i += 4) {
    const str = data.substr(i, 4);
    hexData += parseInt(str, 2).toString(16);
  }
  return hexData;
}

function hexToBinary(hexData) {
  let binData = "";
  for (let i = 0; i < hexData.length; i += 1) {
    binData += parseInt(hexData[i], 16).toString(2);
  }
  return binData;
}

module.exports = {
  binaryToHex,
  hexToBinary
};
