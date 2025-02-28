import { program } from 'commander';
import parse from './parser.js';

export default (() => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

  program
    .option('-f, --format [type]', 'output format', 'json')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, format = { format } || json) => {
      console.log(parse(filepath1));
      console.log(parse(filepath2));
    });

  program.parse(process.argv);
});
