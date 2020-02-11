const Discord = require("discord.js")

module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if (!message.member.voiceChannel) return message.channel.send(await client.string(message.guild.id, "music.nochannel"));

    if (!message.guild.me.voiceChannel) return message.channel.send(await client.string(message.guild.id, "music.notconnenct"));

    if (message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send(await client.string(message.guild.id, "music.samechannel"));

    message.guild.me.voiceChannel.leave();

    message.channel.send(await client.string(message.guild.id, "music.disconect"));
}