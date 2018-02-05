exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.delete();
  message.channel.send("Are you sure you want to reboot?\n\nReply with `cancel` to abort the reboot. The reboot will self-abort in 30 seconds");
  return message.channel.awaitMessages(m => m.author.id === message.author.id, {
    "errors": ["time"],
    "max": 1,
    time: 30000
  }).then(resp => {
    if (!resp) return;
    resp = resp.array()[0];
    const validAnswers = ["yes", "y", "no", "n", "cancel"];
    if (validAnswers.includes(resp.content)) {
      if (resp.content === "cancel" || resp.content === "no" || resp.content === "n") {
        return message.channel.send("Aborting reboot");
      } else if (resp.content === "yes" || resp.content === "y") {
        client.destroy().then(() => {
          process.exit();
        }).catch(error => console.error(error));
      }
    } else {
      message.channel.send(`Only \`${validAnswers.join("`, `")}\` are valid, please supply one of those.`).catch(error => console.error(error));
    }
  }).catch(error => {
    console.error(error);
    message.channel.send("Reboot timed out");
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: "God of Destruction"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Restarts the bot (bot owner only).",
  usage: "reboot"
};
