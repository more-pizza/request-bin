import { CommandLineParser } from '@rushstack/ts-command-line';

import { AddPresetAction } from './actions/AddPresetAction';
import { AddRemoteAction } from './actions/AddRemoteAction';
import { ConfigAction } from './actions/ConfigAction';

export class RequestBinCli extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'request-bin',
      toolDescription: 'Tool for interacting with a request bin',
    });

    this.addAction(new AddPresetAction());
    this.addAction(new AddRemoteAction());
    this.addAction(new ConfigAction());
  }
}
