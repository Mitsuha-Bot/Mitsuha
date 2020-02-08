const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;

    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if (result.length == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", "none"]);
                let emb = new Discord.RichEmbed()
                    .setTitle(message.guild.name + " Settings - Ladybug")
                    .setDescription("You can change the settings with `a+setmodlog`, `a+setwelcomechannel`, `a+setwelcomemessage`, `a+setleavemessage`")
                    .addField("Modlog Channel", "None")
                    .addField("Welcome/Leave Channel", "None")
                    .addField("Welcome Message", "Default")
                    .addField("Leave Message", "Default")
            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle(message.guild.name + " Settings - Ladybug")
                    .setDescription("You can change the settings with `a+setmodlog`, `a+setwelcomechannel`, `a+setwelcomemessage`, `a+setleavemessage`")
                if (result[0].modlog == "none") {
                    embed.addField("Modlog Channel", "Not set")
                } else {
                    embed.addField("Modlog Channel", client.channels.get(result[0].modlog))
                }
                if (result[0].welcomechannel == "none") {
                    embed.addField("Welcome/Leave Channel", "Not set")
                } else {
                    embed.addField("Welcome/Leave Channel", client.channels.get(result[0].welcomechannel))
                }

                if (result[0].welcomemessage == "none") {
                    embed.addField("Welcome Message", "Default")
                } else {
                    embed.addField("Welcome Message", result[0].welcomemessage)
                }
                if (result[0].leavemessage == "none") {
                    embed.addField("Leave Message", "Default")
                } else {
                    embed.addField("Leave Message", result[0].leavemessage)
                }
                return message.channel.send(embed)
            }
        })
    } else {

        let emby = new Discord.RichEmbed()
            .setTitle("Settings - Ladybug")
            .setDescription("Sorry but you don't have permissions!")

        return message.channel.send(emby)
    }
}