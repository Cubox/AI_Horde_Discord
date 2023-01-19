import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../classes/command";
import { CommandContext } from "../classes/commandContext";

const command_data = new SlashCommandBuilder()
    .setName("info")
    .setDMPermission(false)
    .setDescription(`Shows info on stable horde`)

export default class extends Command {
    constructor() {
        super({
            name: "info",
            command_data: command_data.toJSON(),
            staff_only: false,
        })
    }

    override async run(ctx: CommandContext): Promise<any> {
        const news = await ctx.stable_horde_manager.getNews()
        const article = news[0]
        const embed = new EmbedBuilder({
            color: Colors.Blue,
            title: "Stable Horde",
            //TODO: Add more info in the future
            description: `The [Stable Horde](https://stablehorde.net) is a crowdsourced service providing Stable Diffusion for everyone.\nIt is free, open sourced, and relies on volunteer processing power.\n\nIf you enjoy using it, please consider [onboarding your own PC as a worker](https://github.com/db0/AI-Horde-Worker#readme) or supporting its development [on patreon](https://www.patreon.com/db0)${article ? `\n\n**Latest News**\n${article.newspiece}\n<t:${Math.round(Number(new Date(article.date_published!))/1000)}>` : ""}`
        })
        return ctx.interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
}