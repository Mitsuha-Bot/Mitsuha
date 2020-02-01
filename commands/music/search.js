const search = require('yt-search');

module.exports.run = async (prefix, cmd, client, args, message, ops) => {

    search(args.join(' '), function (err, res) {

        if (err) return message.channel.send("Sorry but something went wrong!");

        let videos = res.videos.slice(0, 10);

        var response = '';

        for (var i in videos) {

            response += `**[${parseInt(i) + 1}]:** ${videos[i].title} \r\n`;

        }

        response += `Choose a number between 1-${videos.length}.`;

        message.channel.send(response);

        const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;

        const collection = message.channel.createMessageCollector(filter);

        collection.videos = videos;

        collection.once('collect', function (music) {

            let commandFile = require('./play.js');

            commandFile.run(prefix, cmd, client, [this.videos[parseInt(music.content) - 1].url], message, ops); //prefix, cmd, client, args, message, ops

        });

    });

}