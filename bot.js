#!/usr/bin/env node
const dice = require('./diceroll');
const twitch = require('./twitchClips');
const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', async (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(`${bot.username} - (${bot.id})`);
});
bot.on('message', async (user, userID, channelID, message, evt) => {
    let msgOutput = '';
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 2) == '!2') {
        let args = message.substring(2).split(' ');
        const cmd = args[0];

        args = args.splice(1);

        switch (cmd.toLowerCase()) {
            // !ping
            case 'ping':
                // console.log(bot);
                const avatarID = bot.users[userID].avatar;
                bot.sendMessage({
                    to: channelID,
                    message: `Pong! https://cdn.discordapp.com/avatars/${userID}/a_${avatarID}.png`
                });
                break;

            case 'diceroll':
                const diceType = Math.floor(args[0].substr(1));
                const numDiceThrows = Math.floor(parseInt(args[1], 10));
                msgOutput = await dice.diceRoll(diceType, numDiceThrows, user);

                bot.sendMessage({
                    to: channelID,
                    message: msgOutput
                });
                break;

            case 'twitch':
                const gameName = args.join(' ');
                msgOutput = await twitch.twitchClips(gameName, user);

                bot.sendMessage({
                    to: channelID,
                    message: msgOutput
                });
                break;
            default:
                msgOutput = `${msgOutput}Hello! I am Test Bot!\nHere is a list of my current commands:\n    !2ping  -- this returns the word Pong! with your profile picture\n    !2diceroll  {dice type} {number of dice}  -- this will do a dice roll and return the results. Example: '!2diceroll d20 6' will throw 6 d20s\n    !2twitch {name of game}  -- this will return a random game clip from Twitch from the game specified. If you do 'whatever' as the name of the game a random game is chosen.`

                bot.sendMessage({
                    to: channelID,
                    message: msgOutput
                });
                break;

        }
    }
});