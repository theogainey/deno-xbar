//array access layer
const lastIndex = (arr) => arr.length - 1;
const lastItem = (arr) => arr[lastIndex(arr)];

//array element transform layer
const appendLastLine = (lines, word) => [
  ...lines.slice(0, lastIndex(lines)),
  lastItem(lines).concat(' ', word),
];
const newLine = (lines, newLine) => lines.concat(newLine);

//conditional logic layer
const isUnderLimit = (line, word, lineLength) =>
  line.length + word.length + 1 <= lineLength || line === ''; //if line is empty always return true

//array reducer
const reduceLines = (lineLength) =>
  (lines, word) => {
    return isUnderLimit(lastItem(lines), word, lineLength)
      ? appendLastLine(lines, word)
      : newLine(lines, word);
  };

/**
 * transforms a string into an array of word wrapped lines
 * @param {string} text
 * @param {number} lineLength - max length of a line
 * @returns {string[]}
 */
export const wordWrap = (text, lineLength) => {
  return text.split(' ')
    .filter((e) => e !== '')
    .reduce(reduceLines(lineLength), [''])
    .map((e) => e.trim());
};

/**
 * returns true if XBARDarkMode is enabled.
 *
 * allways returns false if 'env' permission has not been previously granted.
 * @async
 * @returns {Promise<boolean>}
 */
export const isDarkMode = async () => {
  const permissions = await Deno.permissions.query({ name: 'env' });
  return permissions.state === 'granted' ? Deno.env.get('XBARDarkMode') : false;
};
