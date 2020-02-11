const discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(await client.string(message.guild.id, "moderation.noperms"));

    if (!target) return message.reply(await client.string(message.guild.id, "moderation.banuser"));
    if (!reason) return message.reply(await client.string(message.guild.id, "moderation.banreason"));
    db.query("SELECT * FROM `settings` WHERE id = ?", [message.guild.id], async (error, result) => {
        let embed = new discord.RichEmbed()
            .setColor('#ff0000')
            .setTitle("Ban")
            .setThumbnail(target.user.avatarURL)
            .addField(await client.string(message.guild.id, "ban.user"), `${target.user.username} (${target.id})`)
            .addField(await client.string(message.guild.id, "ban.reason"), reason)
            .addField(await client.string(message.guild.id, "ban.moderator"), `${message.author.username}`)

        if (result.length == 0) {
            message.channel.send(embed)
            return target.ban(reason);
        }
        if (result[0].modlog == "none") {
            message.channel.send(embed)
            return target.ban(reason);
        } else {
            let mlog = message.guild.channels.get(result[0].modlog);
            mlog.send(embed)
            return target.ban(reason);
        }
    })
};