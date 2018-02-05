const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const settings = client.settings.get(message.guild.id);
  const person = message.content.replace(settings.prefix, "").split(" ").slice(1);
  //message.reply(person[0])
  if (message.mentions.members.size == 0 && person[0].isNumber != false) return message.reply("you must provide a mortal in order to use this command.");
  const user = message.mentions.members.first();
  if (user === message.member) return message.reply("you mortals are so stupid, you can't warn yourself!");
  if (user === message.guild.owner) return message.reply("as " + message.guild.owner + "'s attendant, I cannot warn them!");

  //message.reply(user.user.avatarURL)
  const warnEmbed = new Discord.RichEmbed()
    .setAuthor("Zamasu's Zero Mortals Plan")
    .addField("Warned Mortal", `${user} (${user.user.tag})`)
    .addField("Moderator", `${message.author} (${message.member.user.tag})`)
    .addField("Reason", args.join(" ").split(person[0] + " ")[1])
    .setFooter("Sent via Zamasu", client.user.avatarURL)
    .setThumbnail(user.user.avatarURL)
    .setTimestamp()
    .setColor(0x74D15C);

  message.channel.send({
    embed: warnEmbed
  });

  message.guild.channels.filter(c => c.name === settings.modLogChannel).first().send({
    embed: warnEmbed
  }).catch(err => console.log(err));


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Guardian"
};

exports.help = {
  name: "warn",
  category: "Moderation",
  description: "Warns a mortal (mod role only)",
  usage: "warn NAME"
};
