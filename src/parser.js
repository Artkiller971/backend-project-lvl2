import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parse = (file, format = '.json') => {
  switch (format) {
    case '.json': {
      return JSON.parse(file);
    }
    case '.yaml': {
      return yaml.load(file);
    }
    case '.yml': {
      return yaml.load(file);
    }
    default: {
      throw new Error('Unsupported format!');
    }
  }
};

const getFormat = (filename) => (path.extname(filename));

export default (filepath) => {
  const file = fs.readFileSync(path.resolve(filepath), 'utf-8');
  const format = getFormat(filepath);
  const data = parse(file, format);
  return data;
};
