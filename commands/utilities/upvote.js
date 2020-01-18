const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Upvote - Ahsoka")
    .setColor("#67b54c")
    .setDescription(`You can upvote for Ahsoka to Support the Bot!\n[Top.gg](https://top.gg/bot/634076750980317217)\n[Discord Bot List](https://discordbotlist.com/bots/634076750980317217)\n[Glennbotlist](https://glennbotlist.xyz/bot/634076750980317217)`)

    return message.channel.send(embed)
}
