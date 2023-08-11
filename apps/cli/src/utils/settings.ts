import fs from 'fs';

import { SETTINGS_DIR, SETTINGS_FILE } from '../constants';

// initialize settings using promises
export async function initializeSettings() {
  let settingsFileExists: boolean;
  try {
    await fs.promises.access(SETTINGS_FILE);
    settingsFileExists = true;
  } catch (err) {
    settingsFileExists = false;
  }

  if (settingsFileExists) {
    return;
  }

  // if settings file does not exist, create it
  await fs.promises.mkdir(SETTINGS_DIR, { recursive: true });
  await fs.promises.writeFile(SETTINGS_FILE, JSON.stringify({}));
}

export async function getSettings() {
  await initializeSettings();
  const settings = await fs.promises.readFile(SETTINGS_FILE, 'utf8');
  return JSON.parse(settings.toString());
}

export async function setDefaultProfile(params: { bucketName: string; remoteUrl: string; forwardUrl: string }) {
  const { bucketName, remoteUrl, forwardUrl } = params;
  const settings = await getSettings();
  settings.defaultProfile = { bucketName, remoteUrl, forwardUrl };
  await fs.promises.writeFile(SETTINGS_FILE, JSON.stringify(settings));
}

export async function getDefaultProfile() {
  const settings = await getSettings();
  return settings.defaultProfile;
}
