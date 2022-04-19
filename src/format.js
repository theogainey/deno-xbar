import { pipe, pipeCompatibleReduce } from './utility.js';

// line Object access layer
const getText = (lineObj) => lineObj.text ?? '';
const getSubMenuLevel = (lineObj) => lineObj.submenuLevel;
// deno-lint-ignore no-unused-vars
const ignoreSubMenuLevel = ({ submenuLevel, ...lineObj }) => lineObj;
// deno-lint-ignore no-unused-vars
const ignoreText = ({ text, ...lineObj }) => lineObj;

// line formatting layer
const getSubMenuFormatting = (lineObj) => '--'.repeat(getSubMenuLevel(lineObj));
const getFormattedText = (lineObj) => `${getText(lineObj)}`.trim();
const formatOutputOptions = pipeCompatibleReduce((output, [option, value]) =>
  output.concat(` | ${option}=${value}`)
)('');

const getFormattedOutputOptions = pipe(
  ignoreText,
  ignoreSubMenuLevel,
  Object.entries,
  formatOutputOptions,
);

// entry layer
export const formatLine = (lineObj) => {
  const formattedLine = getSubMenuFormatting(lineObj) +
    getFormattedText(lineObj) +
    getFormattedOutputOptions(lineObj);
  console.log(formattedLine);
  return formattedLine;
};
