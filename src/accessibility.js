const lastLine = (lines) => lines[(lines.length) - 1];

const isUnderLimit = (line, word, lineLength) =>
  line.length + word.length + 1 <= lineLength || line === ''; //if line is empty always return true

const appendLastLine = (lines, word) =>
  lines.map((line, index) =>
    index === lines.length - 1 ? line.concat(' ', word) : line
  );

const newLine = (lines, newLine) => lines.concat(newLine);

const reduceLines = (lineLength) =>
  (lines, word) => {
    return isUnderLimit(lastLine(lines), word, lineLength)
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
