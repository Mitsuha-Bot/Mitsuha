const Discord = require("discord.js");
const db = require("../../utils/database");
const bh = require("../../utils/boxhelper");
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let price = 300;
    /** Mystical 0.01
     * Legendary 0.10
     * Rare      0.30
     * Common    0.59
     */
    db.query("SELECT * FROM credits WHERE id = ?", [message.author.id], async (e, r) => {
        console.log(r[0].credits);
        if (!r) {
            db.query("INSERT INTO `credits` (id, credits) VALUES (?, ?)", [message.author.id, 0]);
            let emb = new Discord.RichEmbed()
                .setTitle("MysteryBox - Ahsoka")
                .setDescription("You don't have enough Credits!")
                .setFooter("Requested by " + message.author.tag, message.author.avatarURL)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTimestamp();
            return message.channel.send(emb);
        } else if (r[0].credits < price) {
            let emb = new Discord.RichEmbed()
                .setTitle("MysteryBox - Ahsoka")
                .setDescription("You don't have enough Credits!")
                .setFooter("Requested by " + message.author.tag, message.author.avatarURL)
                .setTimestamp();
            return message.channel.send(emb);
        } else {
            db.query("UPDATE credits SET credits = ? WHERE id = ?", [r[0]["credits"] - price, message.author.id]);
            let emb = new Discord.RichEmbed()
                .setTitle("Ahsoka - Box Opening")
                .setDescription("Opening box...")
                .setFooter("Box for " + message.author.tag, message.author.avatarURL)
                .setTimestamp();
            let embmsg = await message.channel.send(emb);
            embmsg.delete(7000);
            setTimeout(() => {
                let i = 0;
                let interval = setInterval(async () => {
                    let item = await genItem(await genRarity());
                    bh.addItem(item, message.author.id);
                    message.channel.send(await embed(item, message.author));
                    i++;
                    if (i === 4) {
                        return clearInterval(interval);
                    }
                }, 5000)
            }, 7000)
        }
    })
}

async function genRarity() {
    return new Promise(async (resolve, reject) => {
        let r = [{
            "name": "Mystical",
            "chance": 1
        }, {
            "name": "Legendary",
            "chance": 5
        }, {
            "name": "Rare",
            "chance": 25
        }, {
            "name": "Common",
            "chance": 69
        }];
        let rr = [];
        r.forEach((n) => {
            let a = n.chance * 100;
            for (let i = 0; i < a; i++) {
                rr.push(n);
            }
        });
        resolve(rr[Math.floor(Math.random() * rr.length)].name);
    });
}

async function genItem(rarity) {
    return new Promise(async (resolve, reject) => {
        db.query("SELECT * FROM items WHERE type = ?", [rarity], async (e, r) => {
            let gitem = r[Math.floor(Math.random() * r.length)];
            let item;
            if (gitem.maxowner !== -1 && gitem.owner >= gitem.maxowner || gitem.active === 0) {
                item = await genItem(rarity);
            } else {
                item = gitem;
            }
            resolve(item);
        });
    });
}

function embed(item, author) {
    let embed = new Discord.RichEmbed()
        .setTitle(item.name)
        .setImage(item.bild)
        .setDescription(item.text)
        .addField("This item is", item.type)
        .addField("Price (for selling)", item.price)
        .setFooter("Box by " + author.tag, author.avatarURL)
        .setTimestamp()
    if (item.type == "Mystical") {
        embed.setColor("#b09343")
    }
    if (item.type == "Legendary") {
        embed.setColor("#8143b0")
    }
    if (item.type == "Rare") {
        embed.setColor("#357e85")
    }
    if (item.type == "Common") {
        embed.setColor("#585759")
    }
    return embed;
}