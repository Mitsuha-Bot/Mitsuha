module.exports = async (client) => {
  const axios = require("axios")
  const Discord = require("discord.js");
  const GBL = require('gblapi.js');
  const Glenn = new GBL('634076750980317217', process.env.GBL_API);
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
    client.dbl.postStats(client.guilds.size, client.shard.id, client.shard.count);
    Glenn.updateStats(client.guilds.size, client.shard.count);

    axios.post("https://discordbotlist.com/api/bots/634076750980317217/stats",
        {
            shard_id: client.shard.id,
            guilds: client.guilds.size,
            users: client.users.size,
            voice_connections: client.voiceConnections.size
          },
        {
          headers: { Authorization:  process.env.DBL_API}
        })
    axios.post("https://abstractlist.net/bot/634076750980317217/stats",
        {
          shards: client.shard.count,
          servers: client.guilds.size,
          users: client.users.size
        },
        {
          headers: { Authorization:  process.env.ABL_API}
        });

    axios.post("https://discord.boats/api/bot/634076750980317217",
        {
          server_count: client.guilds.size
        },
        {
          headers: {
            Authorization:  process.env.DB_API,
            "Content-Type": "application/json"
          }
        });

    axios.post("https://discord.bots.gg/api/v1/bots/634076750980317217/stats",
        {
          guildCount: client.guilds.size,
          shardCount: client.shard.count,
          shardId: client.shard.id
        },
        {
          headers: {
            Authorization:  process.env.DBG_API
          }
        });
    axios.post("https://botsfordiscord.com/api/bot/634076750980317217",
        {
          server_count: client.guilds.size
        },
        {
          headers: {
            Authorization:  process.env.DFD_API,
            "Content-Type": "application/json"
          }
        })
    console.log(1)
}, 1800000);
};

