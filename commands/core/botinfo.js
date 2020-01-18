const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let shardId = client.shard.id + 1;
    let shards = client.shard.count.toString();
    let nvs = process.version
    let embed = new Discord.RichEmbed()
        .setTitle("Botinfo")
        .setColor("#67b54c")
        .addField("Name", "Ahsoka", true)
        .addField("Developer", "Katze#1784", true)
        .addField("Libary", "Discord.js", true)
        .addField("Guilds", client.guilds.size, true)
        .addField("Users", client.users.size, true)
        .addField("Your Shard ID", client.shard.id, true)
        .addField("Shards", shardId + "/" + shards, true)
        .addField("NodeVersion", nvs, true)
        .addField("DiscordJs Version", Discord.version, true)
        .addField("Website", "[Link](https://Ahsoka.eu)", true)
        .addField("Invite", "[Link](https://bit.ly/2tr30Oi)",true)
        .addField("Support Server", "[Invite](https://discord.gg/8Fjkvr4)", true)

        return message.channel.send(embed);
}