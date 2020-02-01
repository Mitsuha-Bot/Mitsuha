module.exports.run = async (prefix, cmd, client, args, message, ops) => {

    let guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There are no songs playing at the moment.");

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Sorry you are not in the same channel as the bot");

    if (!guildIDData.dispatcher.paused) return message.channel.send("The music isn't paused.");

    guildIDData.dispatcher.resume()

    message.channel.send(`Successfully resumed ${guildIDData.queue[0].songTitle}.`);

}