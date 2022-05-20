import { pipe, pipeCompatibleMap } from './utility.ts';
import { wordWrap } from './accessibility.ts';
import { formatLine } from './format.ts';
import { Menu, MenuItem, MenuItemWithSubMenu } from './types.d.ts';

const hasSubmenu = (item: MenuItem) => !!item.submenu;

const getSubmenu = (item: MenuItemWithSubMenu) =>
  item.submenu.map((e) => ({
    ...e,
    submenuLevel: item.submenuLevel ? item.submenuLevel + 1 : 1,
  }));

// deno-lint-ignore no-unused-vars
const ignoreSubmenu = ({ submenu, ...item }: MenuItem): Menu => item;

const formatItem = pipe(wordWrap, pipeCompatibleMap(formatLine));

// array layer
const addItem = (arr: string[], item: Menu) => [
  ...arr,
  ...formatItem(item),
];

const addItemWithSubmenu = (arr: string[], item: MenuItem) => [
  ...addItem(arr, ignoreSubmenu(item)),
  ...pipe(getSubmenu, xbar)(item),
];

//entry layer
/**
 * Prints output to xbar and returns printed output as an array of strings
 */
export const xbar = (layout: MenuItem[]): string[] =>
  layout.reduce(
    (menuItems: string[], item) =>
      hasSubmenu(item)
        ? addItemWithSubmenu(menuItems, item)
        : addItem(menuItems, item),
    [],
  );

/** used for declaring a separator*/
export const separator = {
  text: '---',
};
