const auth = require('./auth.json');
const axios = require('axios');

async function twitchClips (game, user) {
    let message = '';
    let response = await axios(`https://api.twitch.tv/helix/games?name=Overwatch`, {
        method: 'GET',
        headers: {
            'Client-ID': auth.twitchClientId
        }
    });
    if (response.data.data.length === 0) {
        message = `${message}No Game Found!!\nTry typing the name exactly as it appears on Twitch.`;
        return message;
    }
    

    return message;
}

module.exports.twitchClips = twitchClips;