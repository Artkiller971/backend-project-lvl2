import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parse.js';
import getFormatter from './formatters/index.js';

const getDiffByKeys = (file1, file2) => {
  const allKeys = _.union(Object.keys(file1), Object.keys(file2));

  const result = allKeys.sort()
    .map((key) => {
      const value1 = file1[key];
      const value2 = file2[key];

      if (_.has(file1, key) && !_.has(file2, key)) {
        return {
          key,
          status: 'removed',
          value: value1,
        };
      }

      if (!_.has(file1, key) && _.has(file2, key)) {
        return {
          key,
          status: 'added',
          value: value2,
        };
      }

      if (value1 === value2) {
        return {
          key,
          status: 'unchanged',
          value: value2,
        };
      }

      if (_.isObject(value1) && _.isObject(value2)) {
        return {
          key,
          status: 'nested',
          children: getDiffByKeys(value1, value2),
        };
      }

      return {
        key,
        status: 'updated',
        oldValue: value1,
        newValue: value2,
      };
    });

  return result;
};

export default (filepath1, filepath2, formatType = 'stylish') => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');

  const ext1 = path.extname(filepath1).slice(1);
  const ext2 = path.extname(filepath2).slice(1);

  const file1 = parse(data1, ext1);
  const file2 = parse(data2, ext2);
  const result = getDiffByKeys(file1, file2);
  const formatter = getFormatter(formatType);
  return formatter(result);
};
