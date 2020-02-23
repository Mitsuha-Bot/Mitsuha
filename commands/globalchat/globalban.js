const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if(!message.member.id == 292588280304893952) return
    let db = client.con;
    let user = message.mentions.users.first() || client.users.get(args[0])
    db.query("INSERT INTO globalban (id, ban) VALUES (?, ?)", [user.id, "yes"])
    let embed = new Discord.RichEmbed()
    .setTitle("Mitsuha - GlobalChat Ban")
    .setDescription(`<@${user.id}> got banned form the GlobalChat!`)

    return message.channel.send(embed)
}