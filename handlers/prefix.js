const fs = require("fs");
const colors = require("colors");

module.exports = (client, config) => {
  console.log("0------------------| Prefix Handler:".blue);

  fs.readdirSync('./commands/prefix/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/prefix/${dir}`).filter(file => file.endsWith('.js'));
    for (let file of commands) {

      let pull = require(`../commands/prefix/${dir}/${file}`);
      if (pull.config.name) {
        client.prefix_commands.set(pull.config.name, pull);
        console.log(`[HANDLER - PREFIX] Yüklenen Dosya: ${pull.config.name} (#${client.prefix_commands.size})`.brightGreen)
      } else {
        console.log(`[HANDLER - PREFIX] ${file} dosyası yüklenemedi, modül adı değeri eksik.`.red)
        continue;
      };

    };
  });
};
