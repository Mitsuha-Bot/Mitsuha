const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let embed = new Discord.RichEmbed()
        .setTitle("Ahsoka - Guild Information")
        .addField("Name", message.guild.name, true)
        .addField("Members", message.guild.memberCount, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", message.guild.owner.user.tag, true)
        .addField("Verification Level", message.guild.verificationLevel)
        .addField("Region", message.guild.region, true)
        .addField("Creation Date", message.guild.createdAt)


        return message.channel.send(embed)
}