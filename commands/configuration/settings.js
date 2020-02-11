const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;

    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if (result.length == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", "none"]);
                let emb = new Discord.RichEmbed()
                    .setTitle(message.guild.name + " Settings - Ladybug")
                    .setDescription(await client.string(message.guild.id, "settings.settings"))
                    .addField(await client.string(message.guild.id, "settings.modlog"), "None")
                    .addField(await client.string(message.guild.id, "settings.channel"), "None")
                    .addField(await client.string(message.guild.id, "settings.wmessage"), "Default")
                    .addField(await client.string(message.guild.id, "settings.lmessage"), "Default")
            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle(message.guild.name + " Settings - Ladybug")
                    .setDescription(await client.string(message.guild.id, "settings.settings"))
                if (result[0].modlog == "none") {
                    embed.addField(await client.string(message.guild.id, "settings.modlog"), "Not set")
                } else {
                    embed.addField(await client.string(message.guild.id, "settings.modlog"), client.channels.get(result[0].modlog))
                }
                if (result[0].welcomechannel == "none") {
                    embed.addField(await client.string(message.guild.id, "settings.channel"), "Not set")
                } else {
                    embed.addField(await client.string(message.guild.id, "settings.channel"), client.channels.get(result[0].welcomechannel))
                }

                if (result[0].welcomemessage == "none") {
                    embed.addField(await client.string(message.guild.id, "settings.wmessage"), "Default")
                } else {
                    embed.addField(await client.string(message.guild.id, "settings.wmessage"), result[0].welcomemessage)
                }
                if (result[0].leavemessage == "none") {
                    embed.addField(await client.string(message.guild.id, "settings.lmessage"), "Default")
                } else {
                    embed.addField(await client.string(message.guild.id, "settings.lmessage"), result[0].leavemessage)
                }
                return message.channel.send(embed)
            }
        })
    } else {

        let emby = new Discord.RichEmbed()
            .setTitle("Settings - Ladybug")
            .setDescription(await client.string(message.guild.id, "settings.noperms"))

        return message.channel.send(emby)
    }
}