const mongoose = require('mongoose');
const config = require("../config/config.js");
const colors = require("colors");

module.exports = (client) => {
	console.log("[DATABASE] MongoDB'ye bağlanmaya başlandı...".brightYellow);
	const mongo = process.env.MONGO || config.Handlers.MONGO;
	
	if (!mongo) {
		console.log("[WARN] Bir Mongo URI/URL sağlanmadı! (Gerekli değil)".red);
	} else {
		mongoose.connect(mongo, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).catch((e) => console.log(e))

		mongoose.connection.once("open", () => {
			console.log("[DATABASE] MongoDB'ye bağlandı!".brightGreen);
		})
		return;
	}
}
