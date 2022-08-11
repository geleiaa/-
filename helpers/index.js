"use strict"
const Env = use("Env")  // use("") = require("")
const crypto = use("crypto")

const generateKeyPair = () => {  // pesq: generateKeyPair
    const passphrase = Env.get("APP_KEY"); // ransom-jeiesi/c2-server/ arqv .env 
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEnconding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEnconding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase
        }
    });

    return { publicKey, privateKey, passphrase };
};

module.exports = { 
    generateKeyPair 
};


/*
$npm i -g @adonisjs/cli
$adonis new c2-server --api-only (app somente api)
ransom-jeiesi/c2-server/helpers/index.js
*/

//-15