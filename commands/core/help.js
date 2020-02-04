const Discord = require("discord.js");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let embed = new Discord.RichEmbed()
    .setTitle("Ahsoka - Help")
    .setColor("#67b54c")
    .addField("⚙Core", "`a+help`, `a+botinfo`, `a+uptime`")
    .addField("🖼️Images", "`a+cat`, `a+dog`, `a+fox`")
    .addField("🔨Utilities", "`a+guildinfo`, `a+userinfo`")
    .addField("⚖Moderation", "`a+ban`, `a+kick`")
    .addField("💵Economy", "`a+credits`, `a+daily`, `a+weekly`, `a+slot`")
    .addField("📦MysteryBoxen", "`a+buybox`, `a+inventory`, `a+sell`, `a+showitem`")
    .addField("🎵Musik", "")
    .addField("🛠Configuration", "`a+settings`, `a+setmodlog`, `a+setwelcomechannel`, `a+setwelcomemessage`, `a+setleavemessage`")
    if(message.author.id == 292588280304893952) {
    embed.addField("💻Developer", "`a+serverlist`, `a+update`, `a+eval`")
    }    //.addField("🎉Fun", " ")

return message.channel.send(embed);
}