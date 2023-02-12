import getPrettyLine from './getPrettyLine.js';
import Prefix from './prefix.js';

const preparePrettyDiff = (diffObj) => {
  const preatyDiffLines = [];
  preatyDiffLines.push('{');
  Object.entries(diffObj).forEach(([key, line]) => {
    if (line.isSimilar) {
      preatyDiffLines.push(getPrettyLine(Prefix.none, key, line.value));
      return;
    }
    if (!line.isSimilar && line.value2 === null) {
      preatyDiffLines.push(getPrettyLine(Prefix.removed, key, line.value));
      return;
    }
    if (!line.isSimilar && line.value === null) {
      preatyDiffLines.push(getPrettyLine(Prefix.added, key, line.value2));
      return;
    }
    if (!line.isSimilar && line.value2 !== null) {
      preatyDiffLines.push(getPrettyLine(Prefix.removed, key, line.value));
      preatyDiffLines.push(getPrettyLine(Prefix.added, key, line.value2));
    }
  });
  preatyDiffLines.push('}');
  return preatyDiffLines.join('\n');
};

export default preparePrettyDiff;
