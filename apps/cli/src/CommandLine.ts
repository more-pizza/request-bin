import { CommandLineParser } from '@rushstack/ts-command-line';

import { ConfigAction } from './actions/ConfigAction';
import { SetDefaultProfileAction } from './actions/SetDefaultProfileAction';

export class RequestBinCli extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'request-bin',
      toolDescription: 'Tool for interacting with a request bin',
    });

    this.addAction(new ConfigAction());
    this.addAction(new SetDefaultProfileAction());
  }
}
