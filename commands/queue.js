/* queue command */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const cmd = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show first 10 songs in the queue");

const cmdFunc = async function(client, interaction) {
    const queue = client.player.getQueue(interaction.guildId);

    // check if there are songs in queue
    if (!queue || !queue.playing) {
        await interaction.reply("There are no songs in the queue");
        return;
    }

    // get first 10 songs in queue
    const queueString = queue.tracks.slice(0, 10).map((song, i) => {
        return `${i + 1}) [${song.duration}] - ${song.title}`;
    }).join("\n\n");

    // get current song
    const currentSong = queue.current;

    const embeds = new EmbedBuilder()
        .setDescription(`**Currently Playing**\n[${currentSong.duration}] - ${currentSong.title} \n\n**Queue**\n${queueString}`)
        .setThumbnail(currentSong.thumbnail);

    await interaction.reply({ embeds: [embeds] });
}

module.exports = { data: cmd, execute: cmdFunc };