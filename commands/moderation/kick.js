const discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');

    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(await client.string(message.guild.id, "moderation.noperms"));

    if (!target) return message.reply(await client.string(message.guild.id, "moderation.kickuser"));
    if (!reason) return message.reply(await client.string(message.guild.id, "moderation.kickreason"));
    db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
        let embed = new discord.RichEmbed()
            .setColor('#ffcc00')
            .setTitle("Kick")
            .setThumbnail(target.user.avatarURL)
            .addField(await client.string(message.guild.id, "kick.user"), `${target.user.username} (${target.id})`)
            .addField(await client.string(message.guild.id, "kick.reason"), reason)
            .addField(await client.string(message.guild.id, "kick.moderator"), `${message.author.username}`)
            if (result.length == 0) {
                message.channel.send(embed)
                return target.kick(reason);
            }
            if (result[0].modlog == "none") {
             message.channel.send(embed)
            return target.kick(reason);
        } else {
            let mlog = message.guild.channels.get(result[0].modlog);
            mlog.send(embed)
            target.kick(reason);
        }
    })
};