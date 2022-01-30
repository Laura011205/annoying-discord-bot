const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

let targetID = 0;
const PREFIX = "!troll"

function joinVoiceChannel(channel) {
    console.log("Joining user's voice channel!");
}

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(PREFIX)){
        return;
    }
    // if it is a valid command, get userID
    let userID = message.content.split(" ")[1];
    // if userID not specified
    if (userID == null) {
        message.author.send("Enter an user ID after the command in this format: !troll [userID]");
        return;
    }
    // find the user to troll using given userID
    let target = message.guild.members.cache.get(userID);
    // if userID is invalid
    if (target == null) {
        message.author.send("Enter a VALID user ID after the command in this format: !troll [userID]");
        return;
    }
    // userID is valid, set the targetID to userID
    targetID = userID;
    // join user's channel
    if (target.voice.channel != null) {
        joinVoiceChannel(target.voice.channel);
    }
});

client.on("ready", () => {
    console.log("Annoying Bob is online");
});

client.login("OTM0NjQ3NzI3Nzg1MTQ4NTA3.YezIhw.EHM9lmrPBPWcDGI0WPBNyzBBM6s");