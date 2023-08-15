import { initializeJsonFile, loadJsonFile, saveJsonFile } from '../utils/files';
import { SETTINGS_DIR, SETTINGS_FILE } from '../constants';

interface IPreset {
  presetName: string;
  remoteName: string;
  bucketName: string;
  forwardUrl: string;
}

export class Settings {
  public remotes: { [remoteName: string]: string };

  public presets: {
    [presetName: string]: IPreset;
  };

  constructor() {
    this.remotes = {};
    this.presets = {};
  }

  public async save() {
    await saveJsonFile(SETTINGS_FILE, this);
  }

  public async load() {
    await initializeJsonFile(SETTINGS_FILE);
    const settings = await loadJsonFile(SETTINGS_FILE);
    this.remotes = settings.remotes;
    this.presets = settings.presets;
  }

  public async addRemote(remoteName: string, remoteUrl: string) {
    this.remotes[remoteName] = remoteUrl;
    await this.save();
  }

  public getRemote(remoteName: string) {
    return this.remotes[remoteName] || {};
  }

  public async addPreset(preset: IPreset) {
    this.presets[preset.presetName] = preset;
    await this.save();
  }

  public async removePreset(presetName: string) {
    this.presets[presetName] = undefined;
    await this.save();
  }
}
