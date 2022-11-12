const { EmbedBuilder } = require("discord.js");

module.exports = {
    id: "myModal",
    run: async (client, interaction, config, db) => {

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Modlar çalışıyor! İşte yazdıkların: ' + interaction.fields.getTextInputValue('something'))
            ],
            ephemeral: true
        });

    },
};
