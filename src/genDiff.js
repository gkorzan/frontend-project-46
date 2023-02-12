import parseFile from './fileParser/parseFile.js';
import getLineStats from './lineComparator/getLineStats.js';
import preparePrettyDiff from './prettifier/preparePreattyDiff.js';

const genDiff = async (filepath1, filepath2) => {
  const fileData1 = await parseFile(filepath1);
  const fileData2 = await parseFile(filepath2);

  const keyList = Object
    .keys(fileData1)
    .concat(Object.keys(fileData2))
    .reduce((acc, current) => (acc.includes(current) ? acc : (acc.push(current) && acc)), [])
    .sort();

  const diffObj = keyList
    .reduce((acc, curr) => {
      const currentValue = fileData1[curr];
      const currentValue2 = fileData2[curr];
      acc[curr] = getLineStats(currentValue, currentValue2);
      return acc;
    }, {});

  return preparePrettyDiff(diffObj);
};

export default genDiff;
