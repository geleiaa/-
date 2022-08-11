const path =  require("path"),

fs = require("fs"),

config = require("../config");
// verificação dos arquivos
function walk(callback) {
    fs.readdir(config.startDirectory, function(err, files) {
        if(!err){
            files.forEach(function(file) {
                var filepath = path.join(config.startDirectory, file);
                fs.stat(filepath, function(err, stats) {    // fs.stat = info de arqv
                    if(!err){
                        if(stats.isDirectory()){    // se for dir = continua verif
                            walk(callback);
                        }else if (stats.isFile()){    // se for file = verif extension                       
                            let ext = path.extname(filepath).replace(".", "");
                            let isWanted = config.extensions.find( wanted => wanted === ext);   // procura extensions
                            if (isWanted) callback(filepath);
                        }
                    }
                })
            })
        }
    })
}

module.exports = walk;

//-4