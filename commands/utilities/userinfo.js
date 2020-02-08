const Discord = require("discord.js")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let user = message.mentions.users.first();
    if(!user) {user = message.author}
    let embed = new Discord.RichEmbed();
    embed.setTitle("Ladybug - User Information");
    embed.setColor("#dd2b4e")
    embed.setThumbnail(user.avatarURL);
    embed.addField("Username ", user.username);
    embed.addField("Tag ", user.tag);
    embed.addField("Status", user.presence.status);
    embed.addField("ID", user.id);
    embed.addField("Created at", user.createdAt);

    return message.channel.send(embed);

}