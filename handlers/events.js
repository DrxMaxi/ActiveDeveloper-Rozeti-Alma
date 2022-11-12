const fs = require("fs");
const colors = require("colors");

module.exports = (client) => {
  console.log("0------------------| Event Handler:".blue);
  
  fs.readdirSync('./events/').forEach(dir => {
		const commands = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));
		for (let file of commands) {
      
			let pull = require(`../events/${dir}/${file}`);
			if (pull.name) {
				client.events.set(pull.name, pull);
				console.log(`[HANDLER - EVENTS] Yüklenen Dosya: ${pull.name}`.brightGreen)
			} else {
				console.log(`[HANDLER - EVENTS] ${file} dosyası yüklenemedi. Eksik name veya aliases.`.red)
				continue;
			}
      
		}
	});
}