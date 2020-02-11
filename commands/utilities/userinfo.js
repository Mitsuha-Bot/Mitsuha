const Discord = require("discord.js")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let user = message.mentions.users.first();
    if(!user) {user = message.author}
    let embed = new Discord.RichEmbed();
    embed.setTitle(await client.string(message.guild.id, "userinfo.title"));
    embed.setColor("#dd2b4e")
    embed.setThumbnail(user.avatarURL);
    embed.addField("Name ", user.username);
    embed.addField("Tag ", user.tag);
    embed.addField("Status", user.presence.status);
    embed.addField("ID", user.id);
    embed.addField(await client.string(message.guild.id, "userinfo.create"), user.createdAt);

    return message.channel.send(embed);

}