#!/usr/bin/env node
const r = require('./diceroll');
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
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(' ');
        const cmd = args[0];

        args = args.splice(1);

        switch (cmd.toLowerCase()) {
            // !ping
            case '2ping':
                // console.log(bot);
                const avatarID = bot.users[userID].avatar;
                bot.sendMessage({
                    to: channelID,
                    message: `Pong! https://cdn.discordapp.com/avatars/${userID}/a_${avatarID}.png`
                });
                break;

            case '2diceroll':
                let diceType = Math.floor(args[0].substr(1));
                let numDiceThrows = Math.floor(parseInt(args[1], 10));
                let msgOutput = r.diceRoll(diceType, numDiceThrows, user);
            
                bot.sendMessage({
                    to: channelID,
                    message: msgOutput
                });
                break;
        }
    }
});