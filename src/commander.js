import { program } from 'commander';
import process from 'node:process';
import gendiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const format = program.opts().format;
      console.log(gendiff(filepath1, filepath2, format));
    } catch (e) {
      console.log('lol');
      process.exitCode = 1;
    }
  });

export default () => program.parse(process.argv);
