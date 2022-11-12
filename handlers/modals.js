const fs = require("fs");
const colors = require("colors");

module.exports = (client, config) => {
    console.log("0------------------| Modals Handler:".blue);

    const modals = fs.readdirSync(`./modals/`).filter(file => file.endsWith('.js'));

    for (let file of modals) {

        let pull = require(`../modals/${file}`);
        if (pull.id) {
            client.modals.set(pull.id, pull);
            console.log(`[HANDLER - MODALS] Yüklenen Dosya: ${file}`.brightGreen)
        } else {
            console.log(`[HANDLER - MODALS] ${file} dosyası yüklenemedi. Eksik mod kimliği.`.red)
            continue;
        }
    }
};
