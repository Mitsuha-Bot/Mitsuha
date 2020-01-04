const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let embed = new Discord.RichEmbed()
        .setTitle("Ahsoka - Help")
        .addField("Core", "a+help, a+botinfo")
        .addField("Images", "a+cat, a+dog, a+fox, a+ahsoka")
        .addField("Utilities", "a+guildinfo, a+userinfo")
        //.addField("Moderation", "a+ban, a+kick");

        return message.channel.send(embed);
}