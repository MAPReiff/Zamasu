// This event executes when a new guild (server) is joined.
//const Discord = require("discord.js");

//var rootDir = __dirname.replace("events", "");
//const settings = require(rootDir + "./config.js");

module.exports = (client, guild) => {
  // We need to add this guild to our settings!
  client.settings.set(guild.id, client.config.defaultSettings);
  //const fetch = require("snekfetch");

  console.log("I just joined a new server called " + guild.name);
  // if added to discord bots .org list
  // new fetch("POST", `https://discordbots.org/api/bots/${client.user.id}/stats`)
  //   .set("Authorization", settings.discordbots_org)
  //   .send({
  //     server_count: client.guilds.size
  //   })
  //   .then(() => console.log("Updated dbots.org status.")).catch((e) => e);

  guild.channels.first().send("Hello filthy mortals, I am the God Zamasu! I have been resurrected thanks to the Super Dragon Balls, and I am here to punish mortals who step out of line.\nA list of my commands can be found by using \"z.help\". Server owners and customizer their Zero Mortals Plans by running \"z.set\" to view the config, and \"z.set edit <setting> <new option>\".");



};
