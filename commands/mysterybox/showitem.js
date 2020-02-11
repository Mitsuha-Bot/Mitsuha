const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let iid = parseInt(args.join(" "));

    db.query("SELECT * FROM items WHERE ID = ?", [iid], async (error, result) => {
        if(result == 0) {
            let emb = new Discord.RichEmbed()
            .setTitle("Item - Ladybug")
            .setDescription(await client.string(message.guild.id, "sell.erroritem"))

            return message.channel.send(emb)
        } else {
        let embed = new Discord.RichEmbed()
        .setTitle(result[0].name)
        .setImage(result[0].bild)
        .setDescription(result[0].text)
        .addField(await client.string(message.guild.id, "buybox.rare"), result[0].type)
        .addField(await client.string(message.guild.id, "buybox.price"), result[0].price)
        if(result[0].type == "Mystical") {
            embed.setColor("#b09343")
        }
        if(result[0].type == "Legendary") {
            embed.setColor("#8143b0")
        }
        if(result[0].type == "Rare") {
            embed.setColor("#357e85")
        }
        if(result[0].type == "Common") {
            embed.setColor("#585759")
        }
        return message.channel.send(embed)
        }
    })
}