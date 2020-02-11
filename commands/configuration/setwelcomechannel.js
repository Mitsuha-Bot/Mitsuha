const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let wec = message.mentions.channels.first()
    if(!wec) return message.reply(await client.string(message.guild.id, "settings.ch") )

    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.length == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", wec.id, "none", "none"]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(await client.string(message.guild.id, "settings.wchannel") + ` ${wec}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET welcomechannel = ? WHERE id = ?", [wec.id, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(await client.string(message.guild.id, "settings.wchannel") + ` ${wec}`)
                return message.channel.send(emby)

            }

        })
    }
}