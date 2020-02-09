const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let a = args.slice(" ").join(" ")
    let db = client.con;
    if(!a) return message.reply("Please user a+setwelcomemessage (message). You can user ${user} for the user name and ${server} for the server name!")
    if(message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.legnth == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", a, "none"]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(`The welcome messag have been set to: ${a}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET welcomemessage = ? WHERE id = ?", [a, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(`The welcome message have been set to: ${a}`)
                return message.channel.send(emby)

            }

        })

    }
}