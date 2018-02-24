const {
  inspect
} = require("util");

exports.run = (client, message) => {
  const Discord = require("discord.js");
  message.delete();
  var changelog = inspect(client.settings.get("352984490693623829").changelog)
  var changelogText = changelog.substr(1).slice(0, -1).split(" ")
  var date = changelogText[0]
  var change = changelogText.slice(1)
    const changeEmbed = new Discord.RichEmbed()
      .setTitle(`Zamasu Changelog`)
      .setTimestamp()
      .addField(`${date}`, change.join(" "))
      .setFooter("Sent via Zamasu", client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setTimestamp()
      .setColor(0x74D15C);
    message.channel.send({
      embed: changeEmbed
    });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["change"],
  permLevel: 0
};

exports.help = {
  name: 'changelog',
  description: 'Get info about changes to Zamasu.',
  usage: 'changelog'
};

//Dev Notes: Please update change logs when changes are added/removed/fixed on M8 Bot.
