import { Command } from 'commander';

export type CollectorOptions = {
  startTerm: number;
  endTerm: number;
  resultDirectoryPath?: string;
};

export function createProgramWithTermOptions(
  resultFilesDirectory: string,
  scriptName: string
): CollectorOptions {
  const program = new Command();
  program
    .usage(`Example usage: npx ts-node ${scriptName} -s 1 -e 10`)
    .requiredOption('-s, --startTerm <number>', 'Starting term (inclusive).')
    .requiredOption('-e, --endTerm <number>', 'Ending term (inclusive)')
    .requiredOption(
      '-rfd, --resultFilesDirectory <directoryPath>',
      'Result files directory path.',
      resultFilesDirectory
    )
    .parse(process.argv);

  const programOptions = program.opts();
  const startTerm = programOptions.startTerm as number;
  const endTerm = programOptions.endTerm as number;
  const resultDirectoryPath = programOptions.resultFilesDirectory as string;

  validateProgramOptions(startTerm, endTerm);

  return { startTerm, endTerm, resultDirectoryPath };
}

function validateProgramOptions(startTerm: number, endTerm: number) {
  if (endTerm < startTerm) {
    console.error('End term must be greater than start term');
    process.exit(1);
  }
  if (startTerm < 1 || endTerm < 1) {
    console.error('Start and end term must be greater than 0');
    process.exit(1);
  }
  if (isNaN(startTerm) || isNaN(endTerm)) {
    console.error('Start and end term must be numbers');
    process.exit(1);
  }
}
