
const isimler = require("../schemas/isimler");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
    "code": "kayıt",

    
    async run (client, message, args) {
      
          const embed = new MessageEmbed()
      .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor('#010000')
      .setFooter({ text: "#FUCKTHEPOPULATION", iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        
        const buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('erkek')
                .setLabel("Koios")
                .setStyle('PRIMARY')
                .setEmoji(`🎩`))
        .addComponents(
            new MessageButton()
                .setCustomId('kadın')
                .setLabel("Ladies")
                .setStyle('SUCCESS')
                .setEmoji(`🌹`))
        .addComponents(
            new MessageButton()
                .setCustomId('iptal')
                .setEmoji(`🚫`)
                .setStyle('DANGER'))



     if (!message.member.permissions.has(8) && !config.Roles.Register.some((x) => message.member.roles.cache.get(x))) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));

     let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
     if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir üye belirtmelisiniz.\n\n\> .kayıt @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
     const data = await isimler.findOne({ guildID: message.guild.id, userID: member.user.id });




    if(config.Modes.Tag == true) {
    if (!config.Other.Tag.some((x) => member.user.tag.includes(x)) && !member.roles.cache.has(config.Roles.Vip) && !member.roles.cache.has(config.Roles.Booster)) {
    return message.reply({ embeds: [embed.setDescription(`🚫 Üzgünüm, ${member}. Sunucumuz şu an **Taglı Alım**dadır. Sunucumuza kayıt olmak için ${config.Other.Tag.map((x) => x).join(", ")} taglarından en az birini almalı, **boost** basmalı ya da **VIP** üye olmalısın.`)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
        }
      }

    const isim = args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() + args[1].slice(1).toLocaleLowerCase();
    const age = args[2];
    var name;
    if (config.Modes.Name == true) {
    if (!isim) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisiniz.\n\n\> .kayıt @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
    if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisiniz.\n\n\> .kayıt @Reawen/ID Kuzey 18")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
    name = `${config.Other.NamePrefix ? config.Other.NamePrefix : ""} ${isim} ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} ${age}`;
} else  {
    let isim = args.slice(1).join(" ")
    if (!isim) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisiniz.\n\n\> .kayıt @Reawen/ID Kuzey")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
    name = isim;
}


message.channel.send({ embeds: [embed.setDescription(`${member} isimli üyenin ismi \`${name}\` olarak değiştirildi.\n\n${data ? `Kullanıcının ${data.isimler.length} tane kayıt geçmişi bulundu.` : ""}\n${data ? `${data.isimler.splice(0, 5).map((x, i) => `\`${x.name}\` (<@&${x.rol}>) (<@${x.yetkili}>)`).join("\n")}` : ""}`)], components: [buttons] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 15000));
const filter = (i => i.user.id === message.member.id);
const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
collector.on('collect', async (button) => {
    if (button.isButton()) {
        if (button.customId === "erkek") {
            member.setNickname(name).catch((x) => console.error(x));
            member.roles.set(config.Roles.Man).catch((x) => console.error(x));
            await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { isimler: { name: name, yetkili: message.author.id,  rol: config.Roles.Man[0], date: Date.now() } } }, { upsert: true });
            message.reply({ embeds: [embed.setDescription(`${member} isimli üye **Erkek** olarak kayıt edildi!`)]}).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 15000));
            if (config.Modes.ChatMessages == true) message.guild.channels.cache.get(config.Channels.Chat).send({ embeds: [embed.setDescription(`Aramıza hoş geldin! ${member}. Sunucumuzun kuralları ${config.Channels.Rules ? `<#${config.Channels.Rules}>` : "#kurallar"} isimli kanallarda belirtilmiştir. Seninle birlikte sunucumuz **${message.guild.memberCount}** adet kişiye ulaştı!`)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 15000));
        } else  if (button.customId === "kadın") {
            member.setNickname(name).catch((x) => console.error(x));
            member.roles.set(config.Roles.Woman).catch((x) => console.error(x));
            await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { isimler: { name: name, yetkili: message.author.id,  rol: config.Roles.Woman[0], date: Date.now() } } }, { upsert: true });
            message.reply({ embeds: [embed.setDescription(`${member} isimli üye **Kadın** olarak kayıt edildi!`)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 15000));
            if (config.Modes.ChatMessages == true) message.guild.channels.cache.get(config.Channels.Chat).send({ embeds: [embed.setDescription(`Aramıza hoş geldin! ${member}. Sunucumuzun kuralları ${config.Channels.Rules ? `<#${config.Channels.Rules}>` : "#kurallar"} isimli kanallarda belirtilmiştir. Seninle birlikte sunucumuz **${message.guild.memberCount}** adet kişiye ulaştı!`)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 15000));
        }  else  if (button.customId === "iptal") {
            collector.stop()
            button.message.delete().catch(e => { console.error(e) })
            message.reply({ embeds: [embed.setDescription(`İşlem iptal edildi!`)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));


        }
    }
    collector.stop()
    button.message.delete().catch(e => { console.error(e) })

})


}};
  