// This event executes when a guild (server) is left.
const Discord = require("discord.js");

var rootDir = __dirname.replace("events", "");
const settings = require(rootDir + "./config.js");
module.exports = (client, guild) => {
  // Well they're gone. Let's remove them from the settings!
  client.settings.delete(guild.id);

  const fetch = require("snekfetch");

  // discordbots.org
  new fetch("POST", `https://discordbots.org/api/bots/${client.user.id}/stats`)
    .set("Authorization", settings.discordbots_org)
    .send({
      server_count: client.guilds.size
    })
    .then(() => console.log("Updated dbots.org status.")).catch((e) => e);

  // bots.discord.pw
  new fetch("POST", `https://bots.discord.pw/api/bots/${client.user.id}/stats`)
    .set("Authorization", settings.discordbot_pw)
    .send({
      server_count: client.guilds.size
    }).then(() => console.log("Updated bots.discord.pw status.")).catch((e) => e);


};
