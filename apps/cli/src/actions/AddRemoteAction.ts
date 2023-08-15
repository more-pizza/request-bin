import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { Settings } from '../lib/Settings';

export class AddRemoteAction extends CommandLineAction {
  private _remoteName: CommandLineStringParameter;
  private _remoteUrl: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'add-remote',
      summary: 'Adds a remote',
      documentation: 'Adds a remote',
    });
  }

  protected async onExecute(): Promise<void> {
    const settings = new Settings();
    await settings.load();
    await settings.addRemote(this._remoteName.value, this._remoteUrl.value);
  }

  protected onDefineParameters(): void {
    this._remoteName = this.defineStringParameter({
      required: true,
      argumentName: 'REMOTE_NAME',
      parameterLongName: '--name',
      parameterShortName: '-n',
      description: 'Specify the remote name',
    });

    this._remoteUrl = this.defineStringParameter({
      required: true,
      argumentName: 'REMOTE_URL',
      parameterLongName: '--url',
      parameterShortName: '-u',
      description: 'Specify the remote url',
    });
  }
}
