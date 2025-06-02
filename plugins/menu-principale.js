import fetch from 'node-fetch';

let handler = async (message, { conn, usedPrefix }) => {
  const senderName = await conn.getName(message.sender);
  const targetJid = message.quoted
    ? message.quoted.sender
    : message.mentionedJid && message.mentionedJid.length > 0
    ? message.mentionedJid[0]
    : message.fromMe
    ? conn.user.jid
    : message.sender;

  // Ottieni immagine profilo o fallback
  let profilePicBuffer;
  try {
    const profilePicUrl = await conn.profilePictureUrl(targetJid, 'image');
    const response = await fetch(profilePicUrl);
    profilePicBuffer = await response.buffer();
  } catch {
    const fallbackUrl = 'https://telegra.ph/file/22b3e3d2a7b9f346e21b3.png';
    const response = await fetch(fallbackUrl);
    profilePicBuffer = await response.buffer();
  }

  const botName = "𝔄𝔪𝔞𝔫𝔢 𝔉𝔲𝔰𝔥𝔦𝔪𝔞𝔰𝔞𝔨𝔦"; // Nome aggiornato
  const vs = '1.0';

  // Menu con stile Astrale-Ombra
  const commandList = `
☾✦『 𝔐𝔈𝔑𝕌 𝔄𝔖𝔗ℜ𝔄𝔏𝔈-𝔒𝔐𝔅ℜ𝔄 』✦☽

☄️  𝗣𝗿𝗼𝗽𝗿𝗶𝗲𝘁𝗮𝗿𝗶𝗼 ⚠️  
🪐  Ｆ𝓊𝓃𝓏𝒾𝑜𝓃𝒾 𝓖𝓁𝒾𝓉𝒸𝒽💥  
💫  𝔄𝔡𝔪𝔦𝔫 𝕊𝕙𝕒𝕕𝕠𝕨  
🌠  𝔊𝔯𝔲𝔭𝔭𝔬 𝓐𝓼𝓽𝓻𝓪𝓵  
🛸  𝕆𝕨𝕟𝕖𝕣 ✦𝓛𝓾𝓬𝓲𝓭𝓸✦  
🌙  𝒞𝓇𝑒𝒹𝒾𝓉𝒾 ☾  
🌌  𝓢𝓾𝓅𝓅𝓸𝓇𝓉𝓸 𝕄𝕚𝕤𝕥𝕖𝕣𝕚𝕠𝕤𝕠  
🔭  𝔅𝔬𝔱𝔦𝔫𝔣𝔬 ☢️  

✦━━━━━━━━━━━━━✦  
✨ 𝔄𝔪𝔞𝔫𝔢 𝔉𝔲𝔰𝔥𝔦𝔪𝔞𝔰𝔞𝔨𝔦 𝔅𝔬𝔱 ✨
`;

  await conn.sendMessage(message.chat, {
    text: commandList.trim(),
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      externalAdReply: {
        title: senderName,
        body: `𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞 𝐁𝐨𝐭: ${vs}`,
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: "PHOTO",
        thumbnail: profilePicBuffer,
        sourceUrl: 'https://github.com/your-repo'
      }
    }
  });
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;