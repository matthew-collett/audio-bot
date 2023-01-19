/* pause command */

const { SlashCommandBuilder } = require("@discordjs/builders");

const cmd = new SlashCommandBuilder()
.setName("pause")
.setDescription("Pause the current song");

const cmdFunc = async function(client, interaction) {

	// get queue
	const queue = client.player.getQueue(interaction.guildId);

	// check if queue is empty
	if (!queue) {
		await interaction.reply("There are no songs in the queue");
		return;
	}

	// pause current song
	queue.setPaused(true);

	await interaction.reply(`${queue.current.title} has been paused`);
}

module.exports = { data: cmd, execute: cmdFunc };