const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const settings = client.settings.get(message.guild.id);
  const person = message.content.replace(settings.prefix, "").split(" ").slice(1)
  //message.reply(person[0])
  if (message.mentions.members.size == 0 && person[0].isNumber != false) return message.reply("you must provide a mortal in order to use this command.");
  const user = message.mentions.members.first();
  if (user === message.member) return message.reply("are you sure about that? You mortals can be awfully stupid sometimes.");
  if (user === message.guild.owner) return message.reply("as " + message.guild.owner + "'s attendant, I cannot kick them!");
  if (user.kickable == false) return message.reply("even with the power of a God, that member could not be kicked. Please make sure that the Zamasu role is higher than the users highest role and has permission to kick users.");

  //message.reply(user.user.avatarURL)
  const kickEmbed = new Discord.RichEmbed()
    .setAuthor("Zamasu's Zero Mortal Plan")
    .addField("Kicked Mortal", `${user} (${user.user.tag})`)
    .addField("Moderator", `${message.author} (${message.member.user.tag})`)
    .addField("Reason", args.join(" ").split(person[0] + " ")[1])
    .setFooter("Sent via Zamasu", client.user.avatarURL)
    .setThumbnail(user.user.avatarURL)
    .setTimestamp()
    .setColor(0x74D15C);

  message.channel.send({
    embed: kickEmbed
  });

  await message.guild.members.get(user.id).kick(message.author.tag + " kicked via Zamasu's Zero Mortals Plan").catch(err => {
    return message.reply("unable to ban the user, please try again later."), console.log(err);
  });

  message.guild.channels.filter(c => c.name === settings.modLogChannel).first().send({
    embed: kickEmbed
  }).catch(err => console.log(err));


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Guardian"
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "kicks a mortal (mod role only)",
  usage: "kick NAME reason"
};
