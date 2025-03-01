import { program } from 'commander';
import parse from './parser.js';
import generateDiff from './generateDiff.js';

export default (() => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

  program
    .option('-f, --format [type]', 'output format', 'json')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, format = { format } || json) => {
      const object1 = parse(filepath1);
      const object2 = parse(filepath2);
      console.log(generateDiff(object1, object2));
    });

  program.parse(process.argv);
});
