const { RawKey } = require("@terra-money/terra.js");
const { MnemonicKey } = require("@terra-money/terra.js");
const { randomBytes } = require('crypto');
const { crypto } = require('crypto');

const number = process.argv[2]

for (i = 1; i <= number; i++) {
    const MNE_KEY_RANDOM = new MnemonicKey();

    console.log()
    console.log("Mnemonic:", MNE_KEY_RANDOM.mnemonic)
    console.log("PrivateKey:", MNE_KEY_RANDOM.privateKey)
    console.log("Address:", MNE_KEY_RANDOM.accAddress);
}
