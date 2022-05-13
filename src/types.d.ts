interface Menu {
  text?: string;
  color?: string;
  wordWrap?: number;
  size?: number;
  submenuLevel?: number;
  href?: string;
  font?: string;
  shell?: string;
  terminal?: boolean;
  refresh?: boolean;
  dropdown?: boolean;
  length?: number;
  trim?: boolean;
  alternate?: boolean;
  templateImage?: string;
  image?: string;
  emojize?: boolean;
  ansi?: boolean;
  key?: string;
  param1?: string;
  param2?: string;
  param3?: string;
  param4?: string;
  param5?: string;
  param6?: string;
  param7?: string;
  param8?: string;
  param9?: string;
  param10?: string;
}

export interface MenuItem extends Menu {
  submenu?: Menu[];
}

export interface MenuItemWithSubMenu extends Menu {
  submenu: Menu[];
}

export interface MenuItemWithWordWrap extends Menu {
  text: string;
  wordWrap: number;
}

export type separator = {
  text: '---';
};
export type Layout = Array<MenuItem | separator>;
