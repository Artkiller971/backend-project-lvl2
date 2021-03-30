import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

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
      if (file1[  key] === file2[key]) {
        return `    ${key}: ${file2[key]}`;
      }

      return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    });

    return `\n{\n${result.join('\n')}\n}`;
  };

export default (filepath1, filepath2) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const json1 = JSON.parse(data1);
  const json2 = JSON.parse(data2);
  return getDiffByKeys(json1, json2);
}