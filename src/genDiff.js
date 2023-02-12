import { open } from 'node:fs/promises';
import preparePrettyDiff from './prettifier/preparePreattyDiff.js';

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

const genDiff = async (filepath1, filepath2) => {
  const fileData1 = await parseFile(filepath1);
  const fileData2 = await parseFile(filepath2);

  const diffObj = Object
    .keys(fileData1)
    .concat(Object.keys(fileData2))
    .sort()
    .reduce((acc, curr) => {
      const currentValue = fileData1[curr];
      const currentValue2 = fileData2[curr];
      if (currentValue === undefined) {
        acc[curr] = { isSimilar: false, value: null, value2: currentValue2 };
        return acc;
      }
      if (currentValue2 === undefined) {
        acc[curr] = { isSimilar: false, value: currentValue, value2: null };
        return acc;
      }
      if (currentValue === currentValue2) {
        acc[curr] = { isSimilar: true, value: currentValue };
        return acc;
      }
      if (currentValue !== currentValue2) {
        acc[curr] = { isSimilar: false, value: currentValue, value2: currentValue2 };
        return acc;
      }
      return acc;
    }, {});

  return preparePrettyDiff(diffObj);
};

export default genDiff;
