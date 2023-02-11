import { Command } from 'commander';
import genDiff from '../genDiff.js';

export default () => {
    const program = new Command()

    program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action(async (filepath1, filepath2) => {
        const diff = await genDiff(filepath1, filepath2)
        console.log(diff)
    });

    program.parse();
}