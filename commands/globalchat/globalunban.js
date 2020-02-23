const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if(!message.member.id == 292588280304893952) return
    let db = client.con
    let user = message.mentions.users.first() || client.users.get(args[0])
    db.query("SELECT * FROM globalban WHERE id = ?", [user.id], async (error, result) => {
        console.log(error)
        if(result.length == 0) {
            let embed = new Discord.RichEmbed()
            .setTitle("Mitsuha - GlobalChat Unban")
            .setDescription("User is not banned!")

            return message.channel.send(embed)
        } else {
            db.query("DELETE FROM globalban WHERE id = ?", [user.id])
            let embed = new Discord.RichEmbed()
            .setTitle("Mitsuha - GlobalChat Unban")
            .setDescription("User got unbanned!")

            return message.channel.send(embed)
        }
    })
}