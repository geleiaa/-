const fs = require("fs");

// define como os arqv sao encriptados
const worker = (file, cipher) => {
    var chunckSize = 512, // pedaço do arquivo (em bytes) a ser encriptado 
        position = 0,     // posição lida no arqv
        bytesRead = 0,
        buffer = Buffer.alloc(chunckSize);

    // pesq: filedescr, openSync & readSync

    const fileDescriptor = fs.openSync(file, "rs+"); // abrir arqv de forma syncr
    
    bytesRead = fs.readSync(fileDescriptor, buffer, 0, chunckSize, position);

    while (bytesRead > 0){ // loop de leitura do arquivo
        // encripta o conteudo lido do arquivo
        var content = cipher.update(buffer);

        // escreve (sync) os dados processados dentro do arquivo
        const wc = fs.writeSync(fileDescriptor, content, 0, content.length, position);

        position += wc;
        // le a qnt de bytes p/ a func ser true
        bytesRead = fs.readSync(fileDescriptor, buffer, 0, chunckSize, position); // encerra o loop
    }

    fs.closeSync(fileDescriptor);   // saiu do while fecha o arquivo

};

module.exports = worker;

//-11
