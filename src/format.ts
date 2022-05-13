import { pipe, pipeCompatibleReduce } from './utility.ts';
import { Menu } from './types.d.ts';

// line Object access layer
const getText = (lineObj: Menu) => lineObj.text ?? '';
const getSubMenuLevel = (lineObj: Menu) => parseInt(`${lineObj.submenuLevel}`);

// deno-lint-ignore no-unused-vars
const ignoreSubMenuLevel = ({ submenuLevel, ...lineObj }: Menu) => lineObj;
// deno-lint-ignore no-unused-vars
const ignoreText = ({ text, ...lineObj }: Menu) => lineObj;

// line formatting layer
const getSubMenuFormatting = (lineObj: Menu) =>
  '--'.repeat(getSubMenuLevel(lineObj));
const getFormattedText = (lineObj: Menu) => `${getText(lineObj)}`.trim();

const formatOutputOptions = pipeCompatibleReduce((
  output: string,
  [option, value]: string,
) => output.concat(` | ${option}=${value}`))('');

const getFormattedOutputOptions = pipe(
  ignoreText,
  ignoreSubMenuLevel,
  Object.entries,
  formatOutputOptions,
);

// entry layer
export const formatLine = (lineObj: Menu) => {
  const formattedLine = getSubMenuFormatting(lineObj) +
    getFormattedText(lineObj) +
    getFormattedOutputOptions(lineObj);
  console.log(formattedLine);
  return formattedLine;
};
