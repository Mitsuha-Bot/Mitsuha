const Discord = require("discord.js");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con;
    let iid = parseInt(args.join(" "));

    db.query("SELECT * FROM items WHERE ID = ?", [iid], (error, result) => {
        if(result == 0) {
            let emb = new Discord.RichEmbed()
            .setTitle("Item - Ahsoka")
            .setDescription("Sorry but this item don't exist!")

            return message.channel.send(emb)
        } else {
        let embed = new Discord.RichEmbed()
        .setTitle(result[0].name)
        .setImage(result[0].bild)
        .setDescription(result[0].text)
        .addField("This item is", result[0].type)
        .addField("Price (for selling)", result[0].price)
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