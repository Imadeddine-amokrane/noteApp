const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync('notes.json');
    const notes = JSON.parse(notesBuffer.toString());
    return notes;
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('./notes.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  debugger;
  if (!duplicateNote) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(chalk.green.inverse.bold('Note added...'));
  } else {
    console.log(chalk.red.inverse('Note title exist !'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const keepNotes = notes.filter((note) => note.title !== title);
  if (notes.length > keepNotes.length) {
    saveNotes(keepNotes);
    console.log(chalk.green.bold('Note has been removed successfully'));
  } else {
    console.log(chalk.red.bold('No note has been found !'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('YOUR NOTES:'));
  notes.forEach((note) => {
    console.log(chalk.blue.bold(note.title));
  });
};

const readNote = (title) => {
  const note = loadNotes().find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.bgRed('Note not Found !'));
  }
};
module.exports = { addNote, removeNote, listNotes, readNote };
