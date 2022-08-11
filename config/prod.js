const path  = require("path");
const extensions = require("./extensions");

const devConfig = {
    remoteServer:"https://yourdomian.com",
    startDirectory: "./files",  // Tipo de Dir do sys
    extensions,
    symetricKeyPath: path.join(__dirname, "..", "secret.key"),
    privateKeyPath: path.join(__dirname, "..", "private.key"),
    passphrasePath: path.join(__dirname, "..", "passphrase.key") 

};

module.exports = devConfig;