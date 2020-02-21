const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let t = new Date(client.uptime);
    let months = t.getUTCMonth();
    let days = t.getUTCDate() - 1;
    let minutes = t.getUTCMinutes();
    let hours = t.getUTCHours();
    let seconds = t.getUTCSeconds();
    let uptime = `${months} Month(s), ${days} Day(s), ${hours} Hour(s), ${minutes} Minute(s), ${seconds} Second(s)`;
    let shardId = client.shard.id + 1;
    let shards = client.shard.count.toString();
    let nvs = process.version
    let embed = new Discord.RichEmbed()
        .setTitle("Mitsuha - Botinfo")
        .setColor("#dd2b4e")
        .addField("Name", "Mitsuha", true)
        .addField("Developer", "DieKatze#1784", true)
        .addField("Libary", "Discord.js", true)
        .addField(await client.string(message.guild.id, "botinfo.guilds"), client.guilds.size, true)
        .addField(await client.string(message.guild.id, "botinfo.users"), client.users.size, true)
        .addField(await client.string(message.guild.id, "botinfo.shardid"), client.shard.id, true)
        .addField("Shards", shardId + "/" + shards, true)
        .addField("NodeVersion", nvs, true)
        .addField("DiscordJs Version", Discord.version, true)
        .addField(await client.string(message.guild.id, "botinfo.uptime"), uptime)
        //.addField("Website", "[Link](htt)", true)
        .addField("Invite", "[Link](https://bit.ly/2tr30Oi)",true)
        .addField("Support Server", "[Invite](https://discord.gg/8Fjkvr4)", true)

        return message.channel.send(embed);
}