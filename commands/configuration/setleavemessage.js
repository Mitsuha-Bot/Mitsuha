const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let a = args.slice(" ").join(" ")
    let db = client.con;
    if(!a) return message.channel.reply("Please user a+leavemessage (message). You can user ${user} for the user name and ${server} for the server name!")
    if(message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.legnth == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", a]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Ahsoka")
                .setDescription(`The leave messag have been set to: ${a}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET leavemessage = ? WHERE id = ?", [a, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Ahsoka")
                .setDescription(`The leave message have been set to: ${a}`)
                return message.channel.send(emby)

            }

        })

    }
}