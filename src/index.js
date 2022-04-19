import { pipe, pipeCompatibleMap } from './utility.js';
import { wordWrap } from './accessibility.js';
import { formatLine } from './format.js';

// item layer
const isSeparator = (item) => item === separator;

const hasSubmenu = (item) => !!item.submenu;

const getSubmenu = (item) =>
  item.submenu.map((e) => ({
    ...e,
    submenuLevel: item.submenuLevel ? item.submenuLevel + 1 : 1,
  }));

// deno-lint-ignore no-unused-vars
const ignoreSubmenu = ({ submenu, ...item }) => item;

const formatItem = pipe(wordWrap, pipeCompatibleMap(formatLine));

// array layer
const addItem = (arr, item) => [
  ...arr,
  ...formatItem(item),
];

const addItemWithSubmenu = (arr, item) => [
  ...addItem(arr, ignoreSubmenu(item)),
  ...pipe(getSubmenu, xbar)(item),
];

const includeSeparator = (arr) => [
  ...arr,
  formatLine(separator),
];

//entry layer
/**
 * Prints output to xbar and returns printed output as an array of strings
 * @param layout - array of xbar menu items
 * @returns {string[]} array of strings that were printed as menu items
 */
export const xbar = (layout) =>
  layout.reduce((menuItems, item) => {
    switch (true) {
      case (isSeparator(item)):
        return includeSeparator(menuItems);
      case (hasSubmenu(item)):
        return addItemWithSubmenu(menuItems, item);
      default:
        return addItem(menuItems, item);
    }
  }, []);

/** used for declaring a separator*/
export const separator = {
  text: '---',
};
