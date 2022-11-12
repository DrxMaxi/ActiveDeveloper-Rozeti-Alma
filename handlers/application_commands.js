const client = require("../index");
const { PermissionsBitField, Routes, REST, User } = require('discord.js');
const fs = require("fs");
const colors = require("colors");

module.exports = (client, config) => {
  console.log("0------------------| Application Komutları Handler:".blue);

  let commands = [];

  // Slash commands handler:
  fs.readdirSync('./commands/slash/').forEach((dir) => {
    console.log('[!] Slash komutları yüklenmeye başlandı...'.yellow);
    const SlashCommands = fs.readdirSync(`./commands/slash/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of SlashCommands) {
      let pull = require(`../commands/slash/${dir}/${file}`);

      if (pull.name, pull.description, pull.type == 1) {
        client.slash_commands.set(pull.name, pull);
        console.log(`[HANDLER - SLASH] Yüklenen Dosya: ${pull.name} (#${client.slash_commands.size})`.brightGreen);

        commands.push({
          name: pull.name,
          description: pull.description,
          type: pull.type || 1,
          options: pull.options ? pull.options : null,
          default_permission: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
          default_member_permissions: pull.permissions.DEFAULT_MEMBER_PERMISSIONS ? PermissionsBitField.resolve(pull.permissions.DEFAULT_MEMBER_PERMISSIONS).toString() : null
        });

      } else {
        console.log(`[HANDLER - SLASH] ${file} dosyası yüklenemedi, eksik modül adı değeri, açıklaması veya türü 1 değil.`.red)
        continue;
      };
    };
  });

  // User commands handler:
  fs.readdirSync('./commands/user/').forEach((dir) => {
    console.log('[!] Kullanıcı komutları yüklenmeye başladı...'.yellow);
    const UserCommands = fs.readdirSync(`./commands/user/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of UserCommands) {
      let pull = require(`../commands/user/${dir}/${file}`);

      if (pull.name, pull.type == 2) {
        client.user_commands.set(pull.name, pull);
        console.log(`[HANDLER - USER] Yüklenen Dosya: ${pull.name} (#${client.user_commands.size})`.brightGreen);

        commands.push({
          name: pull.name,
          type: pull.type || 2,
        });

      } else {
        console.log(`[HANDLER - USER] ${file} dosyası yüklenemedi, eksik modül adı değeri veya türü 2 değil.`.red)
        continue;
      };
    };
  });

  // Message commands handler:
  fs.readdirSync('./commands/message/').forEach((dir) => {
    console.log('[!] Mesaj komutları yüklenmeye başladı...'.yellow);
    const UserCommands = fs.readdirSync(`./commands/message/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of UserCommands) {
      let pull = require(`../commands/message/${dir}/${file}`);

      if (pull.name, pull.type == 3) {
        client.message_commands.set(pull.name, pull);
        console.log(`[HANDLER - MESSAGE] Yüklenen Dosya: ${pull.name} (#${client.user_commands.size})`.brightGreen);

        commands.push({
          name: pull.name,
          type: pull.type || 3,
        });

      } else {
        console.log(`[HANDLER - MESSAGE] ${file} dosyası yüklenemedi, eksik modül adı değeri veya türü 2 değil.`.red)
        continue;
      };
    };
  });

  // Registering all the application commands:
  if (!config.Client.ID) {
    console.log("[CRASH] config.js'de bot idnizi sağlamanız gerekir!".red + "\n");
    return process.exit();
  };

  const rest = new REST({ version: '10' }).setToken(config.Client.TOKEN || process.env.TOKEN);

  (async () => {
    console.log('[HANDLER] Tüm uygulama komutlarını kaydetmeye başlandı.'.yellow);

    try {
      await rest.put(
        Routes.applicationCommands(config.Client.ID),
        { body: commands }
      );

      console.log('[HANDLER] Tüm uygulama komutları başarıyla kaydedildi.'.brightGreen);
    } catch (err) {
      console.log(err);
    }
  })();
};
