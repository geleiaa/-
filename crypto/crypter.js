"use strict";
const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const Provider = require("../utils/EnctyptionManager");

// recebe a pub-key
const createCipher = publicKey => {
    // vetor de inicialização + chave
    var IV = Buffer.alloc(16), KEY = crypto.randomBytes(32);

    // randomização do valor IV
    IV = Buffer.from(
        Array.prototype.map.call(IV, () => {
            return Math.floor(Math.random() * 256);
        })
    );

    KEY = KEY.toString("hex").slice(0, 32); 
    IV = IV.toString("hex").slice(0, 16);
    
    const symetricKey = `${IV}:${KEY}`;

    const provider = new Provider();
    provider.importPublicKey(publicKey);
    provider.saveSymtricKey(symetricKey);
    return crypto.createCipheriv(algorithm, KEY, IV);
};

module.exports = createCipher;

//-9