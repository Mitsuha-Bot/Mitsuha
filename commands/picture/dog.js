const Discord = require("discord.js")
const axios = require("axios")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let res = await axios.get("https://random.dog/woof.json");
    let pic = res.data.url

    let embed = new Discord.RichEmbed()

        .setTitle(await client.string(message.guild.id, "dog.title"))
        .setColor("#dd2b4e")
        .setImage(pic)
        .setFooter(await client.string(message.guild.id, "dog.footer"))

    return message.channel.send(embed)
}