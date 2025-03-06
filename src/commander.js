import { program } from 'commander';
import process from 'node:process';
import parse from './parser.js';
import { generateDiffObject } from './generateDiff.js';
import stylishFormatter from './formatters/stylish.js';
import plainFormatter from './formatters/plain.js';
import jsonFormatter from './formatters/jsonFormatter.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish': {
      return stylishFormatter;
    }
    case 'plain': {
      return plainFormatter;
    }
    case 'json': {
      return jsonFormatter;
    }
    default: {
      return stylishFormatter;
    }
  }
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const object1 = parse(filepath1);
      const object2 = parse(filepath2);
      const diffObject = generateDiffObject(object1, object2);
      const options = program.opts();
      const formatter = getFormatter(options.format);
      console.log(formatter(diffObject));
    } catch (e) {
      console.log(e.message);
      process.exitCode = 1;
    }
  });

export default () => program.parse(process.argv);
