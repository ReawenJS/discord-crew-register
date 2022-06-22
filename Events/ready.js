const Discord = require("discord.js");
const client = global.client;

exports.execute = async() => {
console.log(".");
client.user.setPresence({ activities: [{ name: "reawen 💗 arox", type: "PLAYING" }], status: "idle" });
};
exports.conf = {
  event: "ready"
};
