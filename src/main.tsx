import { Plugin } from "obsidian";

import React, { ReactElement, ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { defaultSettings, TSettings } from "@/settings";
import { MyObsidianPluginSettingsTab } from "@/settings-tab";
import { loadData } from "@/saveload";
import { Banner, BannerCommand, makeBannerSettings } from "./components/Banner";

import App from "@/components/App";

export default class MyObsidianPlugin extends Plugin {
	settings: TSettings;

	async onload(): Promise<void> {
		await this.loadSettings();
		const blockSettings = [makeBannerSettings];

		this.registerBlock("banner", Banner);
		this.addCommand(BannerCommand);

		this.addSettingTab(
			new MyObsidianPluginSettingsTab(this.app, this, blockSettings),
		);
		// this.registerMarkdownCodeBlockProcessor(
		// 	"obsidian-react-blocks",
		// 	(s, e, i) => {
		// 		let data = loadData(s);
		// 		e.empty();
		// 		const root = createRoot(e);
		// 		root.render(
		// 			<React.StrictMode>
		// 				<App
		// 					data={data}
		// 					getSectionInfo={() => i.getSectionInfo(e)}
		// 					settings={this.settings}
		// 					app={this.app}
		// 				/>
		// 			</React.StrictMode>,
		// 		);
		// 	},
		// );
		// this.addCommand({
		// 	id: `insert`,
		// 	name: `Insert My Plugin`,
		// 	editorCallback: (e, _) => {
		// 		e.replaceSelection("```obsidian-react-blocks\n```\n");
		// 	},
		// });
	}

	registerBlock(
		langName: string,
		ReactComp: (props: any) => React.JSX.Element,
		props?: any,
	) {
		this.registerMarkdownCodeBlockProcessor(langName, (s, e, c) => {
			let data = loadData(s);
			e.empty();
			const root = createRoot(e);
			// const Element = ReactComp ?? 'div'
			root.render(
				<React.StrictMode>
					<ReactComp
						data={s}
						containerEl={e}
						context={c}
						{...props}
						// getSectionInfo={() => i.getSectionInfo(e)}
						// settings={this.settings}
						// app={this.app}
					/>
				</React.StrictMode>,
			);
		});
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			defaultSettings,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
