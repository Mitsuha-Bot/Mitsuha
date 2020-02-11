const Discord = require("discord.js")
const axios = require("axios")

module.exports.run = async (prefix, cmd, client, args, message, config) => {

    let res = await axios.get("http://aws.random.cat/meow");
    let pic = res.data.file

    let embed = new Discord.RichEmbed()

    .setTitle(await client.string(message.guild.id, "cat.title"))
    .setColor("#dd2b4e")
    .setImage(pic)
    .setFooter(await client.string(message.guild.id, "cat.footer"))

    return message.channel.send(embed)
}