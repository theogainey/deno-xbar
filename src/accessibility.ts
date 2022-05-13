import {
  pipe,
  pipeCompatibleFilter,
  pipeCompatibleMap,
  pipeCompatibleReduce,
  pipeCompatibleSplit,
} from './utility.ts';

import { Menu, MenuItem } from './types.d.ts';
// array access layer
const lastIndex = (arr: string[]) => arr.length - 1;
const lastItem = (arr: string[]) => arr[lastIndex(arr)];

// array element transform layer
const appendLastLine = (lines: string[], word: string) => [
  ...lines.slice(0, lastIndex(lines)),
  lastItem(lines).concat(' ', word),
];
const newLine = (lines: string[], newLine: string) => lines.concat(newLine);

// conditional logic layer
const isUnderLimit = (line: string, word: string, lineLength: number) =>
  line.length + word.length + 1 <= lineLength || line === ''; //if line is empty always return true

// array reducer
const reduceLines = (lineLength: number) =>
  (lines: string[], word: string) => {
    return isUnderLimit(lastItem(lines), word, lineLength)
      ? appendLastLine(lines, word)
      : newLine(lines, word);
  };

// word wrap transformations
const spiltToWords = pipeCompatibleSplit(' ');
const removeExtraSpaces = pipeCompatibleFilter((word: string) => word !== '');

const reduceToLines = (maxLineLength: number) =>
  pipeCompatibleReduce(reduceLines(maxLineLength))(['']);

const passPropertiesToLInes = (propertiesToPass: Menu) =>
  pipeCompatibleMap((line: string) => ({
    text: line.trim(),
    ...propertiesToPass,
  }));

const castToType = (menuItem: MenuItem): { text: string; wordWrap: number } => (
  {
    text: `${menuItem.text}`,
    wordWrap: parseInt(`${menuItem.wordWrap}`),
    ...menuItem,
  }
);

// apply transformations in order with pipe
const applyWordWrap = (
  { text, wordWrap, ...menuItemProperties }: { text: string; wordWrap: number },
): MenuItem[] =>
  pipe(
    spiltToWords,
    removeExtraSpaces,
    reduceToLines(wordWrap),
    passPropertiesToLInes(menuItemProperties),
  )(text);

// entry layer conditional logic
const hasWordWrap = (item: MenuItem) => !!item.wordWrap;
const hasText = (item: MenuItem) => !!item.text;
const shouldApplyWordWrap = (item: MenuItem) =>
  hasWordWrap(item) && hasText(item);

// deno-lint-ignore no-unused-vars
const ignoreWordWrap = ({ wordWrap, ...item }: MenuItem) => item;

// entry layer
export const wordWrap = (menuItem: MenuItem) =>
  shouldApplyWordWrap(menuItem)
    ? applyWordWrap(castToType(menuItem))
    : [ignoreWordWrap(menuItem)];

/**
 * returns true if XBARDarkMode is enabled.
 * allways returns false if 'env' permission has not been previously granted.
 */
export const isDarkMode = async (): Promise<boolean> => {
  const permissions = await Deno.permissions.query({ name: 'env' });
  return permissions.state === 'granted'
    ? Deno.env.get('XBARDarkMode') === 'true'
    : false;
};
