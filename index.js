const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// 🔑 TU TOKEN
const TOKEN = process.env.TOKEN;

// 📌 ID DEL CANAL DONDE SE ENVÍA LA BIENVENIDA
const WELCOME_CHANNEL_ID = "1475262242118307841";

client.once('ready', () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {

  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor('#111318')
    .setTitle('ʚ Welcome ɞ')
    .setDescription(`
╭┈┈┈┈୨♡୧┈┈┈┈╮
╰┈┈┈┈୨♡୧┈┈┈┈╯

🌷 Hola ${member}

Bienvenido/a a **${member.guild.name}**
Ahora somos ✧ ${member.guild.memberCount} ✧ miembros

📜 ︴<#1466283027050135706>
✅ ︴<#1475247150043631768>

♡ disfruta tu estadía ♡
    `)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: 'made with love ✨' })
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

client.login(TOKEN);