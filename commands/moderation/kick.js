const discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');

    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('you do not have permissions to use this command!s');

    if (!target) return message.reply('please specify a member to kick!');
    if (!reason) return message.reply('please specify a reason for this kick!');

    let embed = new discord.RichEmbed()
        .setColor('#ffcc00')
        .setTitle("Kick")
        .setThumbnail(target.user.avatarURL)
        .addField('User', `${target.user.username} (${target.id})`)
        .addField('Reason', reason)
        .addField('Moderator', `${message.author.username}`)

    message.channel.send(embed)
    target.kick(reason);
};
