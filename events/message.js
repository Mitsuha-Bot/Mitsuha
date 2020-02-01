const fs = require("fs");
const active = new Map();

module.exports = async (client, message) => {
  if (message.author.bot) {
    return;
  }
  if (message.channel.type === "dm") {
    message.channel.send(`Hey! My name is **Ahsoka**\n I'm a Discord bot created by Katze#1784. I have much commands. You can visit the Following links for Support or invite me:\n **Official Website** https://ahsoka.eu\n **Official Discord** http://discord.ahsoka.eu\n Official Invite link http://invite.ahsoka.eu`)
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

  if (!message.content.startsWith(prefix)) {
    return;
  }

  let commandFile = client.commands.get(cmd.slice(prefix.length));
  if (commandFile) {
    commandFile.run(prefix, cmd, client, args, message, ops);
 }
};