const Discord = require("discord.js")

module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if (!message.member.voiceChannel) return message.channel.send("You are not connected to a Voice channel!");

    if (!message.guild.me.voiceChannel) return message.channel.send("Sorry im not connected with a Voice channel!");

    if (message.guild.me.voiceChannelID != message.member.voiceChannelID) return message.channel.send("Sorry im not connected with this channel.");

    message.guild.me.voiceChannel.leave();

    message.channel.send("Disconnecting...");
}