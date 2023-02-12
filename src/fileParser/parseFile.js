import { open } from 'node:fs/promises';

const parseFile = async (filepath) => {
  let filehandle;
  try {
    filehandle = await open(filepath, 'r');
    const fileData = await filehandle.readFile();
    return JSON.parse(fileData);
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await filehandle?.close();
  }
};

export default parseFile;
