const ytdl = require('ytdl-core');

module.exports.run = async (prefix, cmd, client, args, message, ops) => {

    if (!message.member.voiceChannel) return message.channel.send(await client.string(message.guild.id, "music.nochannel"));


    if (!args[0]) return message.channel.send(await client.string(message.guild.id, "music.args"));

    var validate = await ytdl.validateURL(args[0]);

    if (!validate) {
        let commandFile = require(`./search.js`)
        return commandFile.run(prefix, cmd, client, args, message, ops)
    }

    var info = await ytdl.getInfo(args[0]);


    var data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voiceChannel.join();

    if (!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) {
        Play(client, ops, data);
    } else {

        message.channel.send(await client.string(message.guild.id, "music.added") `${info.title}` + await client.string(message.guild.id, "music.request") + `${message.author.tag}`);

    }

    ops.active.set(message.guild.id, data);

}

async function Play(client, ops, data) {

    client.channels.get(data.queue[0].announceChannel).send(await client.string(message.guild.id, "music.now") + `${data.queue[0].songTitle} ` + await client.string(message.guild.id, "music.request") +  `${data.queue[0].requester}`);

    var options = { seek: 2, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: "audioonly" }), options);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function () {

        Finish(client, ops, this);

    });

}


function Finish(client, ops, dispatcher) {

    var fetchedData = ops.active.get(dispatcher.guildID);

    fetchedData.queue.shift();

    if (fetchedData.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetchedData);

        Play(client, ops, fetchedData);

    } else {

        ops.active.delete(dispatcher.guildID);

        var voiceChannel = client.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (voiceChannel) voiceChannel.leave();

    }
}