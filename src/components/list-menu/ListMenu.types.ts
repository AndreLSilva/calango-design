export type MenuItems<T extends string> = Record<T, MenuItem>;
export interface MenuItem {
  label: string;
  shortcut?: string;
  variants?: string[];
}
