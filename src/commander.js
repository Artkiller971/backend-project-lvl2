import { Command } from 'commander/esm.mjs';
import genDiff from './index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const option = program.opts();
    console.log(genDiff(filepath1, filepath2, option.format));
  });

export default () => program.parse(process.argv);
