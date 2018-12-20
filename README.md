#Instructions
##Step 1
Install node.js
Linux (from terminal):
```
sudo apt update
sudo apt install nodejs npm
```
Windows:
Download from https://nodejs.org/en/download/

##Step 2
Log into discordapp.com/developers/applications/me after creating a login.
Create an app and grab access token.

##Step 3
Grab client ID and insert it into the following URL to send Bot to Discord channel
https://discordapp.com/oauth2/authorize?&client_id={CLIENTID}&scope=bot&permissions=8

##Step4
Create following files (or pull from repo) in a new directory
```
auth.json
package.json
bot.js
```
Place access token into auth.json. Do NOT commit it with access token.

##Step5
In Terminal, navigate to bot's directory and run:
```
npm install https://github.com/woor/discord.io/tarball/gateway_v6
```

##Step6
Run bot from terminal:
```
node bot.js
```