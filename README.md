# Annoying Discord Bot

This bot follows a specified user in the server and serenades them in a voice channel.

## Creating a Discord Bot

Follow steps 1-7 [here](https://discordpy.readthedocs.io/en/stable/discord.html#creating-a-bot-account) to create your discord bot app. Save your bot token for the next step. **Do not share your bot token with anyone.**

## Installation

1. Clone the repo
2. Install the required dependencies using the command: `npm i`
3. Create a `.env` file and copy `TOKEN = "[Bot Token]"` into the file, replace `[Bot Token]` with your bot token

## Inviting the Bot to Your Server

Invite the bot into a server by following steps 1-7 [here](https://discordpy.readthedocs.io/en/stable/discord.html#inviting-your-bot)

## Customizing the Bot

1. To replace the default audio resources:
   - Replace the audio files in the `assets` folder with your own audio resources
   - In `setup.js`, `AUDIO_OPTIONS` represents audio options and their associated paths. Add/remove/edit the object to set up your own audio resources as needed
2. Change `PREFIX` in `setup.js` to change your bot's command

## Running the Bot

1. Run the program using the command: `node .`
2. Enter a command in any text channel in your server in the following format: `[command] [userID] [#]`
   - Replace `[command]` with the value of `PREFIX` in `setup.js`
   - Replace `[userID]` with the user ID of the person you want the bot to follow, [here's how to find discord user IDs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
   - Replace `[#]` with a property name in the `AUDIO_OPTIONS` object in `setup.js`
