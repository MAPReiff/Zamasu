// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);
  var guild = member.guild;

  if (settings.defaultRoleEnabled == "true") {
    member.addRole(guild.roles.find("name", settings.defaultRole));
  }

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag).replace("{{serverName}}", member.guild.name).replace("{{memberCount}}", member.guild.memberCount);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
