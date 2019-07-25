const AWS = require ('aws-sdk');
const { twitchClientId } = require('./config.json');
const axios = require('axios');
const moment = require('moment');

/**
 * calls the Twitch API for a random clip of the game specified. If 'whatever' is passed, pull a random game from the top 200 games and get a clip of that
 * @param {string} game
 * @param {string} user
 * @returns the message object with a URL of the clip if successful. Otherwise, the message 'No Game Found' is returned
 */
async function twitchClips(game, user) {
	let gameTitle = game;
	const randClip = Math.floor(Math.random() * 100);
	const randGame = Math.floor(Math.random() * 100);
	let gameResponse;
	let gameId;
	let clipResponse;
	if (gameTitle.toLowerCase() === 'whatever') {
		try {
			gameResponse = await axios('https://api.twitch.tv/helix/games/top?first=100', {
				method: 'GET',
				headers: {
					'Client-ID': twitchClientId,
				},
			});
			gameId = gameResponse.data.data[randGame].id;
			gameTitle = gameResponse.data.data[randGame].name;
		} catch (err) {
			return errorHandler(err, user);
		}
	}
	else {
		try {
			gameResponse = await axios(`https://api.twitch.tv/helix/games?name=${gameTitle}`, {
				method: 'GET',
				headers: {
					'Client-ID': twitchClientId,
				},
			});
		}
		catch (err) {
			return errorHandler(err, user);
		}

		if (gameResponse.data.data.length === 0) {
			return `No Game Found!!\nTry typing the name exactly as it appears on Twitch.`;
		}
		else {
			gameId = gameResponse.data.data[0].id;
		}
	}

	try {
		clipResponse = await axios(`https://api.twitch.tv/helix/clips?game_id=${gameId}&first=100`, {
			method: 'GET',
			headers: {
				'Client-ID': twitchClientId,
			},
		});
	}
	catch (err) {
		return errorHandler(err, user);
	}
	return `Here you go, ${user}! A random ${gameTitle} clip from Twitch!\n${clipResponse.data.data[randClip].url}`;
}

async function errorHandler(error, user) {
	const s3 = new AWS.S3();
	const params = { Bucket: 'discord-bot-errors', Key: `Error ${moment().format('MMMM Do YYYY, h:mm:ss a')}.txt`, Body: `User: ${user}\nURL: ${JSON.stringify(error.config.url)}\nResponse: ${JSON.stringify(error.response.data)}`};
		await s3.putObject(params, (err) => {
			if (err) {
				console.log(err);
			}
		});
		if (error.response.status === 429) {
			return `Woah! Too many requests to handle! Please wait a few minutes, then try again.`;
		} else {
			return `Something went wrong! Please try again`;
		}
}

module.exports.twitchClips = twitchClips;