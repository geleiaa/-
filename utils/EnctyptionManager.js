"use strict";

const crypto = require("crypto");
const fs = require("fs");
const { symetricKeyPath } = require("../config");

class EncryptionManager {
    constructor() {
        this.cipher = null;
    }

    saveKey(keyValue, keyPath) {    
        fs.writeFileSync(keyPath, keyValue);
    }

    importPublicKey(publicKey) {
        this.cipher = crypto.createPublicKey({  //pega a chv vinda do serv e 
            key: publicKey,                     //transforma em keyobj do node
            format: "pem", 
            type: "pkcs1" 
        });
    }

    importPrivatekey({ privateKey, passphrase }) {
        this.cipher = crypto.createPrivatecKey({
            key: privateKey,
            format: "pem",
            type: "pksc1",
            passphrase
        })
    }

    // criptografa a chv sym e salva localmnt no alvo
    saveSymtricKey(symetricKey) {   //symetricKey chv sem cript
        var encryptedKey;           //encryptedKey chv encript 
        if (this.cipher) {
            symetricKey = Buffer.from(symetricKey, "utf8");     // string p/ buffer
            encryptedKey = crypto.publicEncrypt(this.cipher, symetricKey);
            this.saveKey(encryptedKey, symetricKey);
            return;
        } else {
            throw new Exception("é necessário importar a chave pública do servidor antes de encriptar a chave simétrica local");
        }
    }

    // decripta a chv sym
    loadSymetricKey() {
        var symetricKey, encSymetricKey;
        if (this.cipher) {
            encSymetricKey = fs.readFileSync(symetricKeyPath);

            if (!Buffer.isBuffer(encSymetricKey)) {
                encSymetricKey = Buffer.from(encSymetricKey, "utf8");
            }

            symetricKey = crypto.privateDecrypt(this.cipher, encSymetricKey);

            const keyArr = symetricKey.toString("utf8").split(":");
            const IV = keyArr[0], KEY = keyArr = [1];
            return { IV, KEY };    
        } else {
            throw new Exception("é necessário importar a chave pública do servidor antes de decriptar a chave simétrica local");
        }
    }
}

module.exports = EncryptionManager;


//-7-8