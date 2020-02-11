const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let embed = new Discord.RichEmbed()
    .setTitle(await client.string(message.guild.id, "help.title"))
    .setColor("#dd2b4e")
    .addField("⚙Core", genHelpCategory("core", prefix))
    .addField("🖼️Images", genHelpCategory("picture", prefix))
    .addField("🔨Utilities", genHelpCategory("utilities", prefix))
    .addField("💵Economy", genHelpCategory("economy", prefix))
    .addField("📦Mysterybox", genHelpCategory("mysterybox", prefix))
    .addField("🎵Music", genHelpCategory("music", prefix))
    if(message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("KICK_MEMBERS")){
        embed.addField("⚖Moderation", genHelpCategory("moderation", prefix))
    }
    if(message.member.hasPermission("MANAGE_GUILD")){
        embed.addField("🛠Configuration", genHelpCategory("configuration", prefix))
    }
    if(message.author.id == 292588280304893952) {
        embed.addField("💻Developer", genHelpCategory("developer", prefix))
    }    //.addField("🎉Fun", " ")

return message.channel.send(embed);
}

function genHelpCategory(category, prefix) {
    if(!category) return false;
    let text = "";
    let group = fs.readdirSync(`./commands/${category}`);
  for (let commandFile of group) {
    if (!commandFile.endsWith(".js")) {
      return;
    }
    text += " `" + prefix + commandFile.split(".")[0] + "`,";
    }
    text = text.slice(0, -1);
    return text;
}