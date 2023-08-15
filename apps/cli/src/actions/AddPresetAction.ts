import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Settings } from '../lib/Settings';

export class AddPresetAction extends CommandLineAction {
  private _presetName: CommandLineStringParameter;
  private _remoteName: CommandLineStringParameter;
  private _bucketName: CommandLineStringParameter;
  private _forwardUrl: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'add-preset',
      summary: 'Adds a preset action',
      documentation: 'Adds a preset action',
    });
  }

  protected async onExecute(): Promise<void> {
    const settings = new Settings();
    await settings.load();

    const remote = await settings.getRemote(this._remoteName.value);
    if (!remote) {
      throw new Error(`Remote ${this._remoteName.value} not found`);
    }

    await settings.addPreset({
      presetName: this._presetName.value,
      remoteName: this._remoteName.value,
      bucketName: this._bucketName.value,
      forwardUrl: this._forwardUrl.value,
    });
  }

  protected onDefineParameters(): void {
    this._presetName = this.defineStringParameter({
      required: true,
      argumentName: 'PRESET_NAME',
      parameterLongName: '--preset',
      parameterShortName: '-p',
      description: 'Specify the preset name',
    });

    this._remoteName = this.defineStringParameter({
      required: true,
      argumentName: 'REMOTE_NAME',
      parameterLongName: '--remote',
      parameterShortName: '-r',
      description: 'Specify the remote name',
    });

    this._bucketName = this.defineStringParameter({
      required: true,
      argumentName: 'BUCKET_NAME',
      parameterLongName: '--bucket',
      parameterShortName: '-b',
      description: 'Specify the bucket name',
    });

    this._forwardUrl = this.defineStringParameter({
      required: false,
      argumentName: 'FORWARD_URL',
      parameterLongName: '--forward',
      parameterShortName: '-f',
      description: 'Specify the forward url',
    });
  }
}
