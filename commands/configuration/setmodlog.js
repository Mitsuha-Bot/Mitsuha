const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let mlog = message.mentions.channels.first()
    if(!mlog) return message.reply(await client.string(message.guild.id, "settings.ch") )

    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.legnth == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, mlog.id, "none", "none", "none"]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(await client.string(message.guild.id, "settings.modlogc")  + ` ${mlog}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET modlog = ? WHERE id = ?", [mlog.id, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(await client.string(message.guild.id, "settings.modlogc") + ` ${mlog}`)
                return message.channel.send(emby)

            }

        })
    }
}