/* resume command */

const { SlashCommandBuilder } = require("@discordjs/builders");

const cmd = new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the current song");

const cmdFunc = async function(client, interaction) {

    // get queue
	const queue = client.player.getQueue(interaction.guildId);

    // check if queue is empty
    if (!queue) {
        await interaction.reply("No songs in the queue");
        return;
    }

    // pause current song
	queue.setPaused(false);

    await interaction.reply(`${queue.current.title} has been resumed`);
}

module.exports = { data: cmd, execute: cmdFunc };