import parse from './src/parser.js';
import generateDiffObject from './src/generateDiff.js';
import getFormatter from './src/getFormatter.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const object1 = parse(filepath1);
  const object2 = parse(filepath2);
  const diffObject = generateDiffObject(object1, object2);
  const formatter = getFormatter(format);
  return formatter(diffObject);
};
