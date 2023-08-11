import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line';
import { getSettings } from '../utils/settings';

export class ConfigAction extends CommandLineAction {
  public constructor() {
    super({
      actionName: 'config',
      summary: 'Displays the config',
      documentation: 'Displays the config',
    });
  }

  protected async onExecute(): Promise<void> {
    const settings = await getSettings();
    console.log(settings);
  }
}
