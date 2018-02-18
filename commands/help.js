exports.run = (client, message, args, level) => {
  const Discord = require("discord.js");
  const settings = require("../config.js");
  const mainFile = require("../index.js");
    message.delete();
    const helpEmbed = new Discord.RichEmbed()
      .setTitle("Zamasu Version " + mainFile.version)
      .setColor(0x74D15C)
      .setFooter("Sent via Zamasu", client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setTimestamp()
      .addField("Help Page", "A full list of commands can be found at https://m8bot.js.org/#Zamasu under the Commands section.");
    message.channel.send({
      embed: helpEmbed
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "Mortal"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
