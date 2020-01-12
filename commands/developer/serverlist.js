const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if(message.author.id == 292588280304893952) {
    let compare = (a, b) => {
        if (a.position > b.position) return -1;
        if (a.position < b.position) return 1;
        return 0;
    }
    let embed = new Discord.RichEmbed()
    .setTitle("Serverlist - Ahsoka")
    .setDescription(client.guilds.sort(compare).map(server => `\`\`${server.name}\`\`\n*${server.members.size}*\n${server.id}`).join("\n").substr(0, 2000), `All Servers: ${client.guilds.size}`)
        return message.channel.send(embed)
  } else {

    let emb = new Discord.RichEmbed()
    .setTitle("Serverlist - Ahsoka")
    .setDescription("Sorry but you are not the Bot owner!")
    return message.channel.send(emb)
  }

}