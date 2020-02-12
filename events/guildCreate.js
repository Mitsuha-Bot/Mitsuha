const Discord = require("discord.js")
module.exports = async (client, guild) => {
    let channel = client.channels.get('677145248048218112')
    let icon;

    if(guild.iconURL) {
        icon = guild.iconURL
    }

    let embed = new Discord.RichEmbed()
    .setTitle("Ladybug - Joined Guild")
    .setThumbnail(icon)
    .addField("Name", guild.name)
    .addField("ID", guild.id)
    .addField("Owner", guild.owner.user.tag)
    .addField("New Server Counter", client.guilds.size)
    channel.send(embed)
}