"use strict";
const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const encryptioProvider = require("../utils/EnctyptionManager");

const decipher = privateKey => {
    const provider = new encryptioProvider();
    provider.importPrivatekey(privateKey);
    const { IV, KEY } = provider.loadSymetricKey();
    return Crypto.createDecipheriv(algorithm, KEY, IV);
};

module.exports = decipher;

//-10