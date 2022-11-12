const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');
const colors = require("colors");

// Creating a new client:
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  presence: {
    activities: [{
      name: "DrxMaxi#1337 Beni Geliştiriyor!",
      type: 0
    }],
    status: 'dnd'
  }
});

// Host the bot:
require('http').createServer((req, res) => res.end('Ready.')).listen(3000);

// Getting the bot token:
const AuthenticationToken = process.env.TOKEN || config.Client.TOKEN;
if (!AuthenticationToken) {
  console.warn("[CRASH] Discord botu için Kimlik Doğrulama Simgesi gereklidir! Envrionment Secrets veya config.js kullanın.".red)
  return process.exit();
};

// Handler:
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();

module.exports = client;

["prefix", "application_commands", "modals", "events", "mongoose"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});

// Login to the bot:
client.login(AuthenticationToken)
  .catch((err) => {
    console.error("[CRASH] Bota bağlanırken bir şeyler ters gitti...");
    console.error("[CRASH] Discord API'sinden Hata:" + err);
    return process.exit();
  });

// Handle errors:
process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] İşlenmeyen Red: ${err}`.red);
  console.error(promise);
});
