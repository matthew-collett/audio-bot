/* exit command */

const { SlashCommandBuilder } = require("@discordjs/builders");

cmd = new SlashCommandBuilder()
	.setName("exit")
	.setDescription("Kick the bot from the channel");

const cmdFunc = async function(client, interaction) {

	// get current queue
	const queue = client.player.getQueue(interaction.guildId);

	if (!queue) {
		await interaction.reply("There are no songs in the queue");
		return;
	}

	// deletes all the songs from queue and exits the channel
	queue.destroy();

	await interaction.reply("Nicky don't leave me ://");
}

module.exports = { data: cmd, execute: cmdFunc };