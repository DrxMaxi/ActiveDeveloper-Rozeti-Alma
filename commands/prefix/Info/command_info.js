const { EmbedBuilder, codeBlock } = require("discord.js"); 

module.exports = {
  config: {
    name: "info",
    description: "Bir komutun bilgilerini alın.",
    usage: "info [command]",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    if (!args[0]) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Lütfen bir komut adı girin.")
          .setColor("Red")
      ]
    });

    const command = client.prefix_commands.get(args[0].toLowerCase());

    if (!command) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Üzgünüm, ancak bu komut mevcut değil.")
          .setColor("Red")
      ]
    });

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Command Information: ${command.config.name.toUpperCase()}`)
          .addFields(
            { name: 'Açıklama:', value: command.config.description || "Açıklama yapılmadı." },
            { name: 'Kullanım:', value: command.config.usage ? codeBlock('txt', command.config.usage) : "Kullanım sağlanmadı." },
            { name: 'İzinler:', value: command.permissions.join(", ") },
            { name: 'Developerlara Özel mi?', value: command.owner ? 'Evet' : 'Hayır' }
          )
          .setColor("Blue")
      ]
    });
    
  },
};
