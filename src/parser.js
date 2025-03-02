import * as fs from 'node:fs';
import path from 'node:path';

const parse = (file, format = '.json') => {
  switch (format) {
    case '.json': {
      return JSON.parse(file);
    }
    default: {
      return JSON.parse(file);
    }
  }
};

const getFormat = (filename) => {
  return path.extname(filename);
};

export default (filepath) => {
  const file = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const format = getFormat(filepath);
  const data = parse(file, format);
  return data;
};
