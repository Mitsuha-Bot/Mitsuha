const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if (message.author.id == 292588280304893952) {
        if (message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) {
            if (args.join(" ") !== "") {
                client.guilds.get(client.guilds.find(server => server.name === args.join(" ")).id).channels.filter(channels => channels.type == "text").first().createInvite().then(invite => {
                    let embed = new Discord.RichEmbed()
                        .setColor("#dd2b4e")
                        .setDescription(invite.url)
                    message.channel.send(embed)
                })
            }
        } else {
            let emb = new Discord.RichEmbed()
                .setTitle("Invite - Ladybug")
                .setColor("#dd2b4e")
                .setDescription("Sorry but I do not have permissions to create an invite")
            return message.channel.send(emb)
        }
    } else {
        let emb = new Discord.RichEmbed()
            .setTitle("Invite - Ladybug")
            .setColor("#dd2b4e")
            .setDescription("Sorry but you are not the Bot owner!")
        return message.channel.send(emb)
    }
}