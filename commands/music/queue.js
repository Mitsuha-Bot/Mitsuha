module.exports.run = async (prefix, cmd, client, args, message, ops) => {

    var guildIDData = ops.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment.");
 
    // Data ophalen.
    var queue = guildIDData.queue;
    var nowPlaying = queue[0];
 
    var response = `Now playing ${nowPlaying.songTitle} || Requested by ${nowPlaying.requester}\n\nQueue: \n`;

    for (var i = 0; i < queue.length; i++) {
 
        response += `${i}, ${queue[i].songTitle} Requested by ${queue[i].requester}\n`;
 
    }

    message.channel.send(response);
 
}