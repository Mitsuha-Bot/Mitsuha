module.exports.run = async (prefix, cmd, client, args, message, ops) => {

    let guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send(await client.string(message.guild.id, "music.notplaying"));

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(await client.string(message.guild.id, "music.samechannel"));

    if (guildIDData.dispatcher.paused) return message.channel.send(await client.string(message.guild.id, "music.alreadypaused"));

    guildIDData.dispatcher.pause();

    message.channel.send(await client.string(message.guild.id, "music.paused") + ` ${guildIDData.queue[0].songTitle}.`);

}