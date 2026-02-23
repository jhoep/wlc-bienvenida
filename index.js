const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder 
} = require('discord.js');
const express = require('express');
const app = express();

// ===============================
// 🌐 WEB SERVICE PARA RENDER 24/7
// ===============================
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Bot activo 24/7 🚀');
});
app.listen(PORT, () => {
  console.log(`🌐 Web service activo en puerto ${PORT}`);
});

// ===============================
// 🤖 CONFIGURACIÓN DEL BOT
// ===============================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = process.env.TOKEN;

// 🔹 CANALES
const WELCOME_CHANNEL_ID = "1475262242118307841";
const BOOST_LOG_CHANNEL_ID = "1466283028178276526";

client.once('ready', () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

// ===============================
// 👋 BIENVENIDA
// ===============================
client.on('guildMemberAdd', async (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor('#111318')
    .setDescription(`
╭┈┈┈┈୨♡୧┈┈┈┈╮
✦ ʚ WELCOME ɞ ✦
╰┈┈┈┈୨♡୧┈┈┈┈╯
> ¡Hola! ${member}
> Bienvenido/a a **${member.guild.name}**
> Ahora somos ✧ **${member.guild.memberCount}** ✧ miembros
📜 ︴<#1466283027050135706>
✅ ︴<#1475247150043631768>
**♡ disfruta tu estadía ♡**
    `)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setImage('https://i.imgur.com/Ucx2IKo.png')
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// ===============================
// 💜 LOGS DE BOOST
// ===============================
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const logChannel = newMember.guild.channels.cache.get(BOOST_LOG_CHANNEL_ID);
  if (!logChannel) return;

  const wasBosting = oldMember.premiumSince;
  const isBosting = newMember.premiumSince;

  // Empezó a boostear
  if (!wasBosting && isBosting) {
    const totalBoosts = newMember.guild.premiumSubscriptionCount;
    const boostTier = newMember.guild.premiumTier;

    const embed = new EmbedBuilder()
      .setColor('#f47fff')
      .setAuthor({
        name: newMember.user.tag,
        iconURL: newMember.user.displayAvatarURL({ dynamic: true })
      })
      .setDescription(`
╭┈┈┈┈୨♡୧┈┈┈┈╮
✦ ʚ BOOST ɞ ✦
╰┈┈┈┈୨♡୧┈┈┈┈╯
> 💜 ${newMember} acaba de boostear el servidor!
> ✨ Gracias por apoyar **${newMember.guild.name}**
> 🚀 Boosts totales: **${totalBoosts}**
> 🏆 Nivel actual: **${boostTier}**
**♡ gracias por tu apoyo ♡**
      `)
      .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  }

  // Dejó de boostear
  if (wasBosting && !isBosting) {
    const totalBoosts = newMember.guild.premiumSubscriptionCount;

    const embed = new EmbedBuilder()
      .setColor('#111318')
      .setAuthor({
        name: newMember.user.tag,
        iconURL: newMember.user.displayAvatarURL({ dynamic: true })
      })
      .setDescription(`
╭┈┈┈┈୨♡୧┈┈┈┈╮
✦ ʚ BOOST REMOVED ɞ ✦
╰┈┈┈┈୨♡୧┈┈┈┈╯
> 🩶 ${newMember} retiró su boost del servidor.
> 💔 Boosts totales: **${totalBoosts}**
      `)
      .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  }
});

client.login(TOKEN);
