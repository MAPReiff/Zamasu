

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const settings = message.guild ?
    client.settings.get(message.guild.id) :
    client.config.defaultSettings;

  message.settings = settings;
  message.channel.send(`Welcome to the Zamasu setup instructions.
  First, you can view your server's config by running the command ${settings.prefix}set
  Once you know what settings you want to change, run ${settings.prefix}set edit <setting> <new value>
  If you would like a much more detailed guide, please visit https://m8bot.js.org/#Zamasu`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Mortal"
};

exports.help = {
  name: "config-help",
  category: "System",
  description: "Instructions to setup the bot.",
  usage: "config-help"
};
