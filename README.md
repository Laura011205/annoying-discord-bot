# Annoying Discord Bot

This bot follows a specified user in the server and serenades them in a voice channel.

## Creating a Discord Bot

Navigate to [this link](https://discord.com/developers/applications) and follow the steps [here](https://discordpy.readthedocs.io/en/stable/discord.html#creating-a-bot-account) to create your discord bot app. Save your bot token for the next step. **Do not share your bot token with anyone.**

## Installation

1. Clone the repo
2. Install the required dependencies using the command: `npm i`
3. Create a `.env` file and copy `TOKEN = "[Your Bot Token]"` into the file, replace `[Your bot Token]` with your bot token

## Adding the Bot to Your Server

1. Invite the bot into a server follow the steps [here](https://discordpy.readthedocs.io/en/stable/discord.html#inviting-your-bot)
2. Run the program using the command: `node .`
3. Enter a command in any text channel in your server in the following format: `!bob [userID] [audio#]`
   - Replace `[userID]` with the user ID of the person you want the bot to follow, [here's how to find discord user IDs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
   - Replace `[audio#]` with a number in your audio file names

## Customizing the Bot

1. To replace the default audio files:
   - Replace the audio files in `/assets` with your own audio files
   - Add/remove/replace audio paths by changing the `AUDIO_OPTIONS` file in `setup.js` as needed
2. Change `PREFIX` in `setup.js` to change your bot's command
