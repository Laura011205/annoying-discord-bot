const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

client.on("ready", () => {
    console.log("Annoying Bob is online");
});

client.login("OTM0NjQ3NzI3Nzg1MTQ4NTA3.YezIhw.EHM9lmrPBPWcDGI0WPBNyzBBM6s");