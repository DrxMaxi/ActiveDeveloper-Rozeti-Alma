const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "prefix",
    description: "Sunucu için Prefix belirleyin.",
    usage: "prefix [yeni prefix]"
  },
  permissions: ['Administrator'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    if (!args[0]) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Eksik argüman")
        .setDescription("Lütfen yeni bir Prefix sağlayın!")
    ]});

    if (args[0].length > 5) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Eksik argüman")
        .setDescription("Üzgünüz, ancak yeni Prefix uzunluğu 5 karakterden fazla olmamalıdır!")
    ]});

    const newPrefix = await db.set(`guild_prefix_${message.guild.id}`, args[0]);

    const finalEmbed = new EmbedBuilder()
      .setTitle("Başarılı!")
      .setDescription(`Sunucunun Yeni Prefix'i: \`${newPrefix}\`.`)
      .setColor("Green");

    return message.reply({ embeds: [finalEmbed] });
    
  },
};
