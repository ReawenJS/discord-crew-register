const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
    "code": "say",

    
    async run (client, message, args) {

        const embed = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('#010000')
        .setFooter({ text: "#FUCKTHEPOPULATION", iconURL: message.author.displayAvatarURL({ dynamic: true }) })


     if (!message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
     

     const tag = config.Other.Tag;
     const etiket = "0420";
message.reply({ embeds: [embed.setDescription(`
\`•\` Sunucumzuda toplam **${message.guild.memberCount}** adet üye bulunmakta.
\`•\` Sunucumzuda toplam **${message.guild.members.cache.filter((member) => tag.some((x) => member.user.tag.includes(x))).size}** adet taglı üye bulunmakta. Bu üyelerin **${message.guild.members.cache.filter((member) => member.user.discriminator == (etiket)).size}** tanesi etiket tagımızda.
\`•\` Sunucumuzun sesli kanallarında toplam **${message.guild.members.cache.filter((member) => member.voice.channel).size}** adet üye bulunmakta.
`)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
  }};
  