module.exports.run = async (prefix, cmd, client, args, message, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send(await client.string(message.guild.id, "music.notplaying"));
 
    // Data ophalen.
    var queue = guildIDData.queue;
    var nowPlaying = queue[0];
 
    var response = await client.string(message.guild.id, "music.now") + `${nowPlaying.songTitle} ` + await client.string(message.guild.id, "music.requested") + `${nowPlaying.requester}\n\nQueue: \n`;

    for (var i = 0; i < queue.length; i++) {
 
        response += `${i}, ${queue[i].songTitle} `+ await client.string(message.guild.id, "music.requested") + ` ${queue[i].requester}\n`;
 
    }

    message.channel.send(response);
 
}