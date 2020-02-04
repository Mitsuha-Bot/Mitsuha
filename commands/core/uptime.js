const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let t = new Date(client.uptime);
    let months = t.getUTCMonth();
    let days = t.getUTCDate() - 1;
    let minutes = t.getUTCMinutes();
    let hours = t.getUTCHours();
    let seconds = t.getUTCSeconds();
    let uptime = `${months} Month(s), ${days} Day(s), ${hours} Hour(s), ${minutes} Minute(s), ${seconds} Second(s)`;

    let embed = new Discord.RichEmbed()
        .setTitle("Ahsoka - Uptime")
        .setDescription("Uptime " + uptime)
        .setFooter("Requested by " + message.author.tag, message.author.avatarURL)
        .setTimestamp()

    return message.channel.send(embed)

}