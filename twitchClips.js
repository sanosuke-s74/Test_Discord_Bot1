const { twitchClientId } = require('./config.json');
const axios = require('axios');

/**
 * calls the Twitch API for a random clip of the game specified. If 'whatever' is passed, pull a random game from the top 200 games and get a clip of that
 * @param {string} game
 * @param {string} user
 * @returns the message object with a URL of the clip if successful. Otherwise, the message 'No Game Found' is returned
 */
async function twitchClips(game, user) {
	let gameTitle = game;
	const randClip = Math.floor(Math.random() * 100);
	// const turnClipPage = randClip % 2;
	const randGame = Math.floor(Math.random() * 100);
	// const turnGamePage = randGame % 2;
	let message = '';
	let gameResponse;
	let gameId;
	let clipResponse;
	if (gameTitle.toLowerCase() === 'whatever') {
		gameResponse = await axios('https://api.twitch.tv/helix/games/top?first=100', {
			method: 'GET',
			headers: {
				'Client-ID': twitchClientId,
			},
		});
		if (gameResponse.status === 429) {
			message = `${message}Woah! Too many requests to handle! Please wait a few minutes, then try again.`;
		}
		gameId = gameResponse.data.data[randGame].id;
		gameTitle = gameResponse.data.data[randGame].name;

	}
	else {
		try {
			gameResponse = await axios(`https://api.twitch.tv/helix/games?name=${gameTitle}`, {
				method: 'GET',
				headers: {
					'Client-ID': twitchClientId,
				},
			});
			if (gameResponse.status === 429) {
				message = `${message}Woah! Too many requests to handle! Please wait a few minutes, then try again.`;
			}
		}
		catch (err) {
			console.log(err);
			message = `${message}Something went wrong! Please try again`;
			return message;
		}

		if (gameResponse.data.data.length === 0) {
			message = `${message}No Game Found!!\nTry typing the name exactly as it appears on Twitch.`;
			return message;
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
		if (clipResponse.status === 429) {
			message = `${message}Woah! Too many requests to handle! Please wait a few minutes, then try again.`;
		}
	}
	catch (err) {
		console.log(err);
		message = `${message}Something went wrong! Please try again`;
		return message;
	}

	message = `${message}Here you go, ${user}! A random ${gameTitle} clip from Twitch!\n${clipResponse.data.data[randClip].url}`;

	return message;
}

module.exports.twitchClips = twitchClips;