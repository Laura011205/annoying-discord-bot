// Imports
import { Client, Intents } from "discord.js";
const myIntents = new Intents([
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILDS,
]);
const client = new Client({
  intents: myIntents,
});
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
} from "@discordjs/voice";
import { PREFIX, AUDIO_OPTIONS } from "./setup.js";
import dotenv from "dotenv";
dotenv.config();

// Set up global variables
let targetID = 0;
let audioPath = AUDIO_OPTIONS[1];

// Handle incoming messages
client.on("messageCreate", (message) => {
  // Do nothing if the message is not a command
  if (!message.content.startsWith(PREFIX)) {
    return;
  }

  // Validate userID
  const userID = getUserID(message);
  if (!userID) {
    message.author.send(
      "Invalid userID\nCommand format: " + PREFIX + " [userID] [#]"
    );
    return;
  }

  // UserID is valid, set target
  targetID = userID;
  const target = message.guild.members.cache.get(userID);

  // Get audio path
  audioPath = getAudioOption(message);

  // Join user's channel if the user is in a voice channel when the command is sent
  if (target.voice.channel !== null) {
    const connection = joinChannel(target.voice.channel);
    playAudio(audioPath, connection);
  }
});

// Set audio option
function getAudioOption(message) {
  const option = message.content.split(" ")[2];
  // If audio option is valid, set path to chosen audio
  if (option !== null && option in AUDIO_OPTIONS) {
    return AUDIO_OPTIONS[option];
  }
  // Otherwise default audio option
  else {
    return AUDIO_OPTIONS[1];
  }
}

// Validate userID
function getUserID(message) {
  // If it is a valid command, get userID
  const userID = message.content.split(" ")[1];

  // If userID not specified or if userID is invalid
  if (userID == null || message.guild.members.cache.get(userID) == null) {
    return 0;
  }

  return userID;
}

// Handle voice channel state changes
client.on("voiceStateUpdate", (oldState, newState) => {
  // If the state change involves the target
  if (newState.id === targetID) {
    // If the target left a voice channel, leave with them
    if (newState.channel === null) {
      const connection = getVoiceConnection(oldState.channel.guild.id);
      connection.destroy();
    }
    // If the target joined a voice channel, join with them
    else {
      const connection = joinChannel(newState.channel);
      playAudio(audioPath, connection);
    }
  }
});

// Play audio in specified channel
function playAudio(audioPath, connection) {
  // Set up audio player and audio resource
  const player = createAudioPlayer();
  const resource = createAudioResource(audioPath);

  // Play audio resource
  player.play(resource);
  connection.subscribe(player);

  // Loop audio resource until next voice state change/command
  player.on(AudioPlayerStatus.Idle, () => {
    const resource = createAudioResource(audioPath);
    player.play(resource);
  });
}

// Join voice channel
function joinChannel(channel) {
  // Create voice connection
  return joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
}

// Confirm online status
client.on("ready", () => {
  console.log("Bot is online");
});

// login discord bot
client.login(process.env.TOKEN);
