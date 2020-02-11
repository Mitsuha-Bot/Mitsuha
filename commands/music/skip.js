const discord = require("discord.js");
 
module.exports.run = async (prefix, cmd, client, args, message, ops) => {
 
    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send(await client.string(message.guild.id, "music.notplaying"));
 
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(await client.string(message.guild.id, "music.samechannel"));
 
    var amountUsers = message.member.voiceChannel.members.size;
 
    var amountSkip = Math.ceil(amountUsers / 2);
 
    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];
 
    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(await client.string(message.guild.id, "music.voted") +` ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);
 
    guildIDData.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, guildIDData);
 
    if (guildIDData.queue[0].voteSkips.length >= amountSkip) {
 
        message.channel.send(await client.string(message.guild.id, "music.skipped"));

        return guildIDData.dispatcher.emit("end");
 
    }
 
    message.channel.send(await client.string(message.guild.id, "music.skipping") +`${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);
 
}