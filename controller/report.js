const { getTop } = require("./db");

// all time top members
const getTopMembers = async (guildId) => {
    let rows = await getTop(guildId);
    embed.title = "Top 10 Members (All Time)";
    embed.fields = [];
    rows.forEach(row => {
        embed.fields.push({
            name: `Author: ${row.username}`,
            value: `Count: ${row.count}`
        });
    });

    return embed;
}

// monthly top members
const getTopMmembers = async (guildId, month) => {
    let rows = await getTop(guildId, month);
    embed.title = `Top 10 Members (${month})`;
    embed.fields = [];
    rows.forEach(row => {
        embed.fields.push({
            name: `Author: ${row.username}`,
            value: `Count: ${row.count}`
        });
    });

    return embed;
}

const embed = {
    color: 0x0099ff,
    title: '',
    fields: [],
};


module.exports = {
    getTopMembers,
    getTopMmembers
}