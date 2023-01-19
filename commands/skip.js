/* skip command */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

const cmd = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song");

const cmdFunc = async function(client, interaction) {

    // get queue
	const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
        await interaction.reply("There are no songs in the queue");
        return;
    }

    const currentSong = queue.current;

    // skip current song
    //queue.skip();

    const embeds = new EmbedBuilder()
        .setDescription(`${currentSong.title} has been skipped`)
        .setThumbnail(currentSong.thumbnail);

    await interaction.reply({ embeds: [embeds] });
}

module.exports = { data: cmd, execute: cmdFunc };