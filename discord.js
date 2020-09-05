const Discord = require('discord.js')
const client = new Discord.Client()
const token = process.env.DISCORD_BOT_SECRET
const id = process.env.DISCORD_HEROKU_CHANNEL

client.on('ready', () => {
  sendHerokuDeploy("Hi, I'm alive")
})

function login() {
  client.login(token)
}

function sendHerokuDeploy(deployInfo) {  
  client.channels.cache.get(id).send(deployInfo)
}

module.exports = {
  sendHerokuDeploy: sendHerokuDeploy,
  login: login
}