const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const settings = client.settings.get(message.guild.id);
  const person = message.content.replace(settings.prefix, "").split(" ").slice(1)
  //message.reply(person[0])
  if (message.mentions.members.size == 0 && person[0].isNumber != false) return message.reply("you must provide a mortal in order to use this command.");
  const user = message.mentions.members.first();
  if (user === message.member) return message.reply("are you sure about that? You mortals can be awfully stupid sometimes.");
  if (user === message.guild.owner) return message.reply("as " + message.guild.owner + "'s attendant, I cannot ban them!");
  if (user.kickable == false) return message.reply("that mortal could not be banned, please make sure that the Zamasu role is higher than the users highest role and has permission to ban users.");

  //message.reply(user.user.avatarURL)
  const banEmbed = new Discord.RichEmbed()
    .setAuthor("Zamasu's Zero Mortals Plan")
    .addField("Banned Mortal", `${user} (${user.user.tag})`)
    .addField("Moderator", `${message.author} (${message.member.user.tag})`)
    .addField("Reason", args.join(" ").split(person[0] + " ")[1])
    .setFooter("Sent via Zamasu", client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(user.user.avatarURL)
    .setColor(0x74D15C);

  message.channel.send({
    embed: banEmbed
  });

  await message.guild.members.get(user.id).ban(message.author.tag + " banned via Zamasu's Zero Mortals Plan").catch(err => {
    return message.reply("unable to ban the mortal, please try again later."), console.log(err);
  });

  message.guild.channels.filter(c => c.name === settings.modLogChannel).first().send({
    embed: banEmbed
  }).catch(err => console.log(err));


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Supreme Kai"
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans a mortal (admin role only)",
  usage: "ban NAME reason"
};
