const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
async function settings() {
    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if (result.length == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", "none"]);
                let emb = new Discord.RichEmbed()
                    .setTitle(message.guild.name + " Settings - Mitsuha")
                    .setDescription(await client.string(message.guild.id, "settings.settings"))
                    .addField(await client.string(message.guild.id, "settings.modlog"), "None")
                    .addField(await client.string(message.guild.id, "settings.channel"), "None")
                    .addField(await client.string(message.guild.id, "settings.wmessage"), "Default")
                    .addField(await client.string(message.guild.id, "settings.lmessage"), "Default")
                    return message.channel.send(emb)
            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle(message.guild.name + " Settings - Mitsuha")
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
            .setTitle("Settings - Mitsuha")
            .setDescription(await client.string(message.guild.id, "settings.noperms"))

        return message.channel.send(emby)
    }
  }
async function mlog() {
    let mlog = message.mentions.channels.first()
    if(!mlog) return message.reply(await client.string(message.guild.id, "settings.ch"))

    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.legnth == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, mlog.id, "none", "none", "none"]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.modlogc")  + ` ${mlog}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET modlog = ? WHERE id = ?", [mlog.id, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.modlogc") + ` ${mlog}`)
                return message.channel.send(emby)

            }

        })
    }
  }
async function wchannel() {
    let wec = message.mentions.channels.first() || args[1]
    if(!wec) return message.reply(await client.string(message.guild.id, "settings.ch"))

    if (message.member.hasPermission("MANAGE_GUILD")) {
        if(wec == "delete") {
            db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
                if(result.length == 0) {
                    db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", "none"]);
                    let embed = new Discord.RichEmbed()
                    .setTitle("Configuration - Mitsuha")
                    .setDescription(await client.string(message.guild.id, "settings.wchannel") + ` ${wec}`)
                    return message.channel.send(embed)
    
                } else {
                    db.query("UPDATE settings SET welcomechannel = ? WHERE id = ?", ["none", message.guild.id]);
                    let emby = new Discord.RichEmbed()
                    .setTitle("Configuration - Mitsuha")
                    .setDescription(await client.string(message.guild.id, "settings.wchannel") + ` ${wec}`)
                    return message.channel.send(emby)
    
                }
    
            })
        } else {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.length == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", wec.id, "none", "none"]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.wchannel") + ` ${wec}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET welcomechannel = ? WHERE id = ?", [wec.id, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.wchannel") + ` ${wec}`)
                return message.channel.send(emby)

            }

        })
    }
    }
  }
async function wmessage() {
    let a = args.slice(1).join(' ')
    if(!a) return message.reply(await client.string(message.guild.id, "settings.welcomeerror"))
    if(message.member.hasPermission("MANAGE_GUILD")) {
        if(a == "delete") {
            db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
                if(result.length == 0) {
                    db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", "none"]);
                    let embed = new Discord.RichEmbed()
                    .setTitle("Configuration - Mitsuha")
                    .setDescription(await client.string(message.guild.id, "settings.welcome") + ` ${a}`)
                    return message.channel.send(embed)
    
                } else {
                    db.query("UPDATE settings SET welcomemessage = ? WHERE id = ?", ["none", message.guild.id]);
                    let emby = new Discord.RichEmbed()
                    .setTitle("Configuration - Mitsuha")
                    .setDescription(await client.string(message.guild.id, "settings.welcome") + ` ${a}`)
                    return message.channel.send(emby)
    
                }
    
            })
        } else {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.length == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", a, "none"]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.welcome") + ` ${a}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET welcomemessage = ? WHERE id = ?", [a, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.welcome") + ` ${a}`)
                return message.channel.send(emby)

            }

        })
    }

    }
}
async function lmessage() {
    let a = args.slice(1).join(' ')
    if(!a) return message.reply(await client.string(message.guild.id, "settings.leaveerror"))

    if(message.member.hasPermission("MANAGE_GUILD")) {
        if(a == "delete") {
            db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
                if(result.length == 0) {
                    db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", "none"]);
                    let embed = new Discord.RichEmbed()
                    .setTitle("Configuration - Ladybug")
                    .setDescription(await client.string(message.guild.id, "settings.leave") + ` ${a}`)
                    return message.channel.send(embed)
    
                } else {
                    db.query("UPDATE settings SET leavemessage = ? WHERE id = ?", ["none", message.guild.id]);
                    let emby = new Discord.RichEmbed()
                    .setTitle("Configuration - Mitsuha")
                    .setDescription(await client.string(message.guild.id, "settings.leave") + ` ${a}`)
                    return message.channel.send(emby)
    
                }
        })
    } else {
        db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
            if(result.length == 0) {
                db.query("INSERT INTO settings(id, modlog, welcomechannel, welcomemessage, leavemessage) VALUES(?, ?, ?, ?, ?)", [message.guild.id, "none", "none", "none", a]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.leave") + ` ${a}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE settings SET leavemessage = ? WHERE id = ?", [a, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.leave") + ` ${a}`)
                return message.channel.send(emby)

            }

        })
    }

    }
}
async function lang() {
    let lang = args[1]
    if(!lang) return message.reply(await client.string(message.guild.id, "settings.clang"))
    if(!client.langs.includes(lang)) return message.reply(await client.string(message.guild.id, "settings.clang"))

    if (message.member.hasPermission("MANAGE_GUILD")) {
        db.query("SELECT * FROM `lang` WHERE guildid = ?", [message.guild.id], async (error, result) => {
            if(result.length == 0) {
                db.query("INSERT INTO settings(guildid, lang) VALUES(?, ?)", [message.guild.id, lang]);
                let embed = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.lang") + ` ${lang}`)
                return message.channel.send(embed)

            } else {
                db.query("UPDATE lang SET lang = ? WHERE guildid = ?", [lang, message.guild.id]);
                let emby = new Discord.RichEmbed()
                .setTitle("Configuration - Mitsuha")
                .setDescription(await client.string(message.guild.id, "settings.lang")  + ` ${lang}`)
                return message.channel.send(emby)

            }

        })
    }
}
  if(!args[0]) {
      settings()
  } else if(args[0] == "modlog") {
    mlog()
  } else if(args[0] == "welcomechannel") {
      wchannel()
  } else if(args[0] == "welcomemessage") {
    wmessage()
  } else if(args[0] == "leavemessage") {
    lmessage()
} else if(args[0] == "language") {
    lang()
} else {
    settings()
}

}