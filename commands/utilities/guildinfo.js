const Discord = require("discord.js");
const moment = require("moment")

module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let compare = (a, b) => {
        if (a.position > b.position) return -1;
        if (a.position < b.position) return 1;
        return 0;
    }

    let embed = new Discord.RichEmbed()
        .setTitle("Ahsoka - Guild Information")
        .addField("Name", message.guild.name, true)
        .addField("Members", message.guild.memberCount, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", message.guild.owner.user.tag, true)
        .addField("Verification Level", message.guild.verificationLevel, true)
        .addField("Region", message.guild.region, true)
        .addField("Creation Date", moment(message.guild.createdAt).format("dddd, Do MMMM YYYY, HH:mm:ss"))
        .addField("Roles", message.guild.roles.sort(compare).map(roles => roles).join(", ").substr(0, 1000))


        return message.channel.send(embed)
}