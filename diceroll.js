function diceRoll (type, numThrow, user) {
    let message = '';
    if (type <= 0 || !Number.isInteger(type)) {
        type = 6;
        message = `${message}Invalid number for dice type given. Set to 6\n`;
    }
    if (numThrow <= 0 || numThrow > 10 || !Number.isInteger(numThrow)) {
        numThrow = 5;
        message = `${message}Invalid number of dice throws given. Set to 5\n`;
    }
    
    message = `${message}${user.toString()} is throwing a d${type.toString()} ${numThrow.toString()} time(s)\n`;
    
    for (let x = 0; x < numThrow; x++) {
        let dicenum = Math.floor(Math.random() * type) + 1;
        message = `${message}Throw #${(x + 1).toString()}: ${dicenum.toString()}\n`;
    }
    return message;
}

module.exports.diceRoll = diceRoll;