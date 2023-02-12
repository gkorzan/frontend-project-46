import Prefix from './prefix.js';

const getPrettyLine = (pref, key, value) => {
  switch (pref) {
    case Prefix.added:
      return `+ ${key}: ${value}`;
    case Prefix.removed:
      return `- ${key}: ${value}`;
    default:
      return `  ${key}: ${value}`;
  }
};

export default getPrettyLine;
