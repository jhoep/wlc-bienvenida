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

// 🔹 ID DEL CANAL DE BIENVENIDA
const WELCOME_CHANNEL_ID = "1475262242118307841";

client.once('ready', () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor('#111318')
    .setDescription(`
╭┈┈┈┈୨♡୧┈┈┈┈╮
       ✦ ʚ WELCOME ɞ ✦
╰┈┈┈┈୨♡୧┈┈┈┈╯

¡Hola! ${member}
Bienvenido/a a **${member.guild.name}**
Ahora somos ✧ ${member.guild.memberCount} ✧ miembros

📜 ︴<#1466283027050135706>
✅ ︴<#1475247150043631768>

♡ disfruta tu estadía ♡
    `)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setImage('https://i.imgur.com/Ucx2IKo.png')
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

client.login(TOKEN);


