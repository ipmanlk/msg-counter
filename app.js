const Discord = require("discord.js");
const { handle } = require("./controller/message");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {
    if (message.author.bot) return;
    handle(message);
});
 
client.login("");