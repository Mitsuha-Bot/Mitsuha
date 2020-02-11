const Discord = require("discord.js");
const moment = require("moment")

module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let compare = (a, b) => {
        if (a.position > b.position) return -1;
        if (a.position < b.position) return 1;
        return 0;
    }

    let embed = new Discord.RichEmbed()
        .setTitle(await client.string(message.guild.id, "guildinfo.title"))
        .setColor("#dd2b4e")
        .addField("Name", message.guild.name, true)
        .addField(await client.string(message.guild.id, "guildinfo.member"), message.guild.memberCount, true)
        .addField("ID", message.guild.id, true)
        .addField(await client.string(message.guild.id, "guildinfo.owner"), message.guild.owner.user.tag, true)
        .addField(await client.string(message.guild.id, "guildinfo.verify"), message.guild.verificationLevel, true)
        .addField(await client.string(message.guild.id, "guildinfo.region"), message.guild.region, true)
        .addField(await client.string(message.guild.id, "guildinfo.date"), moment(message.guild.createdAt).format("dddd, Do MMMM YYYY, HH:mm:ss"))
        if(message.guild.roles.size > 1000) {
        embed.addField("Roles", "There are to many roles for the Embed")
        } else {
        embed.addField("Roles", message.guild.roles.sort(compare).map(roles => roles).join(", ").substr(0, 1000))
        }


        return message.channel.send(embed)
}