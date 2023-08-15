import fs from 'fs';

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

export async function loadJsonFile(filePath: string) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data) || {};
  } catch (err) {
    return {};
  }
}

export async function saveJsonFile(filePath: string, data: any) {
  await fs.promises.writeFile(filePath, JSON.stringify(data));
}

export async function initializeJsonFile(filePath: string) {
  if (await fileExists(filePath)) {
    return;
  }
  await saveJsonFile(filePath, {});
}
