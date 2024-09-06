import type { MenuItems } from "../../../components/list-menu/ListMenu.types";
import type { ToolType } from "./tools.types";

export const tools: MenuItems<ToolType> = {
  symbols: {
    label: "Symbols",
    // shortcut: "",
  },
  eraser: {
    label: "Eraser",
    // shortcut: "e",
  },
  style: {
    label: "Styles",
    // shortcut: "",
  },
};
