import os from 'os';
import path from 'path';
import fs from 'fs';

export const SETTINGS_DIR = path.join(os.homedir(), '.request-bin');
export const SETTINGS_FILE = path.join(SETTINGS_DIR, 'settings.json');
