import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parse.js';

const getDiffByKeys = (file1, file2) => {
  const allKeys = _.union(Object.keys(file1), Object.keys(file2));

  const result = allKeys.sort()
    .map((key) => {
      if (_.has(file1, key) && !_.has(file2, key)) {
        return `  - ${key}: ${file1[key]}`;
      }
      if (!_.has(file1, key) && _.has(file2, key)) {
        return `  + ${key}: ${file2[key]}`;
      }
      if (file1[key] === file2[key]) {
        return `    ${key}: ${file2[key]}`;
      }

      return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    });

  return `\n{\n${result.join('\n')}\n}`;
};

export default (filepath1, filepath2) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');

  const ext1 = path.extname(filepath1).slice(1);
  const ext2 = path.extname(filepath2).slice(1);

  const file1 = parse(data1, ext1);
  const file2 = parse(data2, ext2);
  return getDiffByKeys(file1, file2);
};
