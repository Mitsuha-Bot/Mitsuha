const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Upvote - Ladybug")
    .setColor("#dd2b4e")
    .setDescription(await client.string(message.guild.id, "upvote"))

    return message.channel.send(embed)
}
