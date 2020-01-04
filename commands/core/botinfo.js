const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let shardId = client.shard.id + 1;
    let shards = client.shard.count.toString();
    let nvs = process.version
    let embed = new Discord.RichEmbed()
        .setTitle("Botinfo")
        .addField("Name", "Ashoka", true)
        .addField("Developer", "Katze#1784", true)
        .addField("Libary", "Discord.js", true)
        .addField("Shards", shardId + "/" + shards, true)
        .addField("NodeVersion", nvs, true)
        .addField("DiscordJs Version", Discord.version, true)
        .addField("Website", "https://Ahsokabot.xyz", true)
        .addField("Invite", "https://bit.ly/2tr30Oi",true)
        .addField("Support Server", "8Fjkvr4", true)

        return message.channel.send(embed);
}