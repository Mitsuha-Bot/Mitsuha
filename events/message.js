const fs = require("fs");
const active = new Map();

module.exports = async (client, message) => {
  if (message.author.bot) {
    return;
  }
  if (message.channel.type === "dm") {
    message.channel.send(`Hey! My name is **Ladybug**\n I'm a Discord bot created by DieKatze#1784. I have much commands.`)
    return;

  }

  let prefix = client.config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let author = message.author;
  let guild = message.guild;

  var ops = {
    active: active
  }
  if(message.content.startsWith(`<@${client.user.id}>`)) {
    let embed = new Discord.RichEmbed()
    .setTitle("Hey im Ladybug!")
    .setDescription("My prefix is l+")

    return message.channel.send(embed)
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }

  let commandFile = client.commands.get(cmd.slice(prefix.length));
  if (commandFile) {
    commandFile[0].run(prefix, cmd, client, args, message, ops);
 }
};