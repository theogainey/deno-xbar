import {
  pipe,
  pipeCompatibleFilter,
  pipeCompatibleMap,
  pipeCompatibleReduce,
  pipeCompatibleSplit,
} from './utility.js';
// array access layer
const lastIndex = (arr) => arr.length - 1;
const lastItem = (arr) => arr[lastIndex(arr)];

// array element transform layer
const appendLastLine = (lines, word) => [
  ...lines.slice(0, lastIndex(lines)),
  lastItem(lines).concat(' ', word),
];
const newLine = (lines, newLine) => lines.concat(newLine);

// conditional logic layer
const isUnderLimit = (line, word, lineLength) =>
  line.length + word.length + 1 <= lineLength || line === ''; //if line is empty always return true

// array reducer
const reduceLines = (lineLength) =>
  (lines, word) => {
    return isUnderLimit(lastItem(lines), word, lineLength)
      ? appendLastLine(lines, word)
      : newLine(lines, word);
  };

// word wrap transformations
const spiltToWords = pipeCompatibleSplit(' ');
const removeExtraSpaces = pipeCompatibleFilter((word) => word !== '');

const reduceToLines = (maxLineLength) =>
  pipeCompatibleReduce(reduceLines(maxLineLength))(['']);

const passPropertiesToLInes = (propertiesToPass) =>
  pipeCompatibleMap((line) => ({
    text: line.trim(),
    ...propertiesToPass,
  }));

// apply transformations in order with pipe
const applyWordWrap = ({ text, wordWrap, ...menuItemProperties }) =>
  pipe(
    spiltToWords,
    removeExtraSpaces,
    reduceToLines(wordWrap),
    passPropertiesToLInes(menuItemProperties),
  )(text);

// entry layer conditional logic
const hasWordWrap = (item) => !!item.wordWrap;
// deno-lint-ignore no-unused-vars
const ignoreWordWrap = ({ wordWrap, ...item }) => item;

// entry layer
export const wordWrap = (menuItem) =>
  hasWordWrap(menuItem) ? applyWordWrap(menuItem) : [ignoreWordWrap(menuItem)];

/**
 * returns true if XBARDarkMode is enabled.
 * allways returns false if 'env' permission has not been previously granted.
 * @async
 * @returns {Promise<boolean>}
 */
export const isDarkMode = async () => {
  const permissions = await Deno.permissions.query({ name: 'env' });
  return permissions.state === 'granted'
    ? Deno.env.get('XBARDarkMode') === 'true'
    : false;
};
