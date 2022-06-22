const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
  "code": "sil",

  
  async run (client, message, args) {

    const embed = new MessageEmbed()
    .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setColor('#010000')
    .setFooter({ text: "#FUCKTHEPOPULATION", iconURL: message.author.displayAvatarURL({ dynamic: true }) })



   if (!message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
   let x = args[0];
   if (!x) return message.reply({ embeds: [embed.setDescription("Geçerli bir sayı belirtmelisiniz.\n\n\> .sil 99")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
   if (Number(x) < 1 || Number(x) > 100 || x && isNaN(x)) return message.reply({ embeds: [embed.setDescription("Geçerli bir sayı belirtmelisiniz.\n\n\>.sil 99")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
  message.channel.bulkDelete(x).then((messages) => message.reply({ embeds: [embed.setDescription("**" + messages.size + "** mesaj silindi!")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000)));
}};
