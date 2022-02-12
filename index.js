const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const voiceDiscord = require("@discordjs/voice");
require('dotenv').config();

let targetID = 0;
const PREFIX = "!troll"

// handle troll command
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(PREFIX)){
        return;
    }
    // if it is a valid command, get userID
    let userID = message.content.split(" ")[1];
    // if userID not specified
    if (userID === null) {
        message.author.send("Enter an user ID after the command in this format: !troll [userID]");
        return;
    }
    // find the user to troll using given userID
    let target = message.guild.members.cache.get(userID);
    // if userID is invalid
    if (target === null) {
        message.author.send("Enter a VALID user ID after the command in this format: !troll [userID]");
        return;
    }
    // userID is valid, set the targetID to userID
    targetID = userID;
    // join user's channel if the user is in a voice channel when the command is sent
    if (target.voice.channel !== null) {
        playAudio(target.voice.channel);
    }
});

// handle voice channel state changes
client.on("voiceStateUpdate", (oldState, newState) => {
    // if the state change involves the target
    if (newState.id === targetID) {
        // if the target left a voice channel, leave with them
        if (newState.channel === null) {
            const connection = voiceDiscord.getVoiceConnection(oldState.channel.guild.id);
            connection.destroy();
        }
        // if the target joined a voice channel, join with them
        else {
            playAudio(newState.channel);
        }
    }
})

// Play audio in specified channel
function playAudio(channel) {
    const connection = joinChannel(channel);
    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource('assets/banana.mp3');
    player.play(resource);
    connection.subscribe(player);
}

// Join voice channel
function joinChannel(channel) {
    const connection = voiceDiscord.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    return connection;
}

// Confirm online status
client.on("ready", () => {
    console.log("Annoying Bob is online");
});

// login discord bot
client.login(process.env.TOKEN);