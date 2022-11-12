const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "User Info",
    type: 2,
    run: async (client, interaction, config, db) => {

        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Joined server/discord handler:
        const joinedAgoCalculator = {
            fetch: {
                user(userInput, type) {
                    if (!userInput) throw new ReferenceError('Kullanıcının hesaplamasını sağlamadınız.');

                    if (type === "discord") {
                        const joinedDiscordTimestampInNumber = new Date().getTime() - userInput.createdTimestamp;
                        const joinedDiscordTimestampInString = moment(userInput.user.createdAt).fromNow();

                        return joinedDiscordTimestampInString.toString(); // Just making sure it's string.
                    } else if (type === "server") {
                        const joinedServerTimestampInNumber = new Date().getTime() - userInput.joinedTimestamp;
                        const joinedServerTimestampInString = moment(userInput.joinedAt).fromNow();

                        return joinedServerTimestampInString.toString(); // Just making sure it's string.
                    } else throw new ReferenceError('Geçersiz tür. Yalnızca "discord" veya "sunucu" kullanın.');
                }
            }
        };

        // Bot type handler:
        const bot = {
            true: "Evet",
            false: "Hayır"
        };

        // Acknowledgements handler:
        // L for Dyno developers
        const acknowledgements = {
            fetch: {
                user(userInput) {
                    let result;

                    try {
                        if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Sunucu Üyesi";
                        if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "Sunucu Moderatörü";
                        if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "Sunucu Yöneticisi";
                        if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "Sunucu Yöneticisi";
                        if (userInput.id === interaction.guild.ownerId) result = "Sunucu Sahibi";

                    } catch (e) {
                        result = "Server Member";
                    };

                    return result;
                }
            }
        };

        // Finals:
        return interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${user.user.tag}'s information:`)
                        .setThumbnail(user.displayAvatarURL(
                            {
                                dynamic: true
                            }
                        ))
                        .addFields(
                            {
                                name: "Full name",
                                value: `${user.user.tag}`,
                                inline: true
                            },
                            {
                                name: "Identification",
                                value: `\`${user.id}\``,
                                inline: true
                            },
                            {
                                name: `Roles [${user.roles.cache.size - 1}]`, // Use "-1" because we removed the "@everyone" role 
                                value: `${user.roles.cache.map((ROLE) => ROLE).join(' ').replace('@everyone', '') || "[No Roles]"}`,
                                inline: true
                            },
                            {
                                name: "Joined server at",
                                value: `${new Date(user.joinedTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "server")})`,
                                inline: true
                            },
                            {
                                name: "Joined Discord at",
                                value: `${new Date(user.user.createdTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "discord")})`,
                                inline: true
                            },
                            {
                                name: "A Bot?",
                                value: `${bot[user.user.bot]}`,
                                inline: true
                            },
                            {
                                name: "Acknowledgements",
                                value: `${acknowledgements.fetch.user(user)}`
                            }
                        )
                        .setColor('Blue')
                ],
                ephemeral: true
            }
        );

    },
};
