import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { setDefaultProfile } from '../utils/settings';

export class SetDefaultProfileAction extends CommandLineAction {
  private _bucketName: CommandLineStringParameter;
  private _remoteUrl: CommandLineStringParameter;
  private _forwardUrl: CommandLineStringParameter;

  public constructor() {
    super({
      actionName: 'set-default-profile',
      summary: 'Sets the default profile',
      documentation: 'Sets the default profile',
    });
  }

  protected async onExecute(): Promise<void> {
    await setDefaultProfile({
      bucketName: this._bucketName.value,
      remoteUrl: this._remoteUrl.value,
      forwardUrl: this._forwardUrl.value,
    });
  }

  protected onDefineParameters(): void {
    this._bucketName = this.defineStringParameter({
      required: true,
      argumentName: 'BUCKET_NAME',
      parameterLongName: '--bucket-name',
      parameterShortName: '-b',
      description: 'Specify the bucket name',
    });

    this._remoteUrl = this.defineStringParameter({
      required: true,
      argumentName: 'REMOTE_URL',
      parameterLongName: '--remote-url',
      parameterShortName: '-r',
      description: 'Specify the remote url',
    });

    this._forwardUrl = this.defineStringParameter({
      required: true,
      argumentName: 'FORWARD_URL',
      parameterLongName: '--forward-url',
      parameterShortName: '-f',
      description: 'Specify the forward url',
    });
  }
}
