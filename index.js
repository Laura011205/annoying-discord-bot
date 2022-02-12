const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const voiceDiscord = require('@discordjs/voice');
require('dotenv').config();

let targetID = 0;
const PREFIX = '!bob';
const AUDIO_OPTIONS = {
    'banana': 'assets/banana.mp3',
    'ymca': 'assets/ymca.mp3',
    'papa': 'assets/papa-mama-loca-pipa.mp3',
}
let audioPath = AUDIO_OPTIONS['banana'];

// Handle incoming messages
client.on("messageCreate", (message) => {
    // Do nothing if the message is bot a command
    if (!message.content.startsWith(PREFIX)){
        return;
    }

    // If it is a valid command, get userID
    let userID = message.content.split(" ")[1];
    // If userID not specified
    if (userID == null) {
        message.author.send("Enter an user ID after the command in this format: !bob [userID]");
        return;
    }

    // Find the user to troll using given userID
    let target = message.guild.members.cache.get(userID);
    // If userID is invalid
    if (target == null) {
        message.author.send("Enter a VALID user ID after the command in this format: !bob [userID]");
        return;
    }
    // UserID is valid, set the targetID to userID
    targetID = userID;

    // Get audio option
    let option = message.content.split(" ")[2];
    // If audio option is valid, set path to chosen audio
    if (option !== null && option in AUDIO_OPTIONS) {
        audioPath = AUDIO_OPTIONS[option];
    } else {
        audioPath = AUDIO_OPTIONS['banana'];
    }

    // Join user's channel if the user is in a voice channel when the command is sent
    if (target.voice.channel !== null) {
        playAudio(target.voice.channel, audioPath);
    }
});

// Handle voice channel state changes
client.on("voiceStateUpdate", (oldState, newState) => {
    // If the state change involves the target
    if (newState.id === targetID) {
        // If the target left a voice channel, leave with them
        if (newState.channel === null) {
            const connection = voiceDiscord.getVoiceConnection(oldState.channel.guild.id);
            connection.destroy();
        }
        // If the target joined a voice channel, join with them
        else {
            playAudio(newState.channel, audioPath);
        }
    }
})

// Play audio in specified channel
function playAudio(channel, audioPath) {
    // Join specified channel
    const connection = joinChannel(channel);

    // Set up audio player and audio resource
    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(audioPath);

    // Play audio resource
    player.play(resource);
    connection.subscribe(player);
    
    // Loop audio resource until next voice state change/command
    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
        const resource = voiceDiscord.createAudioResource(audioPath);
        player.play(resource);
    })
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
    console.log("King Bob is online");
});

// login discord bot
client.login(process.env.TOKEN);