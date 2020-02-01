const discord = require("discord.js");
 
module.exports.run = async (prefix, cmd, client, args, message, ops) => {
 
    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment.");
 
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Sorry you're not in the same channel as the bot");
 
    var amountUsers = message.member.voiceChannel.members.size;
 
    var amountSkip = Math.ceil(amountUsers / 2);
 
    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];
 
    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry, you have already voted. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);
 
    guildIDData.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, guildIDData);
 
    if (guildIDData.queue[0].voteSkips.length >= amountSkip) {
 
        message.channel.send("On the way to the next song..");

        return guildIDData.dispatcher.emit("end");
 
    }
 
    message.channel.send(`Attached from skip request.${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);
 
}