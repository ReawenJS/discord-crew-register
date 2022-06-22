const names = require("../schemas/isimler");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
    "code": "isimler",

    
    async run (client, message, args) {

        const embed = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('#010000')
        .setFooter({ text: "#FUCKTHEPOPULATION", iconURL: message.author.displayAvatarURL({ dynamic: true }) })

     if (!message.member.permissions.has(8) && !config.Roles.Register.some((x) => message.member.roles.cache.get(x))) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
     let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
     if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir üye belirtmelisiniz.\n\n\> .isimler @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));

     let nameData = await names.findOne({ guildID: message.guild.id, userID: member.id });

     message.reply({ embeds: [embed.setDescription(`
     
**${nameData ? `${nameData.isimler.length}` : "0"}** adet isim geçmişi görüntülendi. 
${nameData ? nameData.isimler.splice(0, 20).map((x, i) => `\`${x.name}\` (${x.rol == "Sunucudan Ayrılma" ? "Sunucudan Ayrılma" : `<@&${x.rol}>`})`).join("\n") : ""}
    
 `)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 30000));


    }};
  