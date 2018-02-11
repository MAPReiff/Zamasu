const { inspect } = require("util");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const settings = message.guild ?
    client.settings.get(args[0]) :
    client.config.defaultSettings;

    if (settings == undefined){
      return message.reply(`I am not in a guild with the ID ${args[0]}.`)
    }

//  message.settings = settings;
  //message.channel.send(settings)
  message.channel.send(inspect(settings), {code: "json"});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Angelic Attendant"
};

exports.help = {
  name: "setget",
  category: "System",
  description: "Get the settings for a guild from it's ID (Bot Support Only)",
  usage: "setget ID"
};
