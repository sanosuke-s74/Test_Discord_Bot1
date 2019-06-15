#!/usr/bin/env node
const dice = require('./diceroll');
const twitch = require('./twitchClips');
const Discord = require('discord.js');
const { token, prefix } = require('./config.json');

// Initialize Discord Bot
const bot = new Discord.Client({});
bot.once('ready', async () => {
	console.log('Ready!');
});

bot.login(token);

bot.on('message', async message => {
	let msgOutput = '';
	let user;
	let diceType;
	let numDiceThrows;
	let gameName;
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `!`
	if (message.content.substring(0, 2) == prefix) {
		let args = message.content.substring(2).split(' ');
		const cmd = args[0];

		args = args.splice(1);

		switch (cmd.toLowerCase()) {
		// !ping
		case 'ping':
			user = await bot.fetchUser(message.author.id);
			message.channel.send(`Pong! https://cdn.discordapp.com/avatars/${message.author.id}/a_${user.avatar}.png`);
			break;

		case 'diceroll':
			diceType = Math.floor(args[0].substr(1));
			numDiceThrows = Math.floor(parseInt(args[1], 10));
			msgOutput = await dice.diceRoll(diceType, numDiceThrows, message.author.username);

			message.channel.send(msgOutput);
			break;

		case 'twitch':
			gameName = args.join(' ');
			msgOutput = await twitch.twitchClips(gameName, message.author.username);


			message.channel.send(msgOutput);
			break;
		default:
			msgOutput = `${msgOutput}Hello! I am Test Bot!\nHere is a list of my current commands:\n    !2ping  -- this returns the word Pong! with your profile picture\n    !2diceroll  {dice type} {number of dice}  -- this will do a dice roll and return the results. Example: '!2diceroll d20 6' will throw 6 d20s\n    !2twitch {name of game}  -- this will return a random game clip from Twitch from the game specified. If you do 'whatever' as the name of the game a random game is chosen.`;

			message.channel.send(msgOutput);
			break;

		}
	}
});