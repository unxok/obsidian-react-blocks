import { App, PluginSettingTab, Setting } from "obsidian";

import MyObsidianPlugin from "@/main";
import { defaultSettings } from "@/settings";
import { makeBannerSettings } from "./components/Banner";

export class MyObsidianPluginSettingsTab extends PluginSettingTab {
	plugin: MyObsidianPlugin;
	blockSettings: Array<(settings: PluginSettingTab) => void>;

	constructor(
		app: App,
		plugin: MyObsidianPlugin,
		blockSettings: Array<(settings: PluginSettingTab) => void>,
	) {
		super(app, plugin);
		this.plugin = plugin;
		this.blockSettings = blockSettings;
	}

	display(): void {
		this.containerEl.empty();
		// makeBannerSettings(this);
		this.blockSettings.forEach((func) => func(this));

		this.containerEl.createEl("h2", {
			text: "My Plugin Settings",
		});

		new Setting(this.containerEl)
			.setName("Demo of settings")
			.setDesc(
				createFragment((f) => {
					f.createSpan({
						text: "Description for setting goes here ",
					});
					f.createEl("a", {
						text: "Link to additional useful materials",
						href: "#",
					});
					f.createSpan({ text: " syntax." });
				}),
			)
			.addText((t) => {
				t.setValue(String(this.plugin.settings.demoSetting));
				t.onChange(async (v) => {
					this.plugin.settings.demoSetting = v.length
						? v
						: defaultSettings.demoSetting;
					await this.plugin.saveSettings();
				});
			});
	}
}
