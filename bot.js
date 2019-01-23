var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', async function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', async function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch (cmd.toLowerCase()) {
            // !ping
            case 'ping':
                // console.log(bot);
                var avatarID = bot.users[userID].avatar;
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!' + ' https://cdn.discordapp.com/avatars/' + userID + '/a_' + avatarID + '.png'
                });
                break;
            // Just add any case commands if you want to..
            case 'diceroll':
                let msgOutput = "";
                let diceType = args[0].substr(1);
                let numDiceThrows = parseInt(args[1], 10);
                if (numDiceThrows <= 0 || numDiceThrows > 10) {
                    numDiceThrows = 5;
                    msgOutput = msgOutput + numDiceThrows.toString() + ""
                }

                msgOutput = user.toString() + ' is throwing a d' + diceType.toString() + ' ' + numDiceThrows.toString() + ' time(s)\n';

                for (let x = 0; x < numDiceThrows; x++) {
                    let dicenum = Math.floor(Math.random() * diceType) + 1;
                    msgOutput = msgOutput + "Throw #" + (x + 1).toString() + ": " + dicenum.toString() + "\n";
                }

                bot.sendMessage({
                    to: channelID,
                    message: msgOutput
                });

                console.log(msgOutput);
                break;
        }
    }
});