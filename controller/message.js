const Moment = require("moment");
const Config = require("../config/config.json");
const { check, save, update } = require("./db");
const Report = require("./report");

let authorId, guildId, month, username;

const handle = (message) => {
    // set global values for later
    authorId = message.author.id;
    guildId = message.guild.id;
    month = Moment(message.createdTimestamp).format("MM-YYYY");
    username = message.author.username;

    // check if msg start with the bot prefix
    if (message.content.startsWith(Config.BOT_PREFIX)) {
        handleCommand(message);
    } else {
        handleMessage(message);
    }
}

// handle prefixed msgs
const handleCommand = async (message) => {
    // check if command is coming from an admin
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return;
    }

    const command = message.content.split(Config.BOT_PREFIX)[1].trim();
    let report;

    // top members
    if (command == "top") {
        let report = await Report.getTopMembers(guildId);
        message.channel.send({ embed: report });        
    }

    // top members in specific month
    if (command.startsWith("topm")) {
        let rmonth = command.split(" ")[1].trim() || month;
        report = await Report.getTopMmembers(guildId, rmonth);
        message.channel.send({ embed: report });
    }

    // delete message
    message.delete(1000);
}

// increment user msg counts
const handleMessage = async (message) => {
    let count = await check(guildId, authorId, month);

    if (count == 0) {
        await save(guildId, authorId, username, month, 1).catch(err => console.log(err));
    } else {
        await update(guildId, authorId, username, month, ++count).catch(err => console.log(err));
    }
}

module.exports = {
    handle
}