const Discord = require("discord.js")
const axios = require("axios")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let platform = args[0]
    if(platform == "pc") {
        platform = "5"
    } else if(platform == "psn") {
        platform = "2"
    } else if(platform == "xbox") {
        platform = "1"
    }
    let name = args.slice(1).join(' ');
        let res = await axios.get(`https://public-api.tracker.gg/apex/v1/standard/profile/${platform}/${name}`,
        {
            headers: {
                "TRN-Api-Key": process.env.TRN_API
            }
        })
    console.log(res.data.data.stats)
}