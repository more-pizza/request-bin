import { CommandLineAction } from '@rushstack/ts-command-line';

import { Settings } from '../lib/Settings';

export class ConfigAction extends CommandLineAction {
  public constructor() {
    super({
      actionName: 'config',
      summary: 'Displays the config',
      documentation: 'Displays the config',
    });
  }

  protected async onExecute(): Promise<void> {
    const settings = new Settings();
    const result = await settings.load();
    console.log('=== Settings ===');
    console.log(JSON.stringify(result, null, 2));
  }
}
