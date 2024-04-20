import {
	App,
	MarkdownPostProcessorContext,
	MarkdownRenderer,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
	parseYaml,
} from "obsidian";
import React from "react";

type config = {
	color: string;
	title: string;
	description: string;
	padding: string;
};

export const Banner = ({
	data,
	containerEl,
	context,
}: {
	data: string;
	containerEl: HTMLElement;
	context: MarkdownPostProcessorContext;
}) => {
	const config = parseYaml(data);
	console.log(config);

	class MkRenderer extends MarkdownRenderer {
		constructor() {
			super(containerEl);
		}
	}

	return (
		<div id="twcss">
			<div
				className="border rounded-md"
				style={{
					backgroundColor: config?.color ?? "blue",
					padding: 5,
				}}
			>
				<h3 className="m-0">{config?.title}</h3>
				<span>{config?.description}</span>
			</div>
		</div>
	);
};

export const BannerCommand = {
	id: `insert-banner`,
	name: `Insert a Banner`,
	editorCallback: (e, _) => {
		e.replaceSelection("```obsidian-react-blocks\n```\n");
	},
};

// export class BannerSettingsTab extends PluginSettingTab {
// 	constructor(plugin, app) {
// 		super(app, plugin);
// 	}

// 	display() {
// 		this.containerEl.empty();
// 		this.containerEl.createEl("h2", {
// 			text: "Banner Settings",
// 		});

// 		new Setting(this.containerEl)
// 			.setName("Default color")
// 			.setDesc("The default color for banners if none is provided")
// 			.addText((t) => {
// 				// TODO
// 			});
// 	}
// }

export const makeBannerSettings = (settings: PluginSettingTab) => {
	settings.containerEl.empty();
	settings.containerEl.createEl("h2", {
		text: "Banner Block Settings",
	});

	new Setting(settings.containerEl)
		.setName("Default color")
		.setDesc("The default color for banners if none is provided")
		.addText((t) => {
			// TODO
		});
};
