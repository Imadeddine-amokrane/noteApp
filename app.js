const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const notes = require('./notes');

yargs(process.argv.slice(2))
  .command(
    'add',
    'add notes',
    // (yargs) => {
    //   return yargs
    //     .positional('title', {
    //       alias: 't',
    //       describe: 'Note title',
    //       demandOption: true,
    //       type: 'string',
    //     })
    //     .positional('body', {
    //       describe: 'Note Body',
    //       demandOption: true,
    //       type: 'string',
    //     });
    // },
    {
      title: {
        desribe: 'title',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Note Body',
        demandOption: true,
        type: 'string',
      },
    },
    (argv) => {
      notes.addNote(argv.title, argv.body);
    }
  )
  .help().argv;

yargs(hideBin(process.argv))
  .command(
    'remove',
    'Remove note',
    {
      title: {
        describe: 'note title',
        demandOption: true,
        type: 'string',
      },
    },
    (argv) => {
      notes.removeNote(argv.title);
    }
  )
  .help().argv;

yargs(process.argv.slice(2))
  .command('list', 'List notes', {}, (argv) => {
    console.log('Listing notes...');
    notes.listNotes();
  })
  .help().argv;

yargs(process.argv.slice(2))
  .command(
    'read',
    'Read notes',
    {
      title: {
        describe: 'note title to read',
        demandOption: 'true',
        type: 'string',
      },
    },
    (argv) => {
      console.log('Reading...');
      notes.readNote(argv.title);
    }
  )
  .help().argv;

// yargs.parse();
// console.log(yargs.argv);
