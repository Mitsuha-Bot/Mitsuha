module.exports = async (client) => {
  const Discord = require("discord.js");
  const colors = require("colors")
  const config = client.config;
  console.log();
    console.log(`Successfully logged in as ${client.user.tag}`.rainbow);
  client.user.setStatus(`${client.config.status}`);
  let activities = config.activities;
  setInterval(function() {
    let activityRaw = activities[Math.floor(Math.random() * activities.length)];
    let activity = activityRaw.replace("$prefix", config.prefix).replace("$guilds", client.guilds.size).replace("$users", client.users.size)
    client.user.setActivity(activity, {type: config.activityType});
  }, 12000);
  setInterval(() => {
    client.dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
}, 1800000);
};