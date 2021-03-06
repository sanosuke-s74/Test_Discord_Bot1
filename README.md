# Instructions
## Step 1
Install node.js
Linux (from terminal):
```
sudo apt update
sudo apt install nodejs npm
```
Windows:
Download from https://nodejs.org/en/download/

## Step 2
Log into [discordapp.com/developers/applications/me](discordapp.com/developers/applications/me) after creating a login.
Create an app and grab access token.

## Step 3
Grab client ID and insert it into the following URL to send Bot to Discord channel
https://discordapp.com/oauth2/authorize?&client_id={CLIENTID}&scope=bot&permissions=8

## Step4
Create following files (or pull from repo) in a new directory
```
auth.json
package.json
bot.js
```
If pulling from repo, you'll get `auth.json.div`. Make a copy of this and name it `auth.json`.
Place access token into auth.json. This is included in the `.gitignore`, so your token won't be commited.

## Step5
In Terminal, navigate to bot's directory and run:
```
npm install discord.io winston -save
npm install https://github.com/woor/discord.io/tarball/gateway_v6
```

## Step6
Run bot from terminal:
```
node bot.js
```

##Notes on creating service on Ubuntu EC2 instance
create bot.service file (or pull from repo)
move file to /etc/systemd/system directory
run following commands
`sudo systemctl start bot.service` to run bot in background
`sudo systemctl enable bot.service` to run on boot
`sudo systemctl status bot.service` to check current status
`sudo systemctl restart bot.service` to force restart
`sudo systemctl stop bot.service` to stop the bot
`journalctl -u bot.service` to see the logs of the bot service

**Might possibly need to update the sudoers file to enable these things**
`sudo visudo`
add line similar to the following
`ubuntu ALL=(ALL) NOPASSWD: /usr/bin/systemctl start bot.service`
