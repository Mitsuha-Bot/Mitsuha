const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let lang = args[0]
    if(!lang) return message.reply(await client.string(message.guild.id, "settings.clang"))
    if(!client.langs.includes(lang)) return;

    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `lang` WHERE guildid = ?", [message.guild.id], async (error, result) => {
            if(result.length == 0) {
                db.query("INSERT INTO settings(guildid, lang) VALUES(?, ?)", [message.guild.id, lang]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(await client.string(message.guild.id, "settings.lang") + ` ${lang}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE lang SET lang = ? WHERE id = ?", [lang, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Ladybug")
                .setDescription(await client.string(message.guild.id, "settings.lang") + ` ${lang}`)
                return message.channel.send(emby)

            }

        })
    }
}